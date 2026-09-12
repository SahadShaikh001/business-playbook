import { motion } from "framer-motion";
import { lessons } from "../data/content";

function Lessons() {
  return (
    <section id="books" className="lessons section">

      <div className="section-heading centered">
        <p className="eyebrow">
          THE BOOKS
        </p>

        <h2>
          Ideas worth
          <br />
          <i>remembering.</i>
        </h2>

        <p>
          Practical books designed around ideas you
          can understand and apply immediately.
        </p>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson, index) => (
          <motion.article
            className="lesson-card"
            key={lesson.number}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-50px",
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
            }}
          >
            <span className="lesson-number">
              BOOK {lesson.number}
            </span>

            <div className="lesson-content">
              <h3>{lesson.title}</h3>
              <p>{lesson.text}</p>
            </div>

            <span className="lesson-arrow">
              ↗
            </span>
          </motion.article>
        ))}
      </div>

    </section>
  );
}

export default Lessons;