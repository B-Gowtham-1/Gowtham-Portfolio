import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isMockMode = !supabaseUrl || !supabaseAnonKey;

// Mock database storage keys
const MOCK_DB_KEYS = {
  PROJECTS: "zenitsu_mock_projects",
  SKILLS: "zenitsu_mock_skills",
  FUTURE_PROJECTS: "zenitsu_mock_future_projects",
  STUDY_TRACKER: "zenitsu_mock_study_tracker",
  ACTIVITY_LOGS: "zenitsu_mock_activity_logs",
  USER: "zenitsu_mock_user",
};

// Default static content to seed the mock database
const SEED_DATA = {
  projects: [
    {
      id: "proj-1",
      title: "End-to-End CI/CD Pipeline for Web Application",
      tech: ["Git", "GitHub", "Jenkins", "Docker", "AWS EC2"],
      features: [
        "Automated CI/CD pipeline",
        "Jenkins integration",
        "Dockerized deployment",
        "AWS EC2 deployment",
        "Automated builds on GitHub commits"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: "proj-2",
      title: "Dockerized Web Application Deployment",
      tech: ["Docker", "Linux", "GitHub"],
      features: [
        "Custom Docker images",
        "Dockerfiles",
        "Containerized application deployment",
        "Docker Hub integration"
      ],
      created_at: new Date().toISOString()
    },
    {
      id: "proj-3",
      title: "Cloud Deployment of Web Application",
      tech: ["AWS EC2", "Linux", "Git", "Docker"],
      features: [
        "EC2 deployment",
        "Secure SSH access",
        "Dockerized runtime",
        "Cloud-based hosting"
      ],
      created_at: new Date().toISOString()
    }
  ],
  skills: [
    { id: "sk-1", name: "TCP/IP", category: "Networking", level: 90 },
    { id: "sk-2", name: "OSI Model", category: "Networking", level: 85 },
    { id: "sk-3", name: "IP Addressing & Subnetting", category: "Networking", level: 80 },
    { id: "sk-4", name: "DNS/DHCP", category: "Protocols", level: 85 },
    { id: "sk-5", name: "HTTP/HTTPS", category: "Protocols", level: 90 },
    { id: "sk-6", name: "Linux Administration", category: "Systems", level: 85 },
    { id: "sk-7", name: "Ubuntu & Zorin OS", category: "Systems", level: 90 },
    { id: "sk-8", name: "AWS EC2/S3/VPC", category: "Cloud", level: 80 },
    { id: "sk-9", name: "Docker", category: "DevOps", level: 85 },
    { id: "sk-10", name: "Jenkins", category: "DevOps", level: 75 },
    { id: "sk-11", name: "GitHub Actions", category: "DevOps", level: 80 },
    { id: "sk-12", name: "Python", category: "Programming", level: 80 },
    { id: "sk-13", name: "Git & GitHub", category: "Version Control", level: 90 }
  ],
  future_projects: [
    {
      id: "fut-1",
      title: "Kubernetes Cluster Deployment System",
      overview: "Automating zero-downtime, self-healing deployments for cloud container setups, inspired by Abhishek Veeramalla's DevOps tutorials.",
      planned_stack: ["Kubernetes", "Kubeadm", "Docker", "AWS"],
      difficulty: "Hard",
      progress_state: 15,
      timeline: "Q3 2026",
      visual: "lightning_cluster"
    },
    {
      id: "fut-2",
      title: "Terraform Infrastructure Automation",
      overview: "Building a declarative Cloud Infrastructure on AWS entirely through Terraform modules with state-locking.",
      planned_stack: ["Terraform", "AWS", "GitHub Actions"],
      difficulty: "Medium",
      progress_state: 40,
      timeline: "Q4 2026",
      visual: "infrastructure_map"
    },
    {
      id: "fut-3",
      title: "GitOps Continuous Delivery Pipeline",
      overview: "Integrating GitOps workflows utilizing ArgoCD, Helm, and GitHub repositories for absolute state consistency.",
      planned_stack: ["ArgoCD", "Helm", "Kubernetes", "Git"],
      difficulty: "Hard",
      progress_state: 10,
      timeline: "Q1 2027",
      visual: "gitops_flow"
    },
    {
      id: "fut-4",
      title: "AI-Powered DevOps Assistant",
      overview: "Creating a local lightweight agent checking configuration drift in Kubernetes clusters via custom scripting.",
      planned_stack: ["Python", "Ollama", "Docker", "AWS"],
      difficulty: "Insane",
      progress_state: 5,
      timeline: "Q2 2027",
      visual: "ai_thunder"
    }
  ],
  study_tracker: [
    { id: "st-1", topic: "Docker & Container Security", hours: 4, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: "st-2", topic: "AWS VPC and Subnet Routing", hours: 3, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: "st-3", topic: "Jenkins Declarative Pipelines", hours: 5, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] },
    { id: "st-4", topic: "Linux Shell Scripting & Crons", hours: 2, date: new Date().toISOString().split('T')[0] }
  ],
  activity_logs: [
    { id: "act-1", action: "System Initialized", category: "system", timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "act-2", action: "Mock database seeded with initial missions", category: "db", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "act-3", action: "Public Terminal command parser deployed", category: "security", timestamp: new Date().toISOString() }
  ]
};

