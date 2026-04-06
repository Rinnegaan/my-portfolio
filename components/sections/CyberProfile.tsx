"use client";

import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { UserSearch, Medal, ShieldCheck, Award, Network, Globe, MonitorSmartphone } from "lucide-react";

export default function CyberProfile() {
  return (
    <section id="cyber" className="py-24 relative bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent">
      <div className="container mx-auto px-5 md:px-10">
        <SectionHeader tag="[RECORD::CYBER_INTEL]" title="Cyber" accent="Profile" />
        
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          
          <motion.a 
            href="https://tryhackme.com/p/ayushkr54881" target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card flex flex-col gap-8 group/card block cursor-pointer"
          >
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-5xl text-accent-primary"><UserSearch /></div>
              <div>
                <h3 className="text-2xl font-bold font-heading">TryHackMe</h3>
                <span className="font-mono text-accent-primary group-hover/card:underline">
                  ayushkr54881
                </span>
              </div>
              <div className="ml-auto inline-flex items-center gap-2 px-3 py-1 bg-accent-primary/10 border border-glass-border rounded-full font-mono text-xs text-accent-primary">
                <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse"></span> ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-3 border border-glass-border rounded-xl overflow-hidden divide-x divide-glass-border">
              <div className="flex flex-col items-center py-4 px-2 text-center">
                <span className="font-mono text-xl md:text-3xl font-bold text-accent-primary">Top 15%</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Global Ranking</span>
              </div>
              <div className="flex flex-col items-center py-4 px-2 text-center">
                <span className="font-mono text-xl md:text-3xl font-bold text-accent-primary">50+</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">Rooms Done</span>
              </div>
              <div className="flex flex-col items-center py-4 px-2 text-center">
                <span className="font-mono text-xl md:text-3xl font-bold text-accent-primary">1st</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">League Rank</span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-3 mb-5">
                <Badge color="bronze" text="Bronze 1st" icon={<Medal size={14}/>} />
                <Badge color="silver" text="Silver 1st" icon={<Medal size={14}/>} />
                <Badge color="gold" text="Gold 1st" icon={<Medal size={14}/>} />
              </div>
              <div className="flex flex-wrap gap-2">
                <FocusTag icon={<Network size={12}/>} text="Networking" />
                <FocusTag icon={<Globe size={12}/>} text="Web Security" />
                <FocusTag icon={<MonitorSmartphone size={12}/>} text="System Sec" />
              </div>
            </div>
          </motion.a>

          <div className="flex flex-col gap-4">
            <Achievement delay={0.1} icon={<Award/>} title="Forensic Fest — Pramaan" desc="Certificate of Appreciation, 2025 & 2026" />
            <Achievement delay={0.2} icon={<Globe/>} title="Global Fun Fest" desc="Participation Certificate 2024–25" />
            <Achievement delay={0.3} icon={<ShieldCheck/>} title="OSINT & Cybersecurity" desc="Learning Certifications Achieved" />
            <Achievement delay={0.4} icon={<Medal/>} title="NCC 'A' Grade" desc="Discipline, leadership, endurance & teamwork" />
          </div>

        </div>
      </div>
    </section>
  );
}

function Badge({ color, text, icon }: { color: string, text: string, icon: React.ReactNode }) {
  const colors: Record<string, string> = {
    bronze: "bg-[#CD7F32]/10 border-[#CD7F32]/40 text-[#CD7F32]",
    silver: "bg-[#C0C0C0]/10 border-[#C0C0C0]/40 text-[#C0C0C0]",
    gold: "bg-[#FFD700]/10 border-[#FFD700]/40 text-[#FFD700]"
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono border rounded-md ${colors[color]}`}>
      {icon} {text}
    </span>
  );
}

function FocusTag({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono border border-glass-border bg-accent-primary/5 rounded-md text-slate-400">
      {icon} {text}
    </span>
  );
}

function Achievement({ delay, icon, title, desc }: { delay: number, icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay }} viewport={{ once: true }}
      className="glass-card flex items-start gap-4 !p-5"
    >
      <div className="text-accent-primary mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-slate-200">{title}</h4>
        <p className="text-sm text-slate-400 mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}
