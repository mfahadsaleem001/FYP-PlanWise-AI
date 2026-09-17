import { useState } from "react";

import {
  Activity,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clock3,
  Eye,
  Gauge,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";

import "./AdminModels.css";

function AdminModels() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [showModelModal, setShowModelModal] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState("");

  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainingMessage, setRetrainingMessage] = useState("");

  const [models, setModels] = useState([
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
  ]);

  const openModel = (model) => {
    setSelectedModel(model);
    setShowModelModal(true);
    setRetrainingMessage("");
  };

  const closeModel = () => {
    if (isRetraining) {
      return;
    }

    setShowModelModal(false);
    setSelectedModel(null);
    setRetrainingMessage("");
  };

  /* ============================================================
     REFRESH METRICS
     ============================================================ */

  const handleRefreshMetrics = () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);
    setRefreshMessage("");

    setTimeout(() => {
      setIsRefreshing(false);

      setRefreshMessage(
        "Model metrics refreshed successfully."
      );

      setTimeout(() => {
        setRefreshMessage("");
      }, 3000);
    }, 1000);
  };

  /* ============================================================
     RETRAIN MODEL
     ============================================================ */

  const handleRetrainingAction = () => {
    if (!selectedModel || isRetraining) {
      return;
    }

    const modelId = selectedModel.id;

    setIsRetraining(true);
    setRetrainingMessage("");

    /* ----------------------------------------------------------
       STEP 1
       Change selected model status to Retraining
    ---------------------------------------------------------- */

    setModels((currentModels) =>
      currentModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              status: "Retraining",
            }
          : model
      )
    );

    setSelectedModel((currentModel) => ({
      ...currentModel,
      status: "Retraining",
    }));

    /* ----------------------------------------------------------
       STEP 2
       Simulate retraining process
    ---------------------------------------------------------- */

    setTimeout(() => {
      const retrainedDate = "16 Sep 2026";

      const updatedModel = {
        ...selectedModel,
        status: "Healthy",
        drift: "Stable",
        lastTrained: retrainedDate,
        accuracy: "89.6%",
        confidence: "86.8%",
        errorRate: "4.1%",
      };

      /* --------------------------------------------------------
         Update model in table
      -------------------------------------------------------- */

      setModels((currentModels) =>
        currentModels.map((model) =>
          model.id === modelId
            ? updatedModel
            : model
        )
      );

      /* --------------------------------------------------------
         Update currently opened modal
      -------------------------------------------------------- */

      setSelectedModel(updatedModel);

      setIsRetraining(false);

      setRetrainingMessage(
        "Model retrained successfully and is now healthy."
      );
    }, 1800);
  };

  /* ============================================================
     SUMMARY COUNTS
     ============================================================ */

  const healthyModels = models.filter(
    (model) => model.status === "Healthy"
  ).length;

  const monitoringModels = models.filter(
    (model) => model.status === "Monitoring"
  ).length;

  const reviewModels = models.filter(
    (model) => model.status === "Needs Review"
  ).length;

  return (
    <div className="admin-models">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="admin-models-header">

        <div>

          <span className="admin-models-eyebrow">
            INTELLIGENCE
          </span>

          <h1>Model Monitoring</h1>

          <p>
            Monitor ML model performance, reliability, prediction
            quality and operational health.
          </p>

        </div>


        <div className="admin-models-header-actions">

          {refreshMessage && (
            <span className="admin-models-refresh-message">
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
              className={
                isRefreshing
                  ? "admin-models-refresh-spin"
                  : ""
              }
            />

            {isRefreshing
              ? "Refreshing..."
              : "Refresh Metrics"}

          </button>

        </div>

      </div>


      {/* =====================================================
          SUMMARY CARDS
      ===================================================== */}

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


      {/* =====================================================
          SYSTEM HEALTH
      ===================================================== */}

      <section className="admin-models-health">

        <div className="admin-models-section-heading">

          <div>

            <span className="admin-models-section-label">
              SYSTEM HEALTH
            </span>

            <h2>Model performance overview</h2>

          </div>


          <div className="admin-models-health-status">

            <span className="admin-models-health-dot"></span>

            Monitoring Active

          </div>

        </div>


        <div className="admin-models-health-grid">

          <div className="admin-model-health-card">

            <div className="admin-model-health-top">
              <span>Average Accuracy</span>
              <Gauge size={18} />
            </div>

            <strong>88.4%</strong>

            <div className="admin-model-progress">
              <span style={{ width: "88.4%" }}></span>
            </div>

            <small>Across monitored models</small>

          </div>


          <div className="admin-model-health-card">

            <div className="admin-model-health-top">
              <span>Average Confidence</span>
              <ShieldCheck size={18} />
            </div>

            <strong>84.2%</strong>

            <div className="admin-model-progress">
              <span style={{ width: "84.2%" }}></span>
            </div>

            <small>Prediction confidence</small>

          </div>


          <div className="admin-model-health-card">

            <div className="admin-model-health-top">
              <span>Average Latency</span>
              <Clock3 size={18} />
            </div>

            <strong>120 ms</strong>

            <div className="admin-model-health-progress neutral">
              <span style={{ width: "62%" }}></span>
            </div>

            <small>Prediction response time</small>

          </div>


          <div className="admin-model-health-card">

            <div className="admin-model-health-top">
              <span>Prediction Volume</span>
              <TrendingUp size={18} />
            </div>

            <strong>4,622</strong>

            <div className="admin-model-volume-change">
              <TrendingUp size={14} />
              12.6% this month
            </div>

            <small>Total recent predictions</small>

          </div>

        </div>

      </section>


      {/* =====================================================
          MODEL TABLE
      ===================================================== */}

      <section className="admin-models-table-section">

        <div className="admin-models-section-heading">

          <div>

            <span className="admin-models-section-label">
              REGISTERED MODELS
            </span>

            <h2>Model inventory</h2>

          </div>

        </div>


        <div className="admin-models-table-wrapper">

          <table className="admin-models-table">

            <thead>

              <tr>
                <th>Model</th>
                <th>Type</th>
                <th>Algorithm</th>
                <th>Accuracy</th>
                <th>Confidence</th>
                <th>Latency</th>
                <th>Drift</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

            </thead>


            <tbody>

              {models.map((model) => (

                <tr key={model.id}>

                  <td>

                    <div className="admin-model-name">

                      <div className="admin-model-name-icon">
                        <BarChart3 size={17} />
                      </div>

                      <div>

                        <strong>
                          {model.name}
                        </strong>

                        <span>
                          {model.version}
                        </span>

                      </div>

                    </div>

                  </td>


                  <td>

                    <span className="admin-model-type">
                      {model.type}
                    </span>

                  </td>


                  <td>
                    {model.algorithm}
                  </td>


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

                    <span
                      className={`admin-model-drift ${model.drift
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {model.drift}
                    </span>

                  </td>


                  <td>

                    <span
                      className={`admin-model-status ${model.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >

                      {model.status === "Healthy" && (
                        <CheckCircle2 size={13} />
                      )}

                      {model.status === "Monitoring" && (
                        <Activity size={13} />
                      )}

                      {model.status === "Needs Review" && (
                        <AlertTriangle size={13} />
                      )}

                      {model.status === "Retraining" && (
                        <RefreshCw
                          size={13}
                          className="admin-models-refresh-spin"
                        />
                      )}

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

            </tbody>

          </table>

        </div>

      </section>


      {/* =====================================================
          MONITORING NOTES
      ===================================================== */}

      <section className="admin-models-alert">

        <div className="admin-models-alert-icon">
          <AlertTriangle size={19} />
        </div>

        <div>

          <strong>
            Monitoring note
          </strong>

          <p>
            Model metrics shown here are currently frontend demo
            values. Production metrics will be populated from the
            trained ML pipeline, inference logs and monitoring
            services after backend integration.
          </p>

        </div>

      </section>


      {/* =====================================================
          MODEL DETAILS MODAL
      ===================================================== */}

      {showModelModal && selectedModel && (

        <div
          className="admin-models-modal-overlay"
          onClick={closeModel}
        >

          <div
            className="admin-models-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="admin-models-modal-header">

              <div>

                <span className="admin-models-section-label">
                  MODEL DETAILS
                </span>

                <h2>
                  {selectedModel.name}
                </h2>

                <p>
                  {selectedModel.version} ·{" "}
                  {selectedModel.type}
                </p>

              </div>


              <button
                type="button"
                className="admin-models-modal-close"
                onClick={closeModel}
                disabled={isRetraining}
              >
                <X size={18} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="admin-models-modal-body">

              <div className="admin-model-detail-description">

                <span>
                  Description
                </span>

                <p>
                  {selectedModel.description}
                </p>

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

                <span>
                  Current Status
                </span>

                <div
                  className={`admin-model-status ${selectedModel.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >

                  {selectedModel.status === "Healthy" && (
                    <CheckCircle2 size={14} />
                  )}

                  {selectedModel.status === "Monitoring" && (
                    <Activity size={14} />
                  )}

                  {selectedModel.status === "Needs Review" && (
                    <AlertTriangle size={14} />
                  )}

                  {selectedModel.status === "Retraining" && (
                    <RefreshCw
                      size={14}
                      className="admin-models-refresh-spin"
                    />
                  )}

                  {selectedModel.status}

                </div>

              </div>


              {selectedModel.drift === "Detected" && (

                <div className="admin-model-review-warning">

                  <XCircle size={18} />

                  <div>

                    <strong>
                      Review recommended
                    </strong>

                    <p>
                      Data drift has been detected for this model.
                      In the production system, the admin should
                      review recent prediction data and determine
                      whether retraining is required.
                    </p>

                  </div>

                </div>

              )}


              {retrainingMessage && (

                <div className="admin-model-retraining-message">

                  <CheckCircle2 size={17} />

                  <span>
                    {retrainingMessage}
                  </span>

                </div>

              )}

            </div>


            {/* MODAL FOOTER */}

            <div className="admin-models-modal-footer">

              <button
                type="button"
                className="admin-models-modal-secondary"
                onClick={closeModel}
                disabled={isRetraining}
              >
                Close
              </button>


              <button
                type="button"
                className="admin-models-modal-primary"
                onClick={handleRetrainingAction}
                disabled={isRetraining}
              >

                <RefreshCw
                  size={15}
                  className={
                    isRetraining
                      ? "admin-models-refresh-spin"
                      : ""
                  }
                />

                {isRetraining
                  ? "Retraining..."
                  : "Retraining Action"}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminModels;