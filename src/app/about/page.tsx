"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Cpu, Code2, Terminal, BookOpen, Target, Award, Mail, ExternalLink } from "lucide-react";

export default function AboutPage() {
  const SKILLS = [
    { category: "☁️ CLOUD INFRA", items: ["AWS EC2", "AWS S3", "AWS VPC", "IAM", "CloudWatch", "Lambda", "ECR", "CodePipeline"] },
    { category: "⚙️ DEVOPS CORE", items: ["Docker", "Jenkins", "GitHub Actions", "SonarQube", "CI/CD Pipelines", "GitOps"] },
    { category: "🐧 SYSTEMS", items: ["Linux Administration", "Ubuntu", "Bash Scripting", "systemd", "Cron Jobs", "SSH"] },
    { category: "🌐 NETWORKING", items: ["TCP/IP", "OSI Model", "DNS/DHCP", "HTTP/HTTPS", "IP Subnetting", "VPC Routing"] },
    { category: "💻 PROGRAMMING", items: ["Python", "Bash", "YAML", "Groovy (Pipeline DSL)", "Git", "Markdown"] },
    { category: "🎯 LEARNING NOW", items: ["Kubernetes", "Terraform", "Helm", "ArgoCD", "MLOps", "Prometheus"] }
  ];

  const MISSIONS = [
    { code: "M-001", label: "AWS EC2 + Apache Web Deployment", tier: "BEGINNER", color: "text-green-400" },
    { code: "M-002", label: "Multi-Stage Docker Build Optimization", tier: "BEGINNER", color: "text-green-400" },
    { code: "M-003", label: "AWS S3 Event Trigger Automation", tier: "BEGINNER", color: "text-green-400" },
    { code: "M-004", label: "Jenkins Zero-to-Hero CI/CD Pipeline", tier: "INTERMEDIATE", color: "text-zenitsu-yellow" },
    { code: "M-005", label: "AWS Resource Tracker + GitHub API", tier: "INTERMEDIATE", color: "text-zenitsu-yellow" },
    { code: "M-006", label: "Ultimate CI/CD: Jenkins + SonarQube + Docker", tier: "INTERMEDIATE", color: "text-zenitsu-yellow" },
    { code: "M-007", label: "AWS CodePipeline + ECR Native CI/CD", tier: "INTERMEDIATE", color: "text-zenitsu-yellow" },
    { code: "M-008", label: "GitHub Actions Auto-Deploy to AWS EC2", tier: "ADVANCED", color: "text-zenitsu-orange" }
  ];

  const OBJECTIVES = [
    { goal: "Kubernetes Cluster Orchestration", progress: 15, target: "Q3 2026" },
    { goal: "Terraform Infrastructure as Code", progress: 40, target: "Q4 2026" },
    { goal: "GitOps with ArgoCD & Helm", progress: 10, target: "Q1 2027" },
    { goal: "AI-Powered DevOps Automation", progress: 5, target: "Q2 2027" }
  ];

  return (
    <div className="flex-grow flex flex-col font-mono space-y-10 py-8 max-w-5xl mx-auto w-full">

      {/* ── DOSSIER HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-b-2 border-zenitsu-gray pb-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-zenitsu-yellow/30 bg-zenitsu-yellow/5 text-[9px] tracking-widest text-zenitsu-yellow uppercase rounded-full mb-4">
          <Shield className="h-3 w-3 animate-pulse" />
          [ CLASSIFIED OPERATOR DOSSIER — CLEARANCE LEVEL: PUBLIC ]
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-3">
          <img 
            src="/thunder-svgrepo-com.svg" 
            alt="Thunder Logo" 
            className="h-8 w-8 animate-thunder-blink flex-shrink-0" 
          />
          GOWTHAM B
        </h1>
        <p className="text-xs text-zenitsu-yellow mt-2 uppercase tracking-widest font-bold">
          ⚡ B.E. CSE Graduate & Aspiring DevOps Engineer · Cloud Infrastructure Learner
        </p>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
          Tiruppur, Tamil Nadu, India · Active Deployment: KSR Institute for Engineering and Technology
        </p>
      </motion.div>

      {/* ── BIO / MISSION STATEMENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}
        className="bg-zenitsu-dark border border-zenitsu-yellow/20 p-6 sketch-border relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-zenitsu-yellow/3 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-4">
          <Cpu className="h-4 w-4 text-zenitsu-yellow" />
          <span className="text-[10px] text-zenitsu-yellow font-bold uppercase tracking-widest">[ OPERATOR BIOGRAPHY ]</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">
          I am <span className="text-zenitsu-yellow font-bold">Gowtham B</span>, a Computer Science and Engineering Graduate (2022–2026) 
          specializing in <span className="text-zenitsu-light font-bold">DevOps engineering</span>, cloud infrastructure automation, 
          and continuous delivery pipelines. My mission is to architect resilient, scalable cloud systems that ship faster and break less.
        </p>
        <p className="text-xs text-gray-300 leading-relaxed mt-3">
          I build production-grade <span className="text-zenitsu-yellow font-bold">CI/CD pipelines</span> with Jenkins, 
          containerize workloads with <span className="text-zenitsu-yellow font-bold">Docker</span>, orchestrate cloud infra on 
          <span className="text-zenitsu-yellow font-bold"> AWS</span>, and automate everything with 
          <span className="text-zenitsu-yellow font-bold"> Bash scripting</span>. 
          Currently leveling up in <span className="text-zenitsu-orange font-bold">Kubernetes</span>, 
          <span className="text-zenitsu-orange font-bold"> Terraform</span>, and <span className="text-zenitsu-orange font-bold">GitOps</span>.
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href="mailto:gowthamsasuke2005@gmail.com" className="flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-zenitsu-yellow transition-colors uppercase tracking-wider">
            <Mail className="h-3 w-3" /> gowthamsasuke2005@gmail.com
          </a>
          <a href="https://linkedin.com/in/gowtham-b" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-zenitsu-yellow transition-colors uppercase tracking-wider">
            <ExternalLink className="h-3 w-3" /> LinkedIn
          </a>
          <a href="https://github.com/B-Gowtham-1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[9px] text-gray-400 hover:text-zenitsu-yellow transition-colors uppercase tracking-wider">
            <ExternalLink className="h-3 w-3" /> GitHub
          </a>
        </div>
      </motion.div>

      {/* ── EDUCATION ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.55 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-4 w-4 text-zenitsu-yellow" />
          <span className="text-[10px] text-zenitsu-yellow font-bold uppercase tracking-widest">[ ACADEMIC CLEARANCE RECORDS ]</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: "B.E. Computer Science & Engineering", sub: "KSR Institute for Engineering and Technology", val: "CGPA 7.8", period: "2022 – 2026", highlight: true },
            { label: "Higher Secondary Certificate (HSC)", sub: "Tamil Nadu State Board", val: "82%", period: "2021 – 2022", highlight: false },
            { label: "Secondary School Certificate (SSLC)", sub: "Tamil Nadu State Board", val: "92.4%", period: "2019 – 2020", highlight: false }
          ].map((edu, i) => (
            <div key={i} className={`border p-4 bg-zenitsu-dark ${edu.highlight ? "border-zenitsu-yellow/40 shadow-neonYellow/5" : "border-zenitsu-gray"}`}>
              <div className={`text-lg font-black mb-1 ${edu.highlight ? "text-zenitsu-yellow" : "text-zenitsu-light"}`}>{edu.val}</div>
              <div className="text-[9px] text-zenitsu-light font-bold uppercase tracking-wider leading-tight">{edu.label}</div>
              <div className="text-[9px] text-gray-500 mt-1 uppercase">{edu.sub}</div>
              <div className="text-[8px] text-gray-600 mt-1 uppercase">{edu.period}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── SKILLS GRID ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.55 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Code2 className="h-4 w-4 text-zenitsu-yellow" />
          <span className="text-[10px] text-zenitsu-yellow font-bold uppercase tracking-widest">[ ACTIVE WEAPON SYSTEMS — TECHNICAL SKILLS ]</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((sk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.08, duration: 0.4 }}
              className="border border-zenitsu-gray bg-zenitsu-dark p-4 hover:border-zenitsu-yellow/40 transition-all duration-300 group"
            >
              <div className="text-[9px] text-zenitsu-yellow font-black uppercase tracking-widest mb-3 group-hover:text-zenitsu-light transition-colors">{sk.category}</div>
              <div className="flex flex-wrap gap-1.5">
                {sk.items.map((item, i) => (
                  <span key={i} className="px-2 py-0.5 bg-zenitsu-darkest border border-zenitsu-gray text-[8px] text-gray-300 uppercase tracking-wide hover:border-zenitsu-yellow/50 hover:text-zenitsu-yellow transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── MISSION ARCHIVE ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46, duration: 0.55 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4 text-zenitsu-yellow" />
          <span className="text-[10px] text-zenitsu-yellow font-bold uppercase tracking-widest">[ COMPLETED MISSION ARCHIVE — PROJECT LOG ]</span>
        </div>
        <div className="border border-zenitsu-gray bg-zenitsu-dark divide-y divide-zenitsu-gray/50">
          {MISSIONS.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.06, duration: 0.4 }}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 hover:bg-zenitsu-darkest transition-colors group"
            >
              <span className="text-[9px] text-gray-600 font-mono w-16 flex-shrink-0">{m.code}</span>
              <span className="text-xs text-gray-200 flex-grow group-hover:text-zenitsu-light transition-colors">{m.label}</span>
              <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 border border-current/20 flex-shrink-0 ${m.color}`}>
                {m.tier}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── ACTIVE OBJECTIVES ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.55 }}
        className="bg-zenitsu-dark border border-zenitsu-orange/30 p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-4 w-4 text-zenitsu-orange" />
          <span className="text-[10px] text-zenitsu-orange font-bold uppercase tracking-widest">[ ACTIVE OBJECTIVES — ROADMAP 2026 ]</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OBJECTIVES.map((obj, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] text-gray-300 uppercase tracking-wide">{obj.goal}</span>
                <span className="text-[8px] text-gray-500 uppercase">{obj.target}</span>
              </div>
              <div className="h-1 bg-zenitsu-darkest border border-zenitsu-gray rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${obj.progress}%` }}
                  transition={{ delay: 1 + i * 0.2, duration: 0.8, ease: "easeOut" as const }}
                  className="h-full bg-gradient-to-r from-zenitsu-yellow to-zenitsu-orange rounded-full"
                />
              </div>
              <div className="text-[8px] text-gray-600 uppercase">{obj.progress}% OPERATIONAL</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── CTA to AI Terminal ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="border-t-2 border-zenitsu-gray pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest">Want to go deeper?</p>
          <p className="text-[10px] text-gray-600 uppercase mt-0.5">Activate the AI system to ask questions, explore projects, or get a recruiter summary.</p>
        </div>
        <a
          href="/terminal"
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 bg-zenitsu-dark border-2 border-zenitsu-yellow hover:bg-zenitsu-yellow hover:text-zenitsu-darkest text-zenitsu-yellow text-[10px] font-black tracking-widest uppercase transition-all duration-300 sketch-border-gold shadow-neonYellow"
        >
          <Terminal className="h-3.5 w-3.5" />
          ⚡ LAUNCH THUNDER SYSTEM AI
        </a>
      </motion.div>

    </div>
  );
}
