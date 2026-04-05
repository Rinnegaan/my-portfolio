"use client";

import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-[#020306] py-10 relative z-10">
      <div className="container mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <span className="font-mono text-xl font-bold tracking-widest text-accent-primary opacity-50">
          [AK]
        </span>

        <p className="font-mono text-xs text-slate-500 text-center md:text-left">
          © 2026 <span className="text-accent-primary">Ayush Kumar</span> &nbsp;·&nbsp; All access monitored.
        </p>

        <div className="flex gap-4">
          <a href="mailto:ayushkr54881@gmail.com" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-accent-primary hover:text-[#020306] transition-colors">
            <Mail size={14} />
          </a>
          <a href="https://www.linkedin.com/in/ayush-kumar-918a3b354" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-accent-primary hover:text-[#020306] transition-colors">
            <Linkedin size={14} />
          </a>
          <a href="https://github.com/Rinnegaan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-accent-primary hover:text-[#020306] transition-colors">
            <Github size={14} />
          </a>
        </div>

      </div>
    </footer>
  );
}
