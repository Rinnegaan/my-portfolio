"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ tag, title, accent }: { tag: string, title: string, accent: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12"
    >
      <span className="block font-mono text-xs tracking-[3px] text-slate-400 mb-3 uppercase">
        {tag}
      </span>
      <h2 className="block font-heading text-4xl md:text-5xl font-bold relative pb-3 w-fit">
        {title} <span className="text-accent-primary">{accent}</span>
        <span className="absolute bottom-0 left-0 w-2/5 h-[3px] bg-gradient-to-r from-accent-primary to-transparent rounded-full"></span>
      </h2>
    </motion.div>
  );
}
