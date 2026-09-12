import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Camera } from "lucide-react";

function Author() {
  const openInstagram = () => {
    window.open(
      "https://www.instagram.com/psychologyinreal/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="author" className="author section">
      <div className="author-grid">

        {/* =========================
            AUTHOR VISUAL
        ========================== */}
        <motion.div
          className="author-visual"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="author-card">

            <div className="author-card-top">
              <span>THE MIND BEHIND THE COLLECTION</span>
              <Sparkles size={16} />
            </div>

            <div className="author-monogram">
              PR
            </div>

            <div className="author-card-bottom">
              <strong>@psychologyinreal</strong>

              <span>
                Psychology · Behaviour · Self Growth
              </span>
            </div>

          </div>
        </motion.div>


        {/* =========================
            AUTHOR CONTENT
        ========================== */}
        <motion.div
          className="author-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >

          <p className="eyebrow">
            THE AUTHOR
          </p>

          <h2>
            Ideas that make
            <br />
            <i>you think differently.</i>
          </h2>

          <p className="author-description">
            Behind the collection is{" "}
            <strong>@psychologyinreal</strong> — a platform
            focused on psychology, human behaviour,
            personal development and practical ideas
            for everyday life.
          </p>

          <p className="author-description">
            The goal is simple: turn useful ideas into
            lessons that are easier to understand,
            remember and apply.
          </p>


          {/* =========================
              AUTHOR TOPICS
          ========================== */}
          <div className="author-meta">

            <div>
              <strong>01</strong>
              <span>Psychology</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Behaviour</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Self Growth</span>
            </div>

          </div>


          {/* =========================
              INSTAGRAM BUTTON
          ========================== */}
          <button
            className="author-link"
            type="button"
            onClick={openInstagram}
          >
            <Camera size={15} />

            <span>
              FOLLOW @PSYCHOLOGYINREAL
            </span>

            <ArrowUpRight size={15} />
          </button>

        </motion.div>

      </div>
    </section>
  );
}

export default Author;