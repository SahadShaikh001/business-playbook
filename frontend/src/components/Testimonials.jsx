import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/content";

function Testimonials() {
  return (
    <section id="reviews" className="reviews section">
      {/* HEADER */}
      <div className="section-heading centered reviews-heading">
        <p className="eyebrow">WALL OF LOVE</p>

        <h2>
          Made for people who
          <br />
          <i>want more from themselves.</i>
        </h2>

        <p>
          Real readers. Real takeaways.
          <br />
          Built for people who want practical ideas they can actually use.
        </p>
      </div>

      {/* TESTIMONIALS */}
      <div className="testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <motion.blockquote
            key={testimonial.name}
            className="testimonial-card"
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.12,
              ease: "easeOut",
            }}
          >
            {/* STARS */}
            <div className="stars" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            {/* QUOTE */}
            <p className="testimonial-quote">
              “{testimonial.quote}”
            </p>

            {/* AUTHOR */}
            <footer className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonial.name?.charAt(0)}
              </div>

              <div className="testimonial-person">
                <strong>{testimonial.name}</strong>

                <span>{testimonial.role}</span>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;