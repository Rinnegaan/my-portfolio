"use client";

import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { GraduationCap, Shield, Fingerprint, Search, Brain, Bone, Activity } from "lucide-react";

export default function About() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-5 md:px-10">
        <SectionHeader tag="[RECORD::AGENT_PROFILE]" title="About" accent="Me" />

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative group select-none"
            style={{ aspectRatio: "3/4", maxHeight: "520px" }}
          >
            {/* The photo itself */}
            <img
              src="/ayush_profile.jpg"
              alt="Ayush Kumar"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(1.1) contrast(1.15) grayscale(1)" }}
            />

            {/* Cyan luminosity tint */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(0,229,255,0.06)", mixBlendMode: "screen" }}
            />

            {/* Fade edges into page background */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `
                linear-gradient(to bottom,  #030408 0%, transparent 18%, transparent 72%, #030408 100%),
                linear-gradient(to right,   #030408 0%, transparent 18%),
                linear-gradient(to left,    #030408 0%, transparent 18%)
              `
            }} />

            {/* Subtle accent glow behind figure */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,229,255,0.07) 0%, transparent 70%)" }}
            />

            {/* HUD corner brackets */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-accent-primary opacity-60" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t-2 border-r-2 border-accent-primary opacity-60" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b-2 border-l-2 border-accent-primary opacity-60" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-accent-primary opacity-60" />

            {/* Identity tag */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-accent-primary opacity-50 uppercase whitespace-nowrap">
              AK_54881 :: VERIFIED
            </div>
          </motion.div>

          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-6">
            <motion.p variants={item} className="text-slate-300 text-lg">
              I am a 3rd-year <strong className="text-accent-primary font-medium">B.Sc. Forensic Science (Hons.)</strong> student at Parul University with strong academic performance and interdisciplinary training spanning forensic anthropology, odontology, questioned document examination, criminology, and cybersecurity.
            </motion.p>
            <motion.p variants={item} className="text-slate-400">
              Experienced in evidence interpretation, human identification, and crime scene analysis through structured academic projects and laboratory-based practical work. I blend scientific rigor with analytical thinking to solve investigative challenges.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-3 mt-2">
              <Badge icon={<Fingerprint size={14}/>} text="Digital Forensics" />
              <Badge icon={<Shield size={14}/>} text="Cybersecurity" />
              <Badge icon={<Search size={14}/>} text="OSINT" />
              <Badge icon={<Brain size={14}/>} text="Crim. Psychology" />
              <Badge icon={<Bone size={14}/>} text="Anthropology" />
              <Badge icon={<Activity size={14}/>} text="Odontology" />
            </motion.div>

            <motion.div variants={item} className="glass-card mt-4 flex gap-5 items-start">
              <div className="text-accent-primary mt-1"><GraduationCap size={28} /></div>
              <div>
                <h3 className="font-bold text-lg">B.Sc. Forensic Science (Hons.)</h3>
                <p className="text-slate-400 text-sm mb-3">Parul Institute of Applied Sciences, Gujarat &nbsp;|&nbsp; 2024 – Present</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <SgpaBox sem="Sem I" val="8.0" />
                  <SgpaBox sem="Sem II" val="8.36" />
                  <SgpaBox sem="Sem III" val="8.95" />
                  <SgpaBox sem="Sem IV" val="Ongoing" active />
                </div>
                <p className="font-mono text-xs text-accent-primary">CGPA: ~8.4+ &nbsp;|&nbsp; No Backlogs</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-primary/5 border border-glass-border rounded-full text-xs font-mono text-accent-primary">
      {icon} {text}
    </span>
  );
}

function SgpaBox({ sem, val, active }: { sem: string, val: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 rounded-lg border min-w-[64px] ${active ? 'bg-accent-secondary/5 border-accent-secondary/30' : 'bg-accent-primary/5 border-glass-border'}`}>
      <span className="font-mono text-[10px] text-slate-500">{sem}</span>
      <span className={`font-mono font-bold ${active ? 'text-sm text-slate-400' : 'text-lg text-accent-primary'}`}>{val}</span>
    </div>
  );
}
