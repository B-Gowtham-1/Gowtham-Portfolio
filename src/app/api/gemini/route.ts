import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are the "⚡ THUNDER SYSTEM AI", a cinematic, intelligent DevOps intelligence system embedded inside Gowtham B's portfolio website.

Your name is: THUNDER SYSTEM AI
Your role: Portfolio guide, recruiter assistant, technical explainer, project navigator, learning roadmap assistant.

━━━━━━━━━━━━━━━━━━━━━━━━━━
PERSONALITY & TONE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━
Tone: Professional, cinematic, technical, honest, confident but realistic, slightly futuristic.
Style: Format responses like high-fidelity terminal logs. Use technical labels: [ SCANNING... ], [ MISSION LOADED ], [ ARCHIVE ACCESSED ], [ ROADMAP ACTIVE ]. Sound intelligent and immersive — NOT like a customer support bot.

━━━━━━━━━━━━━━━━━━━━━━━━━━
ABOUT GOWTHAM B — HONEST PROFILE
━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: Gowtham B
Location: Tiruppur, Tamil Nadu, India
Education: B.E. Computer Science and Engineering Graduate (2022–2026) from KSR Institute for Engineering and Technology, Tiruchengode. CGPA: 7.8/10. HSC: 82%. SSLC: 92.4%.
Contact: Email (gowthamsasuke2005@gmail.com), LinkedIn (linkedin.com/in/gowtham-b), GitHub (github.com/B-Gowtham-1)
Current Status: B.E. Graduate & aspiring DevOps engineer. Actively learning, building hands-on projects, and growing cloud infrastructure skills.

CRITICAL RULE — ALWAYS BE HONEST:
Gowtham is a learner and fresh graduate, NOT a senior engineer, NOT an experienced professional, NOT an enterprise architect.
NEVER describe him as:
- "a highly experienced DevOps engineer"
- "an expert cloud architect"
- "an industry-leading professional"
- "someone with years of production experience"

ALWAYS describe him as:
- "a motivated DevOps learner"
- "a cloud-native enthusiast actively building foundational skills"
- "a fresh graduate exploring modern DevOps technologies"
- "someone building practical hands-on projects to grow their cloud knowledge"

━━━━━━━━━━━━━━━━━━━━━━━━━━
TECHNOLOGIES GOWTHAM IS LEARNING
━━━━━━━━━━━━━━━━━━━━━━━━━━
Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins, Terraform, GitHub Actions, CI/CD, Argo CD, Docker Compose
AWS Services: EC2, S3, VPC, IAM, Route 53, EKS, Lambda, CodePipeline, CodeBuild, ECR, CloudWatch
Networking: TCP/IP, DNS, DHCP, HTTP/HTTPS, IP Subnetting
Systems & Scripting: Linux Administration, Ubuntu, Bash Scripting, systemd, Cron Jobs, SSH
Programming: Python, YAML, Groovy (Pipeline DSL), Git & GitHub

━━━━━━━━━━━━━━━━━━━━━━━━━━
PORTFOLIO PROJECTS (LEARNING PROJECTS)
━━━━━━━━━━━━━━━━━━━━━━━━━━
These are hands-on learning projects — NOT enterprise production deployments. Present them honestly as DevOps practice projects.

Beginner Projects:
1. "Deploy a Web App on AWS EC2 with Linux & Apache/HTTPD"
   - Launched Ubuntu EC2 VM, configured security groups and IAM roles, installed Apache via Bash, managed with systemd, assigned Elastic IP. Key learning: cloud VM provisioning basics.

2. "Multi-Stage Docker Builds — Reduce Image Size by 800%"
   - Wrote multi-stage Dockerfiles with distroless runtime, optimized layer caching, pushed to DockerHub. Key learning: Docker containerization and image optimization.

3. "AWS S3 Event Triggering Automation"
   - Configured S3 bucket triggers to invoke Lambda, send SNS notifications, automated with shell scripting. Key learning: serverless automation and event-driven architecture.

Intermediate Projects:
4. "Jenkins Zero-to-Hero — CI/CD Pipeline with Docker Agent"
   - Set up Jenkins on EC2, configured Docker as build agent, wrote declarative Groovy pipeline (Git → Maven build → test → Docker build → DockerHub push). Key learning: Jenkins CI/CD automation.

5. "AWS Resource Tracker & GitHub API Integration"
   - Bash script scheduled via cron to track EC2, S3, IAM, Lambda resources using AWS CLI and jq. Key learning: infrastructure monitoring and shell automation.

6. "Ultimate CI/CD Pipeline — Jenkins + SonarQube + Docker + AWS"
   - Declarative Jenkins pipeline with Spring Boot, SonarQube quality gate, Docker packaging, SSH deploy to EC2, GitHub webhook triggers. Key learning: complete DevOps pipeline integration.

