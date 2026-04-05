"use client";

import { motion } from "framer-motion";
import { FolderOpen, RadioReceiver } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const phrases = [
    "Digital Forensic Investigator",
    "Cybersecurity Learner",
    "Forensic Science Student",
    "OSINT Analyst in Training"
  ];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = phrases[index];
      if (!isDeleting) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(p => p + 1);
        if (charIndex === current.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(p => p - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((p) => (p + 1) % phrases.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden pt-[72px]">
      
      {/* Background Parallax */}
      <div 
        className="absolute inset-0 z-[-2] opacity-15 hidden md:block"
        style={{ backgroundImage: "url('/fingerprint_hero.png')", backgroundSize: "cover", backgroundPosition: "center", filter: "contrast(1.2)" }}
      />
      
      {/* Overlays */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,transparent_0%,var(--background)_75%),linear-gradient(to_bottom,transparent_60%,var(--background)_100%)]" />
      
      {/* Scan Lines */}
      <motion.div 
        animate={{ y: [-100, 800], opacity: [0, 0.4, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-30 z-0"
      />

      <div className="container mx-auto px-5 md:px-10 relative z-10 py-10 md:py-24">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 border border-glass-border rounded-full bg-accent-primary/5 mb-6"
        >
          <motion.span 
            animate={{ boxShadow: ["0 0 0 0 rgba(0,229,255,0.5)", "0 0 0 6px transparent"] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-2 h-2 rounded-full bg-accent-primary"
          />
          <span className="font-mono text-xs tracking-widest text-accent-primary">SYSTEM: PROFILE LOADED</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-heading text-5xl md:text-7xl lg:text-[8rem] font-black leading-none mb-4"
        >
          Ayush<br/>
          <span className="bg-gradient-to-br from-accent-primary to-blue-600 bg-clip-text text-transparent">Kumar</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="font-mono text-lg md:text-xl text-accent-primary mb-5 min-h-[1.5em]"
        >
          <span className="text-slate-500">~$ </span>
          {text}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="inline-block ml-1">|</motion.span>
        </motion.p>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-slate-400 border-l-2 border-accent-primary pl-4 max-w-2xl text-sm md:text-base italic mb-10"
        >
          "Applying scientific principles and analytical reasoning to interpret forensic evidence and investigate digital and physical crime."
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-4 mb-16"
        >
          <a href="#projects" className="btn btn-primary"><FolderOpen size={18} /> View Case Files</a>
          <a href="#contact" className="btn btn-ghost"><RadioReceiver size={18} /> Open Channel</a>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-6 md:gap-10"
        >
          <StatBox num="50+" label="THM Rooms" />
          <div className="w-[1px] h-8 bg-glass-border hidden md:block" />
          <StatBox num="Top 15%" label="Global Rank" />
          <div className="w-[1px] h-8 bg-glass-border hidden md:block" />
          <StatBox num="8.4+" label="CGPA" />
          <div className="w-[1px] h-8 bg-glass-border hidden md:block" />
          <StatBox num="6+" label="Case Studies" />
          <div className="w-[1px] h-8 bg-glass-border hidden md:block" />
          <StatBox num="'A'" label="NCC Grade" />
        </motion.div>

      </div>
    </section>
  );
}

function StatBox({ num, label }: { num: string, label: string }) {
  return (
    <div className="text-center sm:text-left">
      <span className="block font-mono text-2xl md:text-3xl font-bold text-accent-primary">{num}</span>
      <span className="block text-xs uppercase tracking-[2px] text-slate-500 mt-1">{label}</span>
    </div>
  );
}
