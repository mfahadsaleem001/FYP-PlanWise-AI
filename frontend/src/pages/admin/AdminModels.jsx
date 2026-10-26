import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  GitCompare,
  Info,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  X,
  XCircle,
  Gauge,
} from "lucide-react";

import "./AdminModels.css";

const INITIAL_MODELS = [
  {
    id: 1,
    name: "Project Estimation Model",
    version: "v1.0.0",
    type: "Regression",
    target: "Cost, Effort & Duration",
    algorithm: "Random Forest",
    status: "Healthy",
    accuracy: "91.4%",
    confidence: "88.7%",
    latency: "142 ms",
    errorRate: "3.8%",
    drift: "Stable",
    lastTrained: "08 Sep 2026",
    predictions: "1,284",
    dataset: "2,450 Projects",
    description:
      "Primary ML model responsible for generating project cost, effort and duration estimates from project characteristics.",
  },
  {
    id: 2,
    name: "Team Size Prediction Model",
    version: "v1.0.0",
    type: "Regression",
    target: "Required Team Size",
    algorithm: "Random Forest",
    status: "Healthy",
    accuracy: "89.8%",
    confidence: "86.2%",
    latency: "118 ms",
    errorRate: "4.6%",
    drift: "Stable",
    lastTrained: "08 Sep 2026",
    predictions: "1,284",
    dataset: "2,450 Projects",
    description:
      "Predicts the estimated number of resources required for a project based on project type, complexity and historical patterns.",
  },
  {
    id: 3,
    name: "Complexity Classification Model",
    version: "v0.9.2",
    type: "Classification",
    target: "Project Complexity",
    algorithm: "Gradient Boosting",
    status: "Monitoring",
    accuracy: "87.6%",
    confidence: "82.4%",
    latency: "96 ms",
    errorRate: "6.2%",
    drift: "Minor Drift",
    lastTrained: "02 Sep 2026",
    predictions: "1,108",
    dataset: "2,450 Projects",
    description:
      "Classifies projects into complexity levels using historical project characteristics and engineered features.",
  },
  {
    id: 4,
    name: "Risk Classification Model",
    version: "v0.8.5",
    type: "Classification",
    target: "Project Risk Level",
    algorithm: "Random Forest",
    status: "Needs Review",
    accuracy: "84.9%",
    confidence: "79.3%",
    latency: "126 ms",
    errorRate: "8.7%",
    drift: "Detected",
    lastTrained: "25 Aug 2026",
    predictions: "946",
    dataset: "2,180 Projects",
    description:
      "Supports project risk analysis by classifying risk signals from historical project characteristics.",
  },
];

const PAGE_SIZE = 5;

const getNumericValue = (value) =>
  Number.parseFloat(String(value).replace(/[^0-9.-]/g, "")) || 0;

const getStatusClass = (status) =>
  status.toLowerCase().replace(/\s+/g, "-");

const getDriftClass = (drift) =>
  drift.toLowerCase().replace(/\s+/g, "-");

const getStatusIcon = (status, size = 14) => {
  switch (status) {
    case "Healthy":
      return <CheckCircle2 size={size} />;
    case "Monitoring":
      return <Activity size={size} />;
    case "Needs Review":
      return <AlertTriangle size={size} />;
    case "Retraining":
      return (
        <RefreshCw
          size={size}
          className="admin-models-refresh-spin"
        />
      );
    default:
      return <Info size={size} />;
  }
};

