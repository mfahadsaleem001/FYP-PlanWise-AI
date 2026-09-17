import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What information do I need to provide?",
      answer:
        "You only need to provide your project name, a description of what you want to build, and the project type. PlanWise uses this information as the starting point for its analysis.",
    },
    {
      question: "How does PlanWise estimate a project?",
      answer:
        "PlanWise uses machine learning models trained on historical project data to generate supported estimates such as effort, duration, cost, team size, or complexity. The available predictions depend on the data and model being used.",
    },
    {
      question: "Are the estimates guaranteed?",
      answer:
        "No. PlanWise provides estimated values and planning ranges to support decision-making. Actual project results can vary depending on requirements, implementation decisions, team experience, and other real-world factors.",
    },
    {
      question: "What does AI contribute besides estimation?",
      answer:
        "AI can help analyze the project context and provide relevant explanations, risks, mitigation suggestions, technology insights, team recommendations, and planning guidance.",
    },
    {
      question: "Will PlanWise identify risks specific to my project?",
      answer:
        "Yes. The goal is to identify risks that are relevant to the project characteristics and requirements rather than showing the same generic list for every project.",
    },
    {
      question: "Can I save and review my previous projects?",
      answer:
        "Yes. Once the application is connected to its backend and database, users will be able to save project analyses and review their previous estimates and planning insights.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section">
      <div className="page-container">

        <div className="faq-layout">

          <div className="faq-heading">
            <span className="section-label">
              Frequently Asked Questions
            </span>

            <h2 className="section-title">
              Questions before
              <span className="faq-title-accent">
                {" "}you start?
              </span>
            </h2>

            <p className="section-description">
              A few things worth knowing about how PlanWise
              approaches project estimation, analysis, and
              planning.
            </p>

            <div className="faq-note">
              <span>?</span>

              <p>
                Still have a question? You can explore the
                platform after creating your project estimate.
              </p>
            </div>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  className={`faq-item ${
                    isOpen ? "faq-item-open" : ""
                  }`}
                  key={faq.question}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                  >
                    <span>
                      {faq.question}
                    </span>

                    <span className="faq-icon">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

export default FAQ;