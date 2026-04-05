"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Video, Fingerprint, Bone, Stethoscope, FileSignature, Scale } from "lucide-react";

export default function Projects() {
  const cases = [
    {
      id: "001", status: "RESOLVED",
      icon: <Video size={20} />, title: "CCTV Footage Analysis",
      desc: "Forensic video analysis with timeline reconstruction and behavioral mapping across a simulated crime scene. 8+ page structured report.",
      items: ["Timeline reconstruction", "Behavioral pattern observation", "Movement tracking", "Forensic documentation"],
      tags: ["Video Evidence", "Investigation"]
    },
    {
      id: "002", status: "ARCHIVED",
      icon: <Fingerprint size={20} />, title: "Fingerprint & Impression Study",
      desc: "Comprehensive classification of fingerprint patterns with ridge minutiae analysis for individual forensic profiling.",
      items: ["Loop, whorl & arch classification", "Ridge characteristic analysis", "Uniqueness principles"],
      tags: ["Biometrics", "Pattern Analysis"]
    },
    {
      id: "003", status: "ARCHIVED",
      icon: <Bone size={20} />, title: "Forensic Anthropology Study",
      desc: "Skeletal analysis of long bones for identification — sex, age, and species determination through osteometric measurements.",
      items: ["Osteometric analysis", "Skeletal classification", "Cranial feature examination", "Age estimation"],
      tags: ["Anthropology", "Osteology"]
    },
    {
      id: "004", status: "ARCHIVED",
      icon: <Stethoscope size={20} />, title: "Forensic Odontology & Bite Marks",
      desc: "Bite mark evidence collection, preservation, and comparative analysis applied in identification and medico-legal contexts.",
      items: ["Casting & preservation", "Comparative analysis", "Medico-legal application"],
      tags: ["Odontology", "DVI"]
    },
    {
      id: "005", status: "ARCHIVED",
      icon: <FileSignature size={20} />, title: "Questioned Document & Fraud",
      desc: "Detection of document alterations, forgery identification, and handwriting analysis with security feature examination of official documents.",
      items: ["Detection of physical/chemical erasures", "Handwriting & alignment analysis", "Security features"],
      tags: ["Document Examination", "Fraud"]
    },
    {
      id: "006", status: "ARCHIVED",
      icon: <Scale size={20} />, title: "Criminology & Crime Reconstruction",
      desc: "Crime reconstruction using forensic evidence, injury pattern interpretation, and application of criminal law principles to investigative findings.",
      items: ["Crime reconstruction via evidence", "Injury pattern interpretation", "Legal significance"],
      tags: ["Criminology", "Criminal Law"]
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-5 md:px-10">
        <SectionHeader tag="[RECORD::CASE_FILES]" title="Case" accent="Files" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <CaseCard key={i} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseCard({ id, status, icon, title, desc, items, tags, index }: any) {
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
      className="glass-card relative flex flex-col group h-full"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 229, 255, 0.15), transparent 80%)` }}
      />
      
      <div className="flex justify-between items-start mb-6">
        <span className="font-mono text-xs text-slate-500 tracking-wider">[CASE::{id}]</span>
        <span className={`font-mono text-[10px] tracking-widest px-2 py-1 rounded border ${status === 'RESOLVED' ? 'border-accent-primary text-accent-primary bg-accent-primary/10' : 'border-slate-600 text-slate-400 bg-slate-800/50'}`}>
          {status}
        </span>
      </div>

      <div className="text-accent-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold font-sans mb-3">{title}</h3>
      <p className="text-sm text-slate-400 mb-5 leading-relaxed">{desc}</p>
      
      <ul className="flex flex-col gap-2 mb-6 flex-grow">
        {items.map((item: string, i: number) => (
          <li key={i} className="text-xs text-slate-300 pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-accent-primary before:font-mono">
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-glass-border">
        {tags.map((tag: string, i: number) => (
          <span key={i} className="text-[10px] font-mono tracking-wider text-slate-500 uppercase">#{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}
