"use client";

import React, { useState, useEffect } from "react";
import { Zap, Menu, X, ShieldAlert } from "lucide-react";

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { name: "SYSTEM", id: "hero" },
    { name: "ABOUT", id: "about" },
    { name: "SKILLS", id: "skills" },
    { name: "MISSIONS", id: "projects" },
    { name: "EDUCATION", id: "education" },
    { name: "CONNECTIONS", id: "connections" },
  ];

  const aiNavItem = { name: "⚡ AI", id: "ai" };

  // Track scroll position to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-zenitsu-darkest/90 backdrop-blur-md border-b border-zenitsu-gray font-orbitron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Identity */}
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => scrollToSection("hero")} className="flex items-center space-x-2 text-left group">
              <Zap className="h-5 w-5 text-zenitsu-yellow animate-thunder-blink group-hover:text-zenitsu-orange transition-colors" />
              <span className="text-sm font-bold tracking-widest text-zenitsu-light group-hover:text-zenitsu-yellow transition-all uppercase">
                GOWTHAM.B <span className="text-zenitsu-yellow font-extrabold text-xs tracking-wider">// DEVOPS</span>
              </span>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-sm border-b-2 text-[10px] font-bold tracking-widest transition-all duration-200 ${
                  activeSection === item.id
                    ? "border-zenitsu-yellow text-zenitsu-yellow bg-zenitsu-glow"
                    : "border-transparent text-gray-400 hover:text-zenitsu-light hover:bg-zenitsu-dark"
                }`}
              >
                {item.name}
              </button>
            ))}
            {/* AI Special Button */}
            <button
              onClick={() => scrollToSection(aiNavItem.id)}
              className={`px-3 py-1.5 rounded-sm border-b-2 text-[10px] font-bold tracking-widest transition-all duration-200 ${
                activeSection === aiNavItem.id
                  ? "border-zenitsu-yellow text-zenitsu-yellow bg-zenitsu-glow"
                  : "border-zenitsu-yellow/50 text-zenitsu-yellow hover:bg-zenitsu-yellow/10"
              }`}
            >
              {aiNavItem.name}
            </button>
          </nav>

          {/* Status Badge */}
          <div className="hidden md:flex items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 border border-zenitsu-yellow/30 bg-zenitsu-glow text-[9px] font-bold tracking-widest text-zenitsu-yellow rounded-sm">
              <Zap className="h-3 w-3 text-zenitsu-yellow animate-pulse" />
              STATUS: STABLE_NODE
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-zenitsu-yellow hover:bg-zenitsu-dark focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zenitsu-gray bg-zenitsu-darkest px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`w-full text-left flex items-center px-4 py-2.5 text-xs font-semibold tracking-widest rounded-sm border-l-4 ${
                activeSection === item.id
                  ? "bg-zenitsu-dark border-zenitsu-yellow text-zenitsu-yellow"
                  : "border-transparent text-gray-400 hover:bg-zenitsu-dark hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
          {/* AI link in mobile menu */}
          <button
            onClick={() => scrollToSection(aiNavItem.id)}
            className={`w-full text-left flex items-center px-4 py-2.5 text-xs font-semibold tracking-widest rounded-sm border-l-4 ${
              activeSection === aiNavItem.id
                ? "bg-zenitsu-dark border-zenitsu-yellow text-zenitsu-yellow"
                : "border-zenitsu-yellow/40 text-zenitsu-yellow hover:bg-zenitsu-dark"
            }`}
          >
            {aiNavItem.name}
          </button>
        </div>
      )}
    </header>
  );
};
