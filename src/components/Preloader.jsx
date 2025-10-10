import React from "react";
import { motion } from "framer-motion";

const text = "Streamr";

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-[#141414] text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex space-x-1 text-5xl font-bold tracking-widest">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.2,
              duration: 0.3,
              ease: "easeOut",
            }}
            style={{
              color: "#b9b9b9",
               
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default Preloader;
