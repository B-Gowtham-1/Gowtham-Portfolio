"use client";

import React, { useEffect, useState } from "react";
import mockDb, { isMockMode } from "@/lib/supabase";
import { Compass, Zap, Flame, ShieldAlert, Award } from "lucide-react";

interface FutureMission {
  id: string;
  title: string;
  overview: string;
  planned_stack: string[];
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  progress_state: number;
  timeline: string;
}

export default function FutureMissionsPage() {
  const [missions, setMissions] = useState<FutureMission[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true);
      try {
        const { data, error } = await mockDb.futureProjects.select();
        if (error) {
          setErrorMessage("Failed to decrypt upcoming mission parameters.");
        } else if (data) {
          setMissions(data);
        }
      } catch (err) {
        setErrorMessage("Fatal communication fault with database layer.");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  // Helper styling for difficulty tags
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "insane":
        return "border-red-500 bg-red-950/20 text-red-400";
      case "hard":
        return "border-zenitsu-orange bg-zenitsu-orange/10 text-zenitsu-orange";
      case "medium":
      default:
        return "border-zenitsu-yellow bg-zenitsu-glow text-zenitsu-yellow";
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <Compass className="h-8 w-8 text-zenitsu-yellow animate-spin mb-3" />
        <p className="text-xs text-gray-500 tracking-widest">[ DECRYPTING SYSTEM ROADMAP... ]</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col font-mono space-y-8 py-4">
      
      {/* Page Header */}
      <div className="border-b-2 border-zenitsu-gray pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
            <Compass className="h-6 w-6 text-zenitsu-yellow animate-pulse" />
            FUTURE_MISSIONS
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Strategic operations, DevOps roadmap objectives, and cloud infrastructure pipelines
          </p>
        </div>
        <div className="text-[9px] px-2.5 py-1 bg-zenitsu-darkest border border-zenitsu-gray text-gray-500 rounded-sm self-start sm:self-auto uppercase">
          Source: Abhishek Veeramalla Ecosystem
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/20 border border-red-500/40 text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Grid of future operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {missions.map((mission) => (
          <article
            key={mission.id}
            className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              
              {/* Card Meta details */}
              <div className="flex items-center justify-between border-b border-zenitsu-gray pb-2 text-[9px] font-bold">
                <span className="text-gray-500 tracking-widest">TIMELINE // {mission.timeline}</span>
                <span className={`px-2 py-0.5 border rounded-sm font-black tracking-widest uppercase ${getDifficultyStyles(mission.difficulty)}`}>
                  DIFFICULTY: {mission.difficulty}
                </span>
              </div>

              {/* Title and details */}
              <h2 className="text-sm font-black text-zenitsu-light uppercase tracking-wide">
                {mission.title}
              </h2>
              
              <p className="text-xs text-gray-400 leading-relaxed min-h-[48px]">
                {mission.overview}
              </p>

              {/* Planned Tech stack */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[9px] text-gray-500 font-bold block uppercase tracking-wider">
                  PLANNED SYSTEM STACK:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mission.planned_stack.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-black px-2 py-0.5 border border-zenitsu-gray bg-zenitsu-darkest text-zenitsu-light rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progression states */}
              <div className="space-y-1.5 pt-3">
                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>PREPARATION_PHASE_STABILIZATION</span>
                  <span className="text-zenitsu-yellow">{mission.progress_state}%</span>
                </div>
                <div className="w-full h-2.5 bg-zenitsu-darkest border border-zenitsu-lightGray rounded-sm overflow-hidden p-[1px]">
                  <div
                    className="h-full bg-gradient-to-r from-zenitsu-yellow to-zenitsu-orange shadow-neonYellow rounded-xs transition-all"
                    style={{ width: `${mission.progress_state}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Cinematic bottom accent */}
            <div className="pt-4 border-t border-zenitsu-gray flex items-center justify-between text-[10px]">
              <span className="text-gray-500 tracking-wider">SECURE // DEVOPS_VISION</span>
              <span className="text-zenitsu-yellow font-black flex items-center gap-1">
                <Flame className="h-3 w-3 animate-pulse text-zenitsu-yellow" />
                INITIATING_SEQUENCE
              </span>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
}
