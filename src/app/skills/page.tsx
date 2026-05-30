"use client";

import React, { useEffect, useState } from "react";
import mockDb from "@/lib/supabase";
import { Cpu, Zap, Network, Layout, Terminal, Code, Settings } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const { data, error } = await mockDb.skills.select();
        if (error) {
          setErrorMessage("Failed to decrypt technical matrix data.");
        } else if (data) {
          setSkills(data);
        }
      } catch (err) {
        setErrorMessage("Fatal communication fault with database layer.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  // Custom Category Icons helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "networking":
        return <Network className="h-5 w-5 text-zenitsu-yellow" />;
      case "protocols":
        return <Layout className="h-5 w-5 text-zenitsu-orange" />;
      case "systems":
        return <Terminal className="h-5 w-5 text-zenitsu-yellow" />;
      case "cloud":
        return <Cpu className="h-5 w-5 text-zenitsu-orange" />;
      case "devops":
        return <Settings className="h-5 w-5 text-zenitsu-yellow animate-spin" style={{ animationDuration: "12s" }} />;
      default:
        return <Code className="h-5 w-5 text-zenitsu-light" />;
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <Cpu className="h-8 w-8 text-zenitsu-yellow animate-spin mb-3" />
        <p className="text-xs text-gray-500 tracking-widest">[ DECRYPTING TECHNICAL MATRIX... ]</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col font-mono space-y-8 py-4">
      
      {/* Page Header */}
      <div className="border-b-2 border-zenitsu-gray pb-4">
        <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
          <Cpu className="h-6 w-6 text-zenitsu-yellow animate-pulse" />
          TECHNICAL_MATRIX
        </h1>
        <p className="text-[10px] text-gray-500 mt-1 uppercase">
          Orchestration engineering competencies, network infrastructure layers, and programming disciplines
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/20 border border-red-500/40 text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Skills Matrix Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => (
          <section
            key={category}
            className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border space-y-5"
          >
            {/* Category Header */}
            <div className="flex items-center gap-2 border-b border-zenitsu-gray pb-3">
              {getCategoryIcon(category)}
              <h2 className="text-sm font-black text-zenitsu-light uppercase tracking-wider">
                {category} OPERATIONS
              </h2>
            </div>

            {/* Skills Progress items */}
            <div className="space-y-4">
              {skills
                .filter((s) => s.category === category)
                .map((skill) => (
                  <div key={skill.id} className="space-y-1.5">
                    
                    <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                      <span className="tracking-wide uppercase">{skill.name}</span>
                      <span className="text-zenitsu-yellow">{skill.level}%</span>
                    </div>

                    {/* Progress Slider */}
                    <div className="w-full h-3 bg-zenitsu-darkest border border-zenitsu-lightGray rounded-sm overflow-hidden p-[1px]">
                      <div
                        className="h-full bg-gradient-to-r from-zenitsu-orange to-zenitsu-yellow rounded-xs shadow-neonYellow transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>

                  </div>
                ))}
            </div>

            {/* Sketch Footer Accent */}
            <div className="text-[8px] text-gray-600 tracking-widest text-right uppercase">
              STATUS: STABLE // OPERATIONAL
            </div>

          </section>
        ))}
      </div>

      {/* Cyber overlay notification block */}
      <div className="bg-zenitsu-darkest border border-zenitsu-gray p-4 flex items-start gap-3 rounded-sm text-xs text-gray-400">
        <Zap className="h-5 w-5 text-zenitsu-yellow flex-shrink-0 animate-bounce mt-0.5" />
        <div>
          <span className="font-bold text-zenitsu-light">[ CRITICAL OPERATIONS NOTE ]</span>
          <p className="text-[10px] mt-0.5 leading-relaxed text-gray-500">
            Skills are backed by automated deployments, laboratory scripts, and system testing dashboards. Continuous training cycles are pushed automatically via weekly learning crons.
          </p>
        </div>
      </div>

    </div>
  );
}
