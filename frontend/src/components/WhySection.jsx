import { motion } from "framer-motion";

import {
  Brain,
  Target,
  BookOpen,
} from "lucide-react";


/* =========================================================
   WHY SECTION POINTS
========================================================= */

const points = [
  {
    icon: Brain,
    number: "01",
    title: "Think better",
    text:
      "Learn ideas that help you understand people, decisions and opportunities more clearly.",
  },

  {
    icon: Target,
    number: "02",
    title: "Act faster",
    text:
      "Turn useful knowledge into practical actions instead of leaving it inside a finished book.",
  },

  {
    icon: BookOpen,
    number: "03",
    title: "Keep revisiting",
    text:
      "Short, practical lessons make it easy to return to the ideas whenever you need them.",
  },
];


/* =========================================================
   WHY SECTION
========================================================= */

function WhySection() {
  return (
    <section className="why section">


      {/* ===================================================
          SECTION HEADING
      =================================================== */}

      <motion.div
        className="section-heading"
        initial={{
          opacity: 0,
          y: 25,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.7,
        }}
      >

        <p className="eyebrow">
          WHY THESE BOOKS
        </p>

        <h2>
          Knowledge is useful
          <br />
          when you <i>use it.</i>
        </h2>

      </motion.div>


      {/* ===================================================
          CARDS
      =================================================== */}

      <div className="why-grid">

        {points.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.article
              className="why-card"
              key={item.number}

              initial={{
                opacity: 0,
                y: 35,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
                amount: 0.15,
              }}

              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}

              whileHover={{
                y: -6,
              }}
            >


              {/* =========================================
                  TOP
              ========================================= */}

              <div className="why-top">

                <span className="why-number">
                  {item.number}
                </span>

                <div className="why-icon">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

              </div>


              {/* =========================================
                  TITLE
              ========================================= */}

              <h3>
                {item.title}
              </h3>


              {/* =========================================
                  DESCRIPTION
              ========================================= */}

              <p>
                {item.text}
              </p>


              {/* =========================================
                  BOTTOM LINE
              ========================================= */}

              <div className="why-card-line" />

            </motion.article>
          );
        })}

      </div>

    </section>
  );
}


export default WhySection;