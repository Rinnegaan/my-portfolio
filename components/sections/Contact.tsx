"use client";

import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { Mail, Phone, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-gradient-to-t from-accent-primary/5 to-transparent">
      <div className="container mx-auto px-5 md:px-10">
        <SectionHeader tag="[RECORD::OPEN_CHANNEL]" title="Initiate" accent="Contact" />
        
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-card mb-8 border-l-4 border-l-accent-primary"
          >
            <p className="font-mono text-sm text-accent-primary mb-3">"Applying scientific principles and analytical reasoning to interpret forensic evidence and investigate digital and physical crime."</p>
            <p className="text-slate-300">Targeting a career in <strong className="text-accent-primary">digital forensics</strong> and <strong className="text-accent-primary">cybercrime investigation</strong>. Open to collaborations, internships, and investigative challenges. Let's connect.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ContactCard 
              icon={<Mail size={20} />} label="EMAIL" val="ayushkr54881@gmail.com" 
              link="mailto:ayushkr54881@gmail.com" delay={0.1} 
            />
            <ContactCard 
              icon={<Phone size={20} />} label="PHONE" val="+91 82716 44852" 
              link="tel:+918271644852" delay={0.2} 
            />
            <ContactCard 
              icon={<Linkedin size={20} />} label="LINKEDIN" val="ayush-kumar-918a3b354" 
              link="https://www.linkedin.com/in/ayush-kumar-918a3b354" delay={0.3} 
            />
            <ContactCard 
              icon={<Github size={20} />} label="GITHUB" val="github.com/Rinnegaan" 
              link="https://github.com/Rinnegaan" delay={0.4} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, label, val, link, delay }: any) {
  return (
    <motion.a 
      href={link} target={link.startsWith("http") ? "_blank" : undefined} rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay }} viewport={{ once: true }}
      className="glass-card !p-5 flex items-center gap-4 hover:border-accent-primary/50 group"
    >
      <div className="w-10 h-10 rounded bg-accent-primary/10 text-accent-primary flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <span className="block font-mono text-[10px] tracking-widest text-slate-500 mb-1">{label}</span>
        <span className="block text-slate-200 text-sm font-medium group-hover:text-accent-primary transition-colors">{val}</span>
      </div>
    </motion.a>
  );
}