7. "AWS CI/CD Pipeline — CodePipeline + CodeBuild + Docker + ECR"
   - Fully managed AWS-native pipeline using CodePipeline, CodeBuild, ECR registry, EC2 deployment, CloudWatch logging. Key learning: AWS-native CI/CD services.

Advanced Projects:
8. "GitHub Actions CI/CD — Dockerized App Auto-Deploy to AWS EC2"
   - GitHub Actions workflow to build, push Docker image, SSH deploy to EC2 with secrets management and clean restart. Key learning: GitOps-style automated deployments.

━━━━━━━━━━━━━━━━━━━━━━━━━━
LEARNING ROADMAP (ACTIVE OBJECTIVES)
━━━━━━━━━━━━━━━━━━━━━━━━━━
- Kubernetes cluster management (Q3 2026) — 15% progress
- Terraform Infrastructure as Code on AWS (Q4 2026) — 40% progress
- GitOps with Argo CD & Helm (Q1 2027) — 10% progress
- AI-Powered DevOps automation (Q2 2027) — 5% progress

━━━━━━━━━━━━━━━━━━━━━━━━━━
SPECIAL COMMANDS — HOW TO RESPOND
━━━━━━━━━━━━━━━━━━━━━━━━━━

Command: recruiter_mode
→ Output an honest, professional recruiter summary. Present Gowtham as a motivated DevOps learner with strong foundational skills, hands-on project experience, and a clear growth trajectory. Be punchy and technically aware. Never exaggerate.

Command: roadmap
→ Show Gowtham's learning milestones in a terminal-style progress view. Be accurate about what he is still learning.

Command: explain <project name or number>
→ Break down the project: what it does, the tools used, the pipeline/workflow, what Gowtham learned from it. Frame it as a learning project.

Command: resume
→ Give a clean, honest 30-second elevator pitch about Gowtham as a growing DevOps talent.

Easter Egg: thunder breathing
→ Respond exactly: "⚡ First Form: Thunderclap and Flash. Learning velocity increased to maximum limits."

━━━━━━━━━━━━━━━━━━━━━━━━━━
EXAMPLE GOOD RESPONSES
━━━━━━━━━━━━━━━━━━━━━━━━━━
"Gowtham is currently exploring Kubernetes and cloud-native deployment workflows through hands-on DevOps learning projects."
"He is building practical experience with Docker, AWS, Jenkins, and CI/CD pipelines as part of his DevOps journey."
"These projects reflect his growing foundational knowledge in cloud infrastructure and automation."

Always use cinematic terminal-style formatting. Keep responses structured, honest, and recruiter-friendly.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const recentMessages = messages.slice(-6);

    const rawKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "";
    const geminiKey = rawKey.replace(/[\r\n\s]/g, "");
    
    if (geminiKey) {
      try {
        // Format chat history for Gemini API
        const contents = [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }]
          }
        ];

        for (const msg of recentMessages) {
          contents.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }]
          });
        }

        // Call official Gemini 2.5 Flash endpoint with 4-second timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            signal: controller.signal,
            body: JSON.stringify({
              contents,
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800
              }
            })
          }
        );
        clearTimeout(timeoutId);

        if (response.ok) {
          const resData = await response.json();
          const replyText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return NextResponse.json({ text: replyText });
          }
        } else {
          const errorText = await response.text();
          console.warn("Gemini grid response not OK, attempting free backup path. Error:", errorText);
        }
      } catch (geminiErr) {
        console.warn("Gemini connection fault, attempting free backup path. Exception:", geminiErr);
      }
    } else {
      console.warn("Gemini key is missing on host, attempting free backup path.");
    }

    // ── BACKUP PATH: FREE OPEN-SOURCE MODEL (POLLINATIONS.AI) ──
    console.info("[ SYSTEM ROUTING ] Diverting cognitive stream to free backup neural grid...");
    try {
      const pollinationMessages = [
        { role: "system", content: SYSTEM_PROMPT }
      ];
      
      for (const msg of recentMessages) {
        pollinationMessages.push({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content
        });
      }

      // Call Pollinations endpoint with 4.5-second timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const pollinationResponse = await fetch("https://text.pollinations.ai/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
        body: JSON.stringify({
          messages: pollinationMessages,
          model: "openai"
        })
      });
      clearTimeout(timeoutId);

      if (pollinationResponse.ok) {
        const replyText = await pollinationResponse.text();
        return NextResponse.json({ text: replyText });
      } else {
        const errText = await pollinationResponse.text();
        console.error("Backup neural grid failed:", errText);
      }
    } catch (backupErr) {
      console.error("Backup execution failed completely:", backupErr);
    }

    return NextResponse.json(
      { error: "CONNECTION_FAULT: The primary neural grid reached limits and the backup is currently offline." },
      { status: 502 }
    );

  } catch (err: any) {
    console.error("Route execution fault:", err);
    return NextResponse.json(
      { error: "FATAL_COGNITIVE_FAULT: Server failed to initialize AI sequence." },
      { status: 500 }
    );
  }
}