function AdminModels() {
  const [models, setModels] = useState(INITIAL_MODELS);
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModelModal, setShowModelModal] = useState(false);

  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [comparisonIds, setComparisonIds] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const [isRetraining, setIsRetraining] = useState(false);
  const [showRetrainingConfirm, setShowRetrainingConfirm] =
    useState(false);
  const [retrainingMessage, setRetrainingMessage] = useState("");

  useEffect(() => {
    if (!showModelModal && !showComparison && !showRetrainingConfirm) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isRetraining) {
        setShowRetrainingConfirm(false);
        setShowComparison(false);
        setShowModelModal(false);
        setSelectedModel(null);
        setRetrainingMessage("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    showModelModal,
    showComparison,
    showRetrainingConfirm,
    isRetraining,
  ]);

  const filteredModels = useMemo(() => {
    const sortableFields = {
      name: (model) => model.name.toLowerCase(),
      accuracy: (model) => getNumericValue(model.accuracy),
      confidence: (model) => getNumericValue(model.confidence),
      latency: (model) => getNumericValue(model.latency),
      errorRate: (model) => getNumericValue(model.errorRate),
      status: (model) => model.status.toLowerCase(),
      predictions: (model) => getNumericValue(model.predictions),
    };

    const getValue = sortableFields[sortBy] || sortableFields.name;

    return [...models].sort((a, b) => {
      const first = getValue(a);
      const second = getValue(b);

      const comparison =
        typeof first === "string"
          ? first.localeCompare(second)
          : first - second;

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [models, sortBy, sortDirection]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredModels.length / PAGE_SIZE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedModels = filteredModels.slice(
    (safeCurrentPage - 1) * PAGE_SIZE,
    safeCurrentPage * PAGE_SIZE
  );

  const healthyModels = models.filter(
    (model) => model.status === "Healthy"
  ).length;

  const monitoringModels = models.filter(
    (model) => model.status === "Monitoring"
  ).length;

  const reviewModels = models.filter(
    (model) => model.status === "Needs Review"
  ).length;

  const averageAccuracy = models.length
    ? models.reduce(
        (sum, model) => sum + getNumericValue(model.accuracy),
        0
      ) / models.length
    : 0;

  const averageConfidence = models.length
    ? models.reduce(
        (sum, model) => sum + getNumericValue(model.confidence),
        0
      ) / models.length
    : 0;

  const averageLatency = models.length
    ? models.reduce(
        (sum, model) => sum + getNumericValue(model.latency),
        0
      ) / models.length
    : 0;

  const averageErrorRate = models.length
    ? models.reduce(
        (sum, model) => sum + getNumericValue(model.errorRate),
        0
      ) / models.length
    : 0;

  const totalPredictions = models.reduce(
    (sum, model) => sum + getNumericValue(model.predictions),
    0
  );

  const accuracyChartModels = [...models].sort(
    (a, b) =>
      getNumericValue(b.accuracy) - getNumericValue(a.accuracy)
  );

  const resetPagination = () => setCurrentPage(1);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((current) =>
        current === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }

    resetPagination();
  };

  const openModel = (model) => {
    setSelectedModel(model);
    setShowModelModal(true);
    setRetrainingMessage("");
  };

  const closeModel = () => {
    if (isRetraining || showRetrainingConfirm) {
      return;
    }

    setShowModelModal(false);
    setSelectedModel(null);
    setRetrainingMessage("");
  };

  const handleRefreshMetrics = () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    setRefreshMessage("");

    window.setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(
        `Last updated at ${new Date().toLocaleTimeString()}`
      );
      setRefreshMessage("Metrics refreshed successfully.");

      window.setTimeout(() => setRefreshMessage(""), 4000);
    }, 800);
  };

  const handleComparisonToggle = (modelId) => {
    setComparisonIds((current) => {
      if (current.includes(modelId)) {
        return current.filter((id) => id !== modelId);
      }

      if (current.length >= 3) {
        setRefreshMessage("You can compare up to 3 models at a time.");
        window.setTimeout(() => setRefreshMessage(""), 3000);
        return current;
      }

      return [...current, modelId];
    });
  };

  const comparisonModels = comparisonIds
    .map((id) => models.find((model) => model.id === id))
    .filter(Boolean);

  const exportModels = (rows = filteredModels) => {
    const columns = [
      ["Name", "name"],
      ["Version", "version"],
      ["Type", "type"],
      ["Target", "target"],
      ["Algorithm", "algorithm"],
      ["Status", "status"],
      ["Accuracy", "accuracy"],
      ["Confidence", "confidence"],
      ["Latency", "latency"],
      ["Error Rate", "errorRate"],
      ["Drift", "drift"],
      ["Last Trained", "lastTrained"],
      ["Predictions", "predictions"],
      ["Dataset", "dataset"],
    ];

    const escapeCsv = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [
      columns.map(([heading]) => escapeCsv(heading)).join(","),
      ...rows.map((model) =>
        columns.map(([, key]) => escapeCsv(model[key])).join(",")
      ),
    ].join("\r\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "planwise-model-inventory.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const confirmRetraining = () => {
    if (!selectedModel || isRetraining) return;

    const modelId = selectedModel.id;

    setShowRetrainingConfirm(false);
    setIsRetraining(true);
    setRetrainingMessage("");

    setModels((currentModels) =>
      currentModels.map((model) =>
        model.id === modelId
          ? { ...model, status: "Retraining" }
          : model
      )
    );

    setSelectedModel((currentModel) =>
      currentModel
        ? { ...currentModel, status: "Retraining" }
        : currentModel
    );

    window.setTimeout(() => {
      setModels((currentModels) =>
        currentModels.map((model) =>
          model.id === modelId
            ? { ...model, status: "Monitoring" }
            : model
        )
      );

      setSelectedModel((currentModel) =>
        currentModel && currentModel.id === modelId
          ? { ...currentModel, status: "Monitoring" }
          : currentModel
      );

      setIsRetraining(false);
      setRetrainingMessage("Retraining process completed.");
    }, 1800);
  };

  const SortableHeading = ({ field, children }) => (
    <button
      type="button"
      className="admin-models-sort-btn"
      onClick={() => handleSort(field)}
      title={`Sort by ${children}`}
    >
      {children}
      {sortBy === field ? (
        sortDirection === "asc" ? (
          <ArrowUp size={13} />
        ) : (
          <ArrowDown size={13} />
        )
      ) : (
        <ArrowUpDown size={13} />
      )}
    </button>
  );

  return (
    <div className="admin-models">
      <div className="admin-models-header">
        <div>
          <span className="admin-models-eyebrow">INTELLIGENCE</span>
          <h1>Model Monitoring</h1>
          <p>
            Monitor ML model performance, reliability, prediction
            quality and operational health.
          </p>
        </div>

        <div className="admin-models-header-actions">
          {refreshMessage && (
            <span
              className="admin-models-refresh-message"
              role="status"
            >
              {refreshMessage}
            </span>
          )}

          <button
            type="button"
            className="admin-models-refresh-btn"
            onClick={handleRefreshMetrics}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "admin-models-refresh-spin" : ""}
            />
            {isRefreshing ? "Refreshing..." : "Refresh Metrics"}
          </button>

          <button
            type="button"
            className="admin-models-export-btn"
            onClick={() => exportModels()}
            disabled={filteredModels.length === 0}
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="admin-models-summary">
        <div className="admin-models-summary-card">
          <div className="admin-models-summary-icon total">
            <BarChart3 size={20} />
          </div>
          <div>
            <span>Total Models</span>
            <strong>{models.length}</strong>
            <small>Currently registered</small>
          </div>
        </div>

        <div className="admin-models-summary-card">
          <div className="admin-models-summary-icon healthy">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>Healthy Models</span>
            <strong>{healthyModels}</strong>
            <small>Operating normally</small>
          </div>
        </div>

        <div className="admin-models-summary-card">
          <div className="admin-models-summary-icon monitoring">
            <Activity size={20} />
          </div>
          <div>
            <span>Under Monitoring</span>
            <strong>{monitoringModels}</strong>
            <small>Performance observation</small>
          </div>
        </div>

        <div className="admin-models-summary-card">
          <div className="admin-models-summary-icon review">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span>Needs Review</span>
            <strong>{reviewModels}</strong>
            <small>Attention required</small>
          </div>
        </div>
      </div>

      <section className="admin-models-health">
        <div className="admin-models-section-heading">
          <div>
            <span className="admin-models-section-label">
              SYSTEM HEALTH
            </span>
            <h2>Model performance overview</h2>
            <p>
              Summary metrics calculated across registered models.
            </p>
          </div>

          <div className="admin-models-health-status">
            <span className="admin-models-health-dot" />
            Monitoring active
          </div>
        </div>

        <div className="admin-models-health-grid">
          <div className="admin-model-health-card">
            <div className="admin-model-health-top">
              <span>Average Accuracy</span>
              <Gauge size={18} />
            </div>
            <strong>{averageAccuracy.toFixed(1)}%</strong>
            <div className="admin-model-progress">
              <span
                style={{
                  width: `${Math.min(averageAccuracy, 100)}%`,
                }}
              />
            </div>
            <small>Across registered models</small>
          </div>

          <div className="admin-model-health-card">
            <div className="admin-model-health-top">
              <span>Average Confidence</span>
              <ShieldCheck size={18} />
            </div>
            <strong>{averageConfidence.toFixed(1)}%</strong>
            <div className="admin-model-progress">
              <span
                style={{
                  width: `${Math.min(averageConfidence, 100)}%`,
                }}
              />
            </div>
            <small>Prediction confidence</small>
          </div>

          <div className="admin-model-health-card">
            <div className="admin-model-health-top">
              <span>Average Latency</span>
              <Clock3 size={18} />
            </div>
            <strong>{averageLatency.toFixed(0)} ms</strong>
            <div className="admin-model-progress neutral">
              <span
                style={{
                  width: `${Math.min(
                    (averageLatency / 200) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <small>Prediction response time</small>
          </div>

          <div className="admin-model-health-card">
            <div className="admin-model-health-top">
              <span>Average Error Rate</span>
              <AlertTriangle size={18} />
            </div>
            <strong>{averageErrorRate.toFixed(1)}%</strong>
            <div className="admin-model-progress">
              <span
                style={{
                  width: `${Math.min(averageErrorRate * 10, 100)}%`,
                }}
              />
            </div>
            <small>Across registered models</small>
          </div>
        </div>

        <div className="admin-models-chart-grid">
          <div className="admin-models-chart-card">
            <div className="admin-models-chart-heading">
              <div>
                <h3>Accuracy by model</h3>
                <p>Comparison of model accuracy values</p>
              </div>
              <BarChart3 size={18} />
            </div>

            <div className="admin-models-bar-chart">
              {accuracyChartModels.map((model) => (
                <div className="admin-models-bar-row" key={model.id}>
                  <span title={model.name}>{model.name}</span>
                  <div className="admin-models-bar-track">
                    <span
                      style={{
                        width: `${getNumericValue(model.accuracy)}%`,
                      }}
                    />
                  </div>
                  <strong>{model.accuracy}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="admin-models-chart-card">
            <div className="admin-models-chart-heading">
              <div>
                <h3>Prediction distribution</h3>
                <p>Prediction counts by model</p>
              </div>
              <TrendingUp size={18} />
            </div>

            <div className="admin-models-bar-chart">
              {models.map((model) => {
                const predictionCount = getNumericValue(model.predictions);
                const maxPredictions = Math.max(
                  ...models.map((item) =>
                    getNumericValue(item.predictions)
                  ),
                  1
                );

                return (
                  <div
                    className="admin-models-bar-row"
                    key={model.id}
                  >
                    <span title={model.name}>{model.name}</span>
                    <div className="admin-models-bar-track">
                      <span
                        style={{
                          width: `${
                            (predictionCount / maxPredictions) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <strong>{predictionCount.toLocaleString()}</strong>
                  </div>
                );
              })}
            </div>

            <div className="admin-models-chart-total">
              <span>Total predictions</span>
              <strong>{totalPredictions.toLocaleString()}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="admin-models-table-section">
        <div className="admin-models-section-heading">
          <div>
            <span className="admin-models-section-label">
              REGISTERED MODELS
            </span>
            <h2>Model inventory</h2>
            <p>
              {models.length} registered models
            </p>
          </div>

          <div className="admin-models-inventory-actions">
            <button
              type="button"
              className="admin-models-compare-btn"
              onClick={() => setShowComparison(true)}
              disabled={comparisonIds.length < 2}
              title="Select at least two models to compare"
            >
              <GitCompare size={16} />
              Compare ({comparisonIds.length})
            </button>
          </div>
        </div>

        {comparisonIds.length > 0 && (
          <div className="admin-models-selection-info">
            <span>
              <Check size={15} />
              {comparisonIds.length} model
              {comparisonIds.length === 1 ? "" : "s"} selected
              for comparison
            </span>
            <button
              type="button"
              onClick={() => setComparisonIds([])}
            >
              Clear selection
            </button>
          </div>
        )}

        <div className="admin-models-table-wrapper">
          <table className="admin-models-table">
            <thead>
              <tr>
                <th>
                  <span className="admin-models-checkbox-heading">
                    Compare
                  </span>
                </th>
                <th>
                  <SortableHeading field="name">Model</SortableHeading>
                </th>
                <th>Type</th>
                <th>Algorithm</th>
                <th>
                  <SortableHeading field="accuracy">
                    Accuracy
                  </SortableHeading>
                </th>
                <th>
                  <SortableHeading field="confidence">
                    Confidence
                  </SortableHeading>
                </th>
                <th>
                  <SortableHeading field="latency">Latency</SortableHeading>
                </th>
                <th>
                  <SortableHeading field="errorRate">
                    Error Rate
                  </SortableHeading>
                </th>
                <th>Drift</th>
                <th>
                  <SortableHeading field="status">Status</SortableHeading>
                </th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedModels.map((model) => (
                <tr key={model.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={comparisonIds.includes(model.id)}
                      onChange={() => handleComparisonToggle(model.id)}
                      aria-label={`Compare ${model.name}`}
                      disabled={
                        comparisonIds.length >= 3 &&
                        !comparisonIds.includes(model.id)
                      }
                    />
                  </td>

                  <td>
                    <div className="admin-model-name">
                      <div className="admin-model-name-icon">
                        <BarChart3 size={17} />
                      </div>
                      <div>
                        <strong>{model.name}</strong>
                        <span>{model.version}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="admin-model-type">{model.type}</span>
                  </td>

                  <td>{model.algorithm}</td>

                  <td>
                    <strong className="admin-model-metric">
                      {model.accuracy}
                    </strong>
                  </td>

                  <td>
                    <strong className="admin-model-metric">
                      {model.confidence}
                    </strong>
                  </td>

                  <td>
                    <span className="admin-model-latency">
                      {model.latency}
                    </span>
                  </td>

                  <td>
                    <strong className="admin-model-metric">
                      {model.errorRate}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`admin-model-drift ${getDriftClass(
                        model.drift
                      )}`}
                    >
                      {model.drift}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`admin-model-status ${getStatusClass(
                        model.status
                      )}`}
                    >
                      {getStatusIcon(model.status, 13)}
                      {model.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-model-view-btn"
                      onClick={() => openModel(model)}
                    >
                      <Eye size={15} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedModels.length === 0 && (
                <tr>
                  <td colSpan={11}>
                    <div className="admin-models-empty-state">
                      <BarChart3 size={28} />
                      <strong>No models available</strong>
                      <p>There are no registered models to display.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-models-pagination">
          <span>
            Showing{" "}
            {filteredModels.length === 0
              ? 0
              : (safeCurrentPage - 1) * PAGE_SIZE + 1}
            {"–"}
            {Math.min(
              safeCurrentPage * PAGE_SIZE,
              filteredModels.length
            )}{" "}
            of {filteredModels.length} models
          </span>

          <div>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={safeCurrentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={17} />
            </button>

            <span>
              Page {safeCurrentPage} of {totalPages}
            </span>

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={safeCurrentPage >= totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>

      {lastUpdated && (
        <div className="admin-models-last-updated">
          {lastUpdated}
        </div>
      )}

      {showModelModal && selectedModel && (
        <div
          className="admin-models-modal-overlay"
          onClick={closeModel}
        >
          <div
            className="admin-models-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-models-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-models-modal-header">
              <div>
                <span className="admin-models-section-label">
                  MODEL DETAILS
                </span>
                <h2 id="admin-models-modal-title">
                  {selectedModel.name}
                </h2>
                <p>
                  {selectedModel.version} · {selectedModel.type}
                </p>
              </div>

              <button
                type="button"
                className="admin-models-modal-close"
                onClick={closeModel}
                disabled={isRetraining}
                aria-label="Close model details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-models-modal-body">
              <div className="admin-model-detail-description">
                <span>Description</span>
                <p>{selectedModel.description}</p>
              </div>

              <div className="admin-model-detail-grid">
                <div>
                  <span>Prediction Target</span>
                  <strong>{selectedModel.target}</strong>
                </div>
                <div>
                  <span>Algorithm</span>
                  <strong>{selectedModel.algorithm}</strong>
                </div>
                <div>
                  <span>Accuracy</span>
                  <strong>{selectedModel.accuracy}</strong>
                </div>
                <div>
                  <span>Confidence</span>
                  <strong>{selectedModel.confidence}</strong>
                </div>
                <div>
                  <span>Inference Latency</span>
                  <strong>{selectedModel.latency}</strong>
                </div>
                <div>
                  <span>Error Rate</span>
                  <strong>{selectedModel.errorRate}</strong>
                </div>
                <div>
                  <span>Data Drift</span>
                  <strong>{selectedModel.drift}</strong>
                </div>
                <div>
                  <span>Last Trained</span>
                  <strong>{selectedModel.lastTrained}</strong>
                </div>
                <div>
                  <span>Total Predictions</span>
                  <strong>{selectedModel.predictions}</strong>
                </div>
                <div>
                  <span>Training Dataset</span>
                  <strong>{selectedModel.dataset}</strong>
                </div>
              </div>

              <div className="admin-model-detail-status">
                <span>Current Status</span>
                <div
                  className={`admin-model-status ${getStatusClass(
                    selectedModel.status
                  )}`}
                >
                  {getStatusIcon(selectedModel.status)}
                  {selectedModel.status}
                </div>
              </div>

              <div className="admin-models-version-history">
                <div>
                  <h3>Version information</h3>
                  <p>
                    Current registered version and training information.
                  </p>
                </div>
                <div className="admin-models-version-entry">
                  <span className="admin-models-version-dot" />
                  <div>
                    <strong>{selectedModel.version}</strong>
                    <span>
                      Last trained: {selectedModel.lastTrained}
                    </span>
                  </div>
                  <span className="admin-models-version-current">
                    Current
                  </span>
                </div>
              </div>

              {selectedModel.drift !== "Stable" && (
                <div className="admin-model-review-warning">
                  <AlertTriangle size={18} />
                  <div>
                    <strong>Review recommended</strong>
                    <p>
                      This model has a non-stable drift status.
                      Review recent prediction data before deciding
                      whether retraining is needed.
                    </p>
                  </div>
                </div>
              )}

              {retrainingMessage && (
                <div className="admin-model-retraining-message">
                  <Info size={17} />
                  <span>{retrainingMessage}</span>
                </div>
              )}
            </div>

            <div className="admin-models-modal-footer">
              <button
                type="button"
                className="admin-models-modal-secondary"
                onClick={closeModel}
                disabled={isRetraining || showRetrainingConfirm}
              >
                Close
              </button>

              <button
                type="button"
                className="admin-models-modal-primary"
                onClick={() => setShowRetrainingConfirm(true)}
                disabled={isRetraining}
              >
                <RefreshCw
                  size={15}
                  className={
                    isRetraining ? "admin-models-refresh-spin" : ""
                  }
                />
                {isRetraining ? "Retraining..." : "Retrain Model"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showRetrainingConfirm && selectedModel && (
        <div
          className="admin-models-modal-overlay admin-models-confirm-overlay"
          onClick={() => {
            if (!isRetraining) setShowRetrainingConfirm(false);
          }}
        >
          <div
            className="admin-models-confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-models-confirm-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-models-confirm-icon">
              <RefreshCw size={23} />
            </div>

            <h2 id="admin-models-confirm-title">Retrain model?</h2>

            <p>
              Start the retraining workflow for{" "}
              <strong>{selectedModel.name}</strong>?
            </p>

            <div className="admin-models-confirm-actions">
              <button
                type="button"
                className="admin-models-modal-secondary"
                onClick={() => setShowRetrainingConfirm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="admin-models-modal-primary"
                onClick={confirmRetraining}
              >
                <RefreshCw size={15} />
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showComparison && (
        <div
          className="admin-models-modal-overlay"
          onClick={() => setShowComparison(false)}
        >
          <div
            className="admin-models-modal admin-models-comparison-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-models-comparison-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-models-modal-header">
              <div>
                <span className="admin-models-section-label">
                  MODEL ANALYSIS
                </span>
                <h2 id="admin-models-comparison-title">
                  Model comparison
                </h2>
                <p>
                  Comparing {comparisonModels.length} models
                </p>
              </div>

              <button
                type="button"
                className="admin-models-modal-close"
                onClick={() => setShowComparison(false)}
                aria-label="Close model comparison"
              >
                <X size={18} />
              </button>
            </div>

            <div className="admin-models-modal-body">
              <div className="admin-models-comparison-table-wrapper">
                <table className="admin-models-comparison-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      {comparisonModels.map((model) => (
                        <th key={model.id}>{model.name}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {[
                      ["Version", "version"],
                      ["Type", "type"],
                      ["Algorithm", "algorithm"],
                      ["Accuracy", "accuracy"],
                      ["Confidence", "confidence"],
                      ["Latency", "latency"],
                      ["Error Rate", "errorRate"],
                      ["Drift", "drift"],
                      ["Status", "status"],
                      ["Predictions", "predictions"],
                      ["Last Trained", "lastTrained"],
                    ].map(([label, key]) => (
                      <tr key={key}>
                        <td>{label}</td>
                        {comparisonModels.map((model) => (
                          <td key={model.id}>{model[key]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="admin-models-comparison-note">
                <Info size={16} />
                Compare model performance metrics side by side.
              </div>
            </div>

            <div className="admin-models-modal-footer">
              <button
                type="button"
                className="admin-models-modal-secondary"
                onClick={() => setShowComparison(false)}
              >
                Close
              </button>

              <button
                type="button"
                className="admin-models-modal-primary"
                onClick={() => exportModels(comparisonModels)}
              >
                <Download size={15} />
                Export Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminModels;