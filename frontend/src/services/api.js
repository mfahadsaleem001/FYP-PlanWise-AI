const API_BASE_URL = "http://127.0.0.1:8000";

// ========================================
// COMMON API RESPONSE HANDLER
// ========================================

async function handleResponse(response, defaultMessage) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(
        "Your session has expired. Please sign in again."
      );
    }

    if (response.status === 403) {
      throw new Error(
        "You are not authorized to perform this action."
      );
    }

    const detail = data?.detail;
    let message = "";

    if (typeof detail === "string") {
      message = detail;
    } else if (Array.isArray(detail)) {
      message = detail
        .map((item) => {
          if (typeof item === "string") {
            return item;
          }

          if (item && typeof item === "object") {
            const field = Array.isArray(item.loc)
              ? item.loc
                  .filter((part) => part !== "body")
                  .join(".")
              : "";

            const description =
              item.msg || item.message || "";

            if (field && description) {
              return `${field}: ${description}`;
            }

            return description || JSON.stringify(item);
          }

          return String(item);
        })
        .filter(Boolean)
        .join(", ");
    } else if (detail && typeof detail === "object") {
      message =
        detail.message ||
        detail.msg ||
        JSON.stringify(detail);
    } else if (typeof data?.message === "string") {
      message = data.message;
    } else if (typeof data?.error === "string") {
      message = data.error;
    }

    throw new Error(message || defaultMessage);
  }

  return data;
}

// ========================================
// COMMON API REQUEST HELPER
// ========================================

async function apiRequest(
  endpoint,
  {
    method = "GET",
    body,
    authenticated = true,
  } = {}
) {
  const headers = {};

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (authenticated) {
    const token = localStorage.getItem(
      "planwise_access_token"
    );

    if (!token) {
      throw new Error(
        "Admin authentication token not found. Please sign in again."
      );
    }

    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      method,
      headers,
      ...(body !== undefined
        ? { body: JSON.stringify(body) }
        : {}),
    }
  );

  return response;
}

// ========================================
// AUTHENTICATION
// ========================================

export async function adminLogin(email, password) {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    authenticated: false,
    body: { email, password },
  });

  return handleResponse(response, "Admin login failed.");
}

// ========================================
// EMPLOYEE SETUP
// ========================================

export async function getEmployeeSetupDetails(token) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/employees/setup-details?token=${encodeURIComponent(token)}`
  );

  return handleResponse(
    response,
    "Unable to verify the setup link."
  );
}

export async function completeEmployeePasswordSetup(
  token,
  password
) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/employees/setup-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, password }),
    }
  );

  return handleResponse(
    response,
    "Unable to create your password."
  );
}

// ========================================
// EMPLOYEES
// ========================================

export async function getEmployees() {
  const response = await apiRequest(
    "/api/admin/employees"
  );

  return handleResponse(
    response,
    "Failed to load employees."
  );
}

export async function createEmployee(employeeData) {
  const response = await apiRequest(
    "/api/admin/employees",
    {
      method: "POST",
      body: employeeData,
    }
  );

  return handleResponse(
    response,
    "Failed to create employee."
  );
}

export async function updateEmployee(
  employeeId,
  employeeData
) {
  const response = await apiRequest(
    `/api/admin/employees/${employeeId}`,
    {
      method: "PATCH",
      body: employeeData,
    }
  );

  return handleResponse(
    response,
    "Failed to update employee."
  );
}

export async function deleteEmployee(employeeId) {
  const response = await apiRequest(
    `/api/admin/employees/${employeeId}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(
    response,
    "Failed to delete employee."
  );
}

// ========================================
// ADMIN PROJECTS
// ========================================

function extractProjects(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.items)) {
    return response.items;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  if (Array.isArray(response?.projects)) {
    return response.projects;
  }

  if (Array.isArray(response?.data?.items)) {
    return response.data.items;
  }

  if (Array.isArray(response?.data?.projects)) {
    return response.data.projects;
  }

  return null;
}

export async function getAdminProjects() {
  const response = await apiRequest(
    "/api/projects/admin/all"
  );

  const data = await handleResponse(
    response,
    "Failed to load projects."
  );

  const projects = extractProjects(data);

  if (projects === null) {
    throw new Error(
      "The projects API returned an unsupported response format."
    );
  }

  if (projects.length > 0) {
    return projects;
  }

  const fallbackResponse = await apiRequest(
    "/api/projects"
  );

  const fallbackData = await handleResponse(
    fallbackResponse,
    "Failed to load projects from the fallback endpoint."
  );

  const fallbackProjects = extractProjects(fallbackData);

  if (fallbackProjects === null) {
    throw new Error(
      "The fallback projects API returned an unsupported response format."
    );
  }

  return fallbackProjects;
}

export async function assignProjectEmployees(
  projectId,
  employeeIds
) {
  const response = await apiRequest(
    `/api/projects/${projectId}/employees`,
    {
      method: "PUT",
      body: {
        employee_ids: employeeIds,
      },
    }
  );

  return handleResponse(
    response,
    "Failed to assign employees to the project."
  );
}

// ========================================
// ADMIN WEEKLY PLANS
// ========================================

export async function getAdminWeeklyPlans(projectId) {
  const params = new URLSearchParams();

  if (projectId != null && projectId !== "") {
    params.set("project_id", projectId);
  }

  const query = params.toString();

  const response = await apiRequest(
    `/admin/weekly-plans${query ? `?${query}` : ""}`
  );

  return handleResponse(
    response,
    "Failed to load weekly plans."
  );
}

export async function createAdminWeeklyPlan(planData) {
  const response = await apiRequest(
    "/admin/weekly-plans",
    {
      method: "POST",
      body: planData,
    }
  );

  return handleResponse(
    response,
    "Failed to create weekly plan."
  );
}

// ========================================
// PROJECT REQUESTS
// ========================================

export async function getProjectRequests(statusFilter) {
  const query = statusFilter
    ? `?status=${encodeURIComponent(statusFilter)}`
    : "";

  const response = await apiRequest(
    `/api/project-requests${query}`
  );

  return handleResponse(
    response,
    "Failed to load project requests."
  );
}

export async function getMyProjectRequests() {
  const response = await apiRequest(
    "/api/project-requests/my"
  );

  return handleResponse(
    response,
    "Failed to load your project requests."
  );
}

export async function createProjectRequest(requestData) {
  const response = await apiRequest(
    "/api/project-requests",
    {
      method: "POST",
      body: requestData,
    }
  );

  return handleResponse(
    response,
    "Failed to submit project request."
  );
}

export async function reviewProjectRequest(
  requestId,
  status
) {
  const response = await apiRequest(
    `/api/project-requests/${requestId}/review`,
    {
      method: "PATCH",
      body: { status },
    }
  );

  return handleResponse(
    response,
    `Failed to ${status} project request.`
  );
}

// ========================================
// PROJECT MESSAGES
// ========================================

export async function getProjectMessages(requestId) {
  const response = await apiRequest(
    `/api/project-requests/${requestId}/messages`
  );

  return handleResponse(
    response,
    "Failed to load project messages."
  );
}

export async function sendProjectMessage(
  requestId,
  message
) {
  const response = await apiRequest(
    `/api/project-requests/${requestId}/messages`,
    {
      method: "POST",
      body: {
        message: message.trim(),
      },
    }
  );

  return handleResponse(
    response,
    "Failed to send project message."
  );
}