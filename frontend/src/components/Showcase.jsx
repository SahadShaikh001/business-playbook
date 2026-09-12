import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { books } from "../data/content";

function Showcase() {
  const goToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="showcase" className="showcase section">
      {/* LEFT CONTENT */}
      <motion.div
        className="showcase-content"
        initial={{
          opacity: 0,
          x: -40,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <p className="eyebrow">OUR COLLECTION</p>

        <h2>
          Books built to be
          <br />
          <i>used every day.</i>
        </h2>

        <p>
          Practical books and workbooks designed to help
          you improve your focus, discipline, mindset and
          everyday performance.
        </p>

        <div className="showcase-points">
          <span>✓ Practical and concise</span>
          <span>✓ Digital reading access</span>
          <span>✓ Designed for repeat reading</span>
          <span>✓ Instant digital delivery</span>
        </div>

        <button
          className="button dark"
          onClick={goToPricing}
        >
          Choose your edition
          <ArrowUpRight size={17} />
        </button>
      </motion.div>

      {/* RIGHT BOOK DISPLAY */}
      <motion.div
        className="showcase-visual"
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="showcase-books">

          {/* DOPAMINE DETOX */}
          {books?.[0] && (
            <motion.div
              className="showcase-book showcase-book-one"
              initial={{
                opacity: 0,
                x: -30,
                rotate: -6,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: -6,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
            >
              <img
                src={books[0].images.mockup}
                alt={books[0].title}
              />
            </motion.div>
          )}

          {/* UNLOCK YOUR FOCUS */}
          {books?.[1] && (
            <motion.div
              className="showcase-book showcase-book-two"
              initial={{
                opacity: 0,
                x: 30,
                rotate: 6,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotate: 6,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
            >
              <img
                src={books[1].images.mockup}
                alt={books[1].title}
              />
            </motion.div>
          )}
        </div>

        <div className="book-shadow" />
      </motion.div>
    </section>
  );
}

export default Showcase;