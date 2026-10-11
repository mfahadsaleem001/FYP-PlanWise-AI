const API_BASE_URL = "http://127.0.0.1:8000";

// Common API response handler
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

// Common API request helper
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

// Admin Login
export async function adminLogin(email, password) {
  const response = await apiRequest(
    "/api/auth/login",
    {
      method: "POST",
      authenticated: false,
      body: { email, password },
    }
  );

  return handleResponse(
    response,
    "Admin login failed"
  );
}

// Get Employee Setup Details
export async function getEmployeeSetupDetails(token) {
  const response = await fetch(
    `${API_BASE_URL}/api/admin/employees/setup-details?token=${encodeURIComponent(token)}`
  );

  return handleResponse(
    response,
    "Unable to verify the setup link"
  );
}

// Complete Employee Password Setup
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
    "Unable to create your password"
  );
}

// GET: Fetch all employees
export async function getEmployees() {
  const response = await apiRequest(
    "/api/admin/employees"
  );

  return handleResponse(
    response,
    "Failed to load employees."
  );
}

// POST: Create a new employee
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

// PATCH: Update an existing employee
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

// DELETE: Remove an employee
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

// GET: Fetch all projects for the admin panel
export async function getAdminProjects() {
  const response = await apiRequest(
    "/api/projects/admin/all"
  );

  return handleResponse(
    response,
    "Failed to load projects."
  );
}