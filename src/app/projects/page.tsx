"use client";

import React, { useEffect, useState } from "react";
import mockDb, { isMockMode } from "@/lib/supabase";
import { FolderGit2, Zap, Server, Shield, Layers } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tech: string[];
  features: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true);
      try {
        const { data, error } = await mockDb.projects.select();
        if (error) {
          setErrorMessage("Failed to decrypt mission data.");
        } else if (data) {
          setProjects(data);
        }
      } catch (err) {
        setErrorMessage("Fatal communication fault with database layer.");
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <Layers className="h-8 w-8 text-zenitsu-yellow animate-spin mb-3" />
        <p className="text-xs text-gray-500 tracking-widest">[ COGNITIVE SCAN: MISSION_DECRYPT... ]</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col font-mono space-y-8 py-4">
      
      {/* Page Header */}
      <div className="border-b-2 border-zenitsu-gray pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
            <FolderGit2 className="h-6 w-6 text-zenitsu-yellow animate-pulse" />
            MISSION_ARCHIVE
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Completed technical deployments, configurations, and automated architectures
          </p>
        </div>
        <div className="text-[9px] px-2.5 py-1 bg-zenitsu-darkest border border-zenitsu-gray text-gray-500 rounded-sm self-start sm:self-auto">
          DATABASE: {isMockMode ? "SANDBOX_MOCK_STATE" : "PRODUCTION_SUPABASE_POSTGRESQL"}
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/20 border border-red-500/40 text-xs text-red-400">
          {errorMessage}
        </div>
      )}

      {/* Cinematic Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <article
            key={project.id}
            className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border flex flex-col justify-between space-y-6"
          >
            {/* Mission Metadata */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zenitsu-gray pb-2">
                <span className="text-[9px] text-zenitsu-yellow font-black tracking-widest uppercase">
                  CLASSIFIED // ACTIVE_DEPLOY
                </span>
                <Server className="h-4 w-4 text-zenitsu-yellow animate-pulse" />
              </div>

              <h2 className="text-sm font-black text-zenitsu-light uppercase tracking-wide leading-snug">
                {project.title}
              </h2>

              {/* Technology matrix tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-bold px-2 py-0.5 border border-zenitsu-gray bg-zenitsu-darkest text-gray-400 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Project Feature checks */}
              <div className="space-y-1.5 pt-3">
                <span className="text-[9px] text-gray-500 font-bold block tracking-wider uppercase">
                  SYSTEM_INTEGRATION_METRICS:
                </span>
                <ul className="space-y-1 text-[11px] text-gray-400">
                  {project.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Zap className="h-3 w-3 text-zenitsu-yellow mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick action detail readout */}
            <div className="pt-4 border-t border-zenitsu-gray flex items-center justify-between text-[10px]">
              <span className="text-gray-500 font-bold tracking-widest">
                AUTH_CLASS: VISIT
              </span>
              <span className="text-zenitsu-yellow font-black animate-pulse flex items-center gap-1">
                <Shield className="h-3 w-3" /> SECURED_ARCHIVE
              </span>
            </div>

          </article>
        ))}
      </div>

    </div>
  );
}
