"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import mockDb from "@/lib/supabase";
import { 
  ShieldAlert, ShieldCheck, Zap, Plus, BookOpen, 
  FolderGit2, ListTodo, Activity, LogOut, Trash2 
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  
  // Dashboard Section states
  const [activeTab, setActiveTab] = useState<"missions" | "study" | "logs">("missions");

  // Database states
  const [projects, setProjects] = useState<any[]>([]);
  const [studyLogs, setStudyLogs] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  
  // Database Operations states
  const [dbLoading, setDbLoading] = useState(true);
  const [opError, setOpError] = useState("");
  const [opSuccess, setOpSuccess] = useState("");

  // CRUD Form states (New Project)
  const [newProject, setNewProject] = useState({
    title: "",
    tech: "",
    features: ""
  });

  // CRUD Form states (New Study Log)
  const [newStudyLog, setNewStudyLog] = useState({
    topic: "",
    hours: 2,
    date: new Date().toISOString().split("T")[0]
  });

  // Enforce auth check in frontend just in case
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch all admin datatypes
  const fetchAdminData = async () => {
    setDbLoading(true);
    setOpError("");
    try {
      const projectsRes = await mockDb.projects.select();
      const studyRes = await mockDb.studyTracker.select();
      const logsRes = await mockDb.activityLogs.select();

      if (projectsRes.data) setProjects(projectsRes.data);
      if (studyRes.data) setStudyLogs(studyRes.data);
      if (logsRes.data) setActivityLogs(logsRes.data);
    } catch (e) {
      setOpError("Failed to fetch database layers.");
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  // Insert Project handler
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpError("");
    setOpSuccess("");

    if (!newProject.title.trim() || !newProject.tech.trim()) {
      setOpError("Mission Title and Technologies list are required.");
      return;
    }

    try {
      const techArray = newProject.tech.split(",").map((s) => s.trim()).filter(Boolean);
      const featureArray = newProject.features.split("\n").map((s) => s.trim()).filter(Boolean);

      const { data, error } = await mockDb.projects.insert({
        title: newProject.title.trim(),
        tech: techArray,
        features: featureArray.length > 0 ? featureArray : ["Custom deployment integration"]
      });

      if (error) {
        setOpError("Failed to publish mission project.");
      } else if (data) {
        setOpSuccess("Mission archived successfully!");
        setNewProject({ title: "", tech: "", features: "" });
        // Log activity
        await mockDb.activityLogs.insert(`Added project: ${newProject.title.trim()}`, "db");
        fetchAdminData();
      }
    } catch (err) {
      setOpError("Fatal operations database crash.");
    }
  };

  // Delete Project handler
  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Confirm destruction of mission archive: ${title}?`)) return;
    setOpError("");
    setOpSuccess("");

    try {
      const { error } = await mockDb.projects.delete(id);
      if (error) {
        setOpError("Failed to purge mission.");
      } else {
        setOpSuccess("Mission purged successfully.");
        await mockDb.activityLogs.insert(`Deleted project: ${title}`, "db");
        fetchAdminData();
      }
    } catch (e) {
      setOpError("Purge operations crashed.");
    }
  };

  // Insert Study Log handler
  const handleAddStudyLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setOpError("");
    setOpSuccess("");

    if (!newStudyLog.topic.trim()) {
      setOpError("Study topic parameter is required.");
      return;
    }

    try {
      const { data, error } = await mockDb.studyTracker.insert({
        topic: newStudyLog.topic.trim(),
        hours: Number(newStudyLog.hours),
        date: newStudyLog.date
      });

      if (error) {
        setOpError("Failed to register study log.");
      } else if (data) {
        setOpSuccess("Study progress logged successfully!");
        setNewStudyLog({ topic: "", hours: 2, date: new Date().toISOString().split("T")[0] });
        await mockDb.activityLogs.insert(`Logged study hours for: ${newStudyLog.topic.trim()}`, "study");
        fetchAdminData();
      }
    } catch (err) {
      setOpError("Fatal logger database crash.");
    }
  };

  const handleDisconnect = async () => {
    await logout();
    router.push("/login");
  };

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <ShieldAlert className="h-12 w-12 text-zenitsu-orange animate-thunder-blink mb-4" />
        <p className="text-xs text-gray-500 tracking-widest">[ AUTHENTICATION VERIFICATION IN PROGRESS... ]</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col font-mono space-y-6 py-4">
      
      {/* HUD Controller Header */}
      <div className="border-b-2 border-zenitsu-gray pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-zenitsu-yellow" />
            ZENITSU_MISSION_CONTROL
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Private administrative operating center // connected email: {user.email}
          </p>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-3 py-1.5 border border-zenitsu-orange text-zenitsu-orange hover:bg-zenitsu-orange hover:text-white text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <LogOut className="h-4 w-4" />
          Disconnect
        </button>
      </div>

      {/* Operation Status alerts */}
      {opError && (
        <div className="p-3 bg-zenitsu-orange/10 border border-zenitsu-orange/40 text-xs text-zenitsu-orange flex items-center gap-2">
          <span>[ OPERATIONAL ERROR ]: {opError}</span>
        </div>
      )}

      {opSuccess && (
        <div className="p-3 bg-green-950/20 border border-green-500/40 text-xs text-green-400 flex items-center gap-2">
          <span>[ SYSTEM TRANSACTION OK ]: {opSuccess}</span>
        </div>
      )}

      {/* Dashboard Sub-tabs */}
      <div className="flex gap-2 border-b border-zenitsu-gray pb-px select-none">
        <button
          onClick={() => setActiveTab("missions")}
          className={`px-4 py-2 border-2 border-b-0 text-xs font-bold tracking-wider rounded-t-sm flex items-center gap-1.5 transition-all ${
            activeTab === "missions"
              ? "border-zenitsu-yellow bg-zenitsu-dark text-zenitsu-yellow"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <FolderGit2 className="h-4 w-4" />
          MISSION_CENTER ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab("study")}
          className={`px-4 py-2 border-2 border-b-0 text-xs font-bold tracking-wider rounded-t-sm flex items-center gap-1.5 transition-all ${
            activeTab === "study"
              ? "border-zenitsu-yellow bg-zenitsu-dark text-zenitsu-yellow"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          STUDY_TRACKER ({studyLogs.length})
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 border-2 border-b-0 text-xs font-bold tracking-wider rounded-t-sm flex items-center gap-1.5 transition-all ${
            activeTab === "logs"
              ? "border-zenitsu-yellow bg-zenitsu-dark text-zenitsu-yellow"
              : "border-transparent text-gray-500 hover:text-gray-300"
          }`}
        >
          <Activity className="h-4 w-4" />
          SYSTEM_AUDITS ({activityLogs.length})
        </button>
      </div>

      {dbLoading ? (
        <div className="py-12 text-center text-xs text-gray-500 animate-pulse uppercase">
          Fetching secure data channels...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Active Panel (left) */}
          <div className="lg:col-span-8">
            
            {/* Missions Tab */}
            {activeTab === "missions" && (
              <div className="space-y-6">
                <div className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border space-y-4">
                  <span className="text-[10px] text-zenitsu-yellow font-bold tracking-widest block uppercase">
                    // REGISTERED_PORTFOLIO_MISSIONS
                  </span>

                  <div className="space-y-4">
                    {projects.map((proj) => (
                      <div 
                        key={proj.id} 
                        className="bg-zenitsu-darkest p-4 border border-zenitsu-gray rounded-sm flex justify-between items-start gap-4"
                      >
                        <div className="space-y-2">
                          <h3 className="text-xs font-black text-zenitsu-light uppercase">{proj.title}</h3>
                          <div className="flex flex-wrap gap-1">
                            {proj.tech.map((t: string) => (
                              <span key={t} className="text-[8px] bg-zenitsu-dark px-1.5 py-0.5 border border-zenitsu-gray text-gray-400 rounded-sm">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(proj.id, proj.title)}
                          className="p-1.5 border border-transparent hover:border-zenitsu-orange text-gray-500 hover:text-zenitsu-orange transition-all rounded-sm"
                          title="Purge Mission"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Study Tracker Tab */}
            {activeTab === "study" && (
              <div className="space-y-6">
                <div className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border space-y-4">
                  <span className="text-[10px] text-zenitsu-yellow font-bold tracking-widest block uppercase">
                    // STUDY_TRACK_FEED
                  </span>

                  <div className="space-y-3">
                    {studyLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="bg-zenitsu-darkest p-3 border border-zenitsu-gray rounded-sm flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <span className="text-zenitsu-light font-bold uppercase">{log.topic}</span>
                          <span className="text-[9px] text-gray-500 block">LOGGED_ON: {log.date}</span>
                        </div>
                        <span className="px-2 py-1 bg-zenitsu-glow border border-zenitsu-yellow/30 text-zenitsu-yellow font-black rounded-xs">
                          {log.hours} HOURS
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity Logs Tab */}
            {activeTab === "logs" && (
              <div className="space-y-6">
                <div className="bg-zenitsu-dark border-2 border-zenitsu-gray p-6 sketch-border space-y-4">
                  <span className="text-[10px] text-zenitsu-yellow font-bold tracking-widest block uppercase">
                    // AUDIT_TIMELINE_STABILIZER
                  </span>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {activityLogs.map((log) => (
                      <div 
                        key={log.id} 
                        className="p-3 border-l-2 border-zenitsu-yellow bg-zenitsu-darkest text-xs flex justify-between items-start gap-4 rounded-sm"
                      >
                        <div className="space-y-1">
                          <p className="text-gray-300 font-medium">{log.action}</p>
                          <span className="text-[9px] px-1.5 py-0.5 bg-zenitsu-gray text-gray-400 rounded-xs uppercase">
                            Cat: {log.category}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Hand Side Form panels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Conditional Form Rendering based on tab */}
            {activeTab === "missions" ? (
              <div className="bg-zenitsu-dark border-2 border-zenitsu-gray p-5 sketch-border space-y-4">
                <div className="flex items-center gap-1.5 border-b border-zenitsu-gray pb-2">
                  <Plus className="h-4 w-4 text-zenitsu-yellow" />
                  <span className="text-[10px] text-zenitsu-light font-bold tracking-wider uppercase">
                    PUBLISH_NEW_MISSION
                  </span>
                </div>

                <form onSubmit={handleAddProject} className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Mission Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Terraform Cluster Build"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Technologies (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Git, Jenkins, Docker"
                      value={newProject.tech}
                      onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Operational Features (One per line)
                    </label>
                    <textarea
                      placeholder="Custom configuration&#10;Automated tests"
                      value={newProject.features}
                      rows={3}
                      onChange={(e) => setNewProject({ ...newProject, features: e.target.value })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all placeholder:text-gray-700 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-zenitsu-dark border border-zenitsu-yellow text-zenitsu-yellow hover:bg-zenitsu-yellow hover:text-zenitsu-darkest text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-1 shadow-sketchGold"
                  >
                    Commit Mission
                  </button>

                </form>
              </div>
            ) : activeTab === "study" ? (
              <div className="bg-zenitsu-dark border-2 border-zenitsu-gray p-5 sketch-border space-y-4">
                <div className="flex items-center gap-1.5 border-b border-zenitsu-gray pb-2">
                  <Plus className="h-4 w-4 text-zenitsu-yellow" />
                  <span className="text-[10px] text-zenitsu-light font-bold tracking-wider uppercase">
                    LOG_STUDY_HOUR
                  </span>
                </div>

                <form onSubmit={handleAddStudyLog} className="space-y-4">
                  
                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Technology/Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. AWS VPC Subnets"
                      value={newStudyLog.topic}
                      onChange={(e) => setNewStudyLog({ ...newStudyLog, topic: e.target.value })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all placeholder:text-gray-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Session Hours
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={18}
                      value={newStudyLog.hours}
                      onChange={(e) => setNewStudyLog({ ...newStudyLog, hours: Number(e.target.value) })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newStudyLog.date}
                      onChange={(e) => setNewStudyLog({ ...newStudyLog, date: e.target.value })}
                      className="w-full bg-zenitsu-darkest text-xs text-zenitsu-light px-2.5 py-2 border border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-zenitsu-dark border border-zenitsu-yellow text-zenitsu-yellow hover:bg-zenitsu-yellow hover:text-zenitsu-darkest text-xs font-bold tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-1 shadow-sketchGold"
                  >
                    Commit Study Log
                  </button>

                </form>
              </div>
            ) : (
              <div className="bg-zenitsu-darkest border-2 border-zenitsu-gray p-5 rounded-sm text-xs text-gray-500 space-y-3">
                <span className="text-[10px] text-zenitsu-light font-bold block uppercase tracking-wider">
                  SYSTEM_INTEGRITY_READOUT:
                </span>
                <p className="leading-relaxed">
                  System logs are automatically pushed by authorized administrative cognitive logins. Modifications made here sync instantly with Gowtham B's portfolio database configurations.
                </p>
                <div className="p-2 border border-zenitsu-gray bg-zenitsu-dark rounded-xs text-[10px] font-bold text-zenitsu-yellow">
                  DB_STATUS: 100% OPERATIONAL
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
