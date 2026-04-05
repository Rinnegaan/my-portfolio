"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Bone, Stethoscope, FileSignature, Microscope, TerminalSquare, BrainCircuit } from "lucide-react";

export default function Skills() {
  const skills = [
    {
      icon: <Bone size={24} />, title: "Forensic Anthropology",
      items: ["Somatometry & cephalic index", "Osteological long bone analysis", "Sex determination (pelvic morphology)", "Age estimation via dental eruption", "Human vs animal bone differentiation"]
    },
    {
      icon: <Stethoscope size={24} />, title: "Forensic Odontology",
      items: ["Bite mark collection & casting", "Comparative dental analysis", "Age estimation (morphological)", "Mass disaster victim ID (DVI)"]
    },
    {
      icon: <FileSignature size={24} />, title: "Questioned Documents",
      items: ["Detection of erasures & alterations", "Forgery & handwriting analysis", "Passport & currency security features", "Fraud detection techniques"]
    },
    {
      icon: <Microscope size={24} />, title: "Crime Scene & Evidence",
      items: ["Crime scene investigation", "Fingerprint pattern analysis", "CCTV footage analysis", "Evidence collection & documentation"]
    },
    {
      icon: <TerminalSquare size={24} />, title: "Cyber & Digital",
      items: ["Cybersecurity fundamentals", "OSINT & intel gathering", "Multimedia evidence analysis", "SQL & data handling"]
    },
    {
      icon: <BrainCircuit size={24} />, title: "Core Competencies",
      items: ["Analytical reasoning", "Scientific observation", "Structured forensic reporting", "Interdisciplinary integration"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-5 md:px-10">
        <SectionHeader tag="[RECORD::CAPABILITIES]" title="Core" accent="Skills" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <SkillCard key={i} {...skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ icon, title, items, index }: { icon: React.ReactNode, title: string, items: string[], index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      className="glass-card relative flex flex-col gap-4 group"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.15), transparent 80%)`
        }}
      />
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-accent-primary/10 border border-glass-border text-accent-primary">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-sans tracking-wide">{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-slate-400 pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-accent-primary before:font-mono">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
