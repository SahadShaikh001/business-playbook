import { motion } from "framer-motion";

function Intro() {
  return (
    <section id="about" className="intro section">
      <div className="intro-grid">

        <motion.div
          className="intro-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">
            THE COLLECTION
          </span>

          <span className="intro-index">
            01 / 04
          </span>
        </motion.div>

        <motion.div
          className="intro-content"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2>
            Four books.
            <br />
            <i>Four areas of growth.</i>
          </h2>

          <p>
            A carefully designed collection of practical
            books covering communication, confidence,
            physical development and strategic thinking.
          </p>

          <p>
            No complicated theory. No endless chapters.
            Just useful ideas you can understand,
            remember and apply.
          </p>

          <button
            className="text-link"
            onClick={() =>
              document
                .getElementById("books")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
          >
            DISCOVER THE COLLECTION
            <span>↗</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}

export default Intro;