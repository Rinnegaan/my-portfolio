"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, User, Code, Shield, FolderGit2, Mail as MailIcon } from "lucide-react";
import { LimelightNav } from "./limelight-nav";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { name: "// recon_about", href: "#about" },
    { name: "// util_skills", href: "#skills" },
    { name: "// cyber_intel", href: "#cyber" },
    { name: "// case_files", href: "#projects" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "acrylic border-b border-glass-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-5 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#home" className="font-mono text-xl font-bold tracking-widest text-foreground">
          <span className="text-accent-primary">[</span>AK<span className="text-accent-primary">]</span>
        </a>

        {/* Desktop Links (Limelight Nav) */}
        <div className="hidden md:block">
          <LimelightNav 
            items={[
              { id: 'about', icon: <User />, label: 'recon_about', onClick: () => { document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) } },
              { id: 'skills', icon: <Code />, label: 'util_skills', onClick: () => { document.querySelector('#skills')?.scrollIntoView({ behavior: 'smooth' }) } },
              { id: 'cyber', icon: <Shield />, label: 'cyber_intel', onClick: () => { document.querySelector('#cyber')?.scrollIntoView({ behavior: 'smooth' }) } },
              { id: 'projects', icon: <FolderGit2 />, label: 'case_files', onClick: () => { document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) } },
              { id: 'contact', icon: <MailIcon />, label: '_contact', onClick: () => { document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) } },
            ]}
            className="bg-transparent border-none outline-none shadow-none"
            iconClassName="text-slate-400 group-hover:text-accent-primary"
            limelightClassName="bg-accent-primary shadow-[0_30px_15px_rgba(0,229,255,0.4)]"
          />
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden acrylic border-b border-glass-border"
      >
        <ul className="flex flex-col px-5 py-6 gap-5 font-mono">
          {links.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-slate-400 hover:text-accent-primary"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="text-accent-primary" onClick={() => setMobileOpen(false)}>
              ~/_contact
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}
