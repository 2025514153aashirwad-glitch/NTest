import React from 'react';
import { motion } from 'framer-motion';

export default function Section({ id, eyebrow, title, description, children, gradientClass }) {
  return (
    <section 
      id={id} 
      className={`relative min-h-screen py-48 px-8 md:px-16 flex flex-col justify-center border-t border-white/5 overflow-hidden ${gradientClass}`}
    >
      <div className="relative z-10 container mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={{
             hidden: { opacity: 0, y: 30 },
             visible: { 
               opacity: 1, 
               y: 0,
               transition: {
                 duration: 1.2,
                 ease: [0.19, 1, 0.22, 1],
                 staggerChildren: 0.15
               }
             }
           }}
           className="mb-32"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
            className="mb-8"
          >
            <span className="badge-apple">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[clamp(36px,6vw,80px)] font-display font-semibold text-white leading-[1.1] mb-12 tracking-tight max-w-4xl"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              className="text-lg md:text-xl text-white/30 font-sans font-light leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
