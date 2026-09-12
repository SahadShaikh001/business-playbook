import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { faqs } from "../data/content";

function FAQ() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="faq"
      className="faq section"
    >
      {/* =================================================
          FAQ HEADING
      ================================================= */}

      <div className="faq-heading">

        <p className="eyebrow">
          QUESTIONS
        </p>

        <h2>
          Everything You Need to
          <br />
          <i>Know</i>
        </h2>

        <p>
          Everything you need to know
          before purchasing.
        </p>

      </div>


      {/* =================================================
          FAQ LIST
      ================================================= */}

      <div className="faq-list">

        {faqs.map((faq, index) => {

          const isOpen =
            active === index;

          return (
            <div
              className={`faq-item ${
                isOpen
                  ? "faq-item-open"
                  : ""
              }`}
              key={faq.question}
            >

              {/* QUESTION */}

              <button
                type="button"
                onClick={() =>
                  setActive(
                    isOpen
                      ? null
                      : index
                  )
                }
              >

                <span>
                  {faq.question}
                </span>

                <ChevronDown
                  className={
                    isOpen
                      ? "faq-icon open"
                      : "faq-icon"
                  }
                />

              </button>


              {/* ANSWER */}

              {isOpen && (
                <div className="faq-answer">
                  <p>
                    {faq.answer}
                  </p>
                </div>
              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default FAQ;