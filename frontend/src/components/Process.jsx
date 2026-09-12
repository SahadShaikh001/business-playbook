import { motion } from "framer-motion";
import { process } from "../data/content";

function Process() {
  return (
    <section className="process section">

      <div className="section-heading">
        <p className="eyebrow">
          A SIMPLE SYSTEM
        </p>

        <h2>
          Read less.
          <br />
          <i>Apply more.</i>
        </h2>
      </div>

      <div className="process-list">
        {process.map((item, index) => (
          <motion.div
            className="process-item"
            key={item.number}
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
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
          >
            <span className="process-number">
              {item.number}
            </span>

            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Process;