// Simple storage initializer helper (runs only on client)
const getLocalStorage = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    return defaultValue;
  }
};

const setLocalStorage = (key: string, value: any) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to write mock DB to localStorage", e);
  }
};

// Safe fallback client for browser environments
export const supabase = !isMockMode 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null as any;

// High fidelity mock client interfaces mimicking Supabase's fluent API
export const mockDb = {
  projects: {
    select: async () => {
      const data = getLocalStorage(MOCK_DB_KEYS.PROJECTS, SEED_DATA.projects);
      return { data, error: null };
    },
    insert: async (project: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.PROJECTS, SEED_DATA.projects);
      const newProj = { id: `proj-${Date.now()}`, ...project, created_at: new Date().toISOString() };
      data.push(newProj);
      setLocalStorage(MOCK_DB_KEYS.PROJECTS, data);
      return { data: [newProj], error: null };
    },
    update: async (id: string, updates: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.PROJECTS, SEED_DATA.projects);
      const index = data.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updates };
        setLocalStorage(MOCK_DB_KEYS.PROJECTS, data);
        return { data: [data[index]], error: null };
      }
      return { data: null, error: new Error("Project not found") };
    },
    delete: async (id: string) => {
      const data = getLocalStorage(MOCK_DB_KEYS.PROJECTS, SEED_DATA.projects);
      const filtered = data.filter((p: any) => p.id !== id);
      setLocalStorage(MOCK_DB_KEYS.PROJECTS, filtered);
      return { data: { id }, error: null };
    }
  },
  skills: {
    select: async () => {
      const data = getLocalStorage(MOCK_DB_KEYS.SKILLS, SEED_DATA.skills);
      return { data, error: null };
    },
    update: async (id: string, updates: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.SKILLS, SEED_DATA.skills);
      const index = data.findIndex((s: any) => s.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updates };
        setLocalStorage(MOCK_DB_KEYS.SKILLS, data);
        return { data: [data[index]], error: null };
      }
      return { data: null, error: new Error("Skill not found") };
    }
  },
  futureProjects: {
    select: async () => {
      const data = getLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, SEED_DATA.future_projects);
      return { data, error: null };
    },
    insert: async (mission: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, SEED_DATA.future_projects);
      const newMission = { id: `fut-${Date.now()}`, ...mission };
      data.push(newMission);
      setLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, data);
      return { data: [newMission], error: null };
    },
    update: async (id: string, updates: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, SEED_DATA.future_projects);
      const index = data.findIndex((m: any) => m.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updates };
        setLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, data);
        return { data: [data[index]], error: null };
      }
      return { data: null, error: new Error("Mission not found") };
    },
    delete: async (id: string) => {
      const data = getLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, SEED_DATA.future_projects);
      const filtered = data.filter((m: any) => m.id !== id);
      setLocalStorage(MOCK_DB_KEYS.FUTURE_PROJECTS, filtered);
      return { data: { id }, error: null };
    }
  },
  studyTracker: {
    select: async () => {
      const data = getLocalStorage(MOCK_DB_KEYS.STUDY_TRACKER, SEED_DATA.study_tracker);
      return { data, error: null };
    },
    insert: async (log: any) => {
      const data = getLocalStorage(MOCK_DB_KEYS.STUDY_TRACKER, SEED_DATA.study_tracker);
      const newLog = { id: `st-${Date.now()}`, ...log };
      data.push(newLog);
      setLocalStorage(MOCK_DB_KEYS.STUDY_TRACKER, data);
      return { data: [newLog], error: null };
    }
  },
  activityLogs: {
    select: async () => {
      const data = getLocalStorage(MOCK_DB_KEYS.ACTIVITY_LOGS, SEED_DATA.activity_logs);
      return { data: data.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), error: null };
    },
    insert: async (action: string, category: string) => {
      const data = getLocalStorage(MOCK_DB_KEYS.ACTIVITY_LOGS, SEED_DATA.activity_logs);
      const newLog = { id: `act-${Date.now()}`, action, category, timestamp: new Date().toISOString() };
      data.push(newLog);
      setLocalStorage(MOCK_DB_KEYS.ACTIVITY_LOGS, data);
      return { data: [newLog], error: null };
    }
  }
};
export default mockDb;
