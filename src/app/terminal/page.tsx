"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Terminal, Zap, ShieldCheck, ShieldAlert, Cpu, LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ConsoleLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "header";
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function TerminalPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [consoleLines, setConsoleLines] = useState<ConsoleLine[]>([
    { text: "=== ⚡ THUNDER SYSTEM COGNITIVE AI OPERATING SYSTEM v2.0.0 ===", type: "header" },
    { text: "[ DEPLOYED ] Systems online. Grid authentication verified.", type: "success" },
    { text: "Type 'help' to review authorized systems or simply ask the AI anything.", type: "output" },
    { text: "", type: "output" }
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [consoleLines]);

  // Focus input on console click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Keyboard navigation for history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < history.length) {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  // Handle command submission
  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isProcessing) return;
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Save to command history
    setHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    // Echo input on screen
    const userLineText = `${user?.email.split("@")[0] || "visitor"}@thunder:~$ ${cmd}`;
    const updatedLines = [...consoleLines, { text: userLineText, type: "input" as const }];
    setConsoleLines(updatedLines);
    setInputVal("");

    const query = cmd.toLowerCase().trim();

    // 1. Intercept standard mock local commands
    if (query === "clear") {
      setConsoleLines([]);
      return;
    }

    if (query === "whoami") {
      setConsoleLines((prev) => [
        ...prev,
        {
          text: `AUTHENTICATED COGNITIVE ARCHITECT SESSION DETECTED
------------------------------------------------------
User Node  : ${user?.email}
Access     : [ THUNDER SYSTEM ACCESS FULLY GRANTED ]
Role Class : ${user?.role.toUpperCase()}`,
          type: "success"
        }
      ]);
      return;
    }

    if (query === "contact") {
      setConsoleLines((prev) => [
        ...prev,
        {
          text: `TELECOMMUNICATION PORTALS:
------------------------------------------------------
Email      : gowthamsasuke2005@gmail.com
LinkedIn   : linkedin.com/in/gowtham-b
GitHub     : github.com/B-Gowtham-1`,
          type: "success"
        }
      ]);
      return;
    }

    if (query === "help") {
      setConsoleLines((prev) => [
        ...prev,
        {
          text: `Simulated Shell Operations Manual:
  about    - Details Gowtham B's biography and aspirations
  projects - Displays active portfolio missions archive
  skills   - Displays categorized technical core competencies
  roadmap  - Displays upcoming cloud-native DevOps milestones
  contact  - Outputs secure email and messaging links
  whoami   - Displays active session authorization permissions
  clear    - Clears the console screen terminal logs

⚡ THUNDER SYSTEM COGNITIVE AI COMMANDS (Ask naturally):
  - Just ask any questions like "What are your AWS projects?" or "Explain the Jenkins pipeline"
  - recruiter_mode   - Run the instant Recruiter Summary briefing
  - roadmap          - Display Gowtham's interactive learning roadmaps
  - explain <name>   - Explain project architecture and GitOps details
  - thunder breathing - Easter Egg First Form activation`,
          type: "output"
        }
      ]);
      return;
    }

    // 2. Trigger Gemini AI Assistant
    setIsProcessing(true);

    // Temporary loader placeholder
    const loaderId = Date.now();
    const loadingLines = [
      ...updatedLines,
      { text: `⚡ THUNDER AI: Decoding query node [${cmd}]...`, type: "header" as const }
    ];
    setConsoleLines(loadingLines);

    try {
      const updatedChatHistory: ChatMessage[] = [
        ...chatHistory,
        { role: "user" as const, content: cmd }
      ];

      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: updatedChatHistory })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setConsoleLines((prev) => [
          ...prev.slice(0, -1), // remove loader
          { text: `[ ⚡ SYSTEM CORRUPTION ] ERROR: ${data.error || "Failed to establish bridge connection to Gemini grid."}`, type: "error" as const }
        ]);
        setIsProcessing(false);
        return;
      }

      const aiReply = data.text;
      
      // Update chat history
      setChatHistory([
        ...updatedChatHistory,
        { role: "assistant" as const, content: aiReply }
      ]);

      // Remove loader and append clean AI Response output
      setConsoleLines((prev) => [
        ...prev.slice(0, -1),
        { text: aiReply, type: "output" as const }
      ]);

    } catch (err) {
      setConsoleLines((prev) => [
        ...prev.slice(0, -1),
        { text: `[ ⚡ SYSTEM CORRUPTION ] ERROR: Local client connection fault.`, type: "error" as const }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Auth Loading State
  if (authLoading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <Zap className="h-10 w-10 text-zenitsu-yellow animate-thunder-blink mb-4" />
        <p className="text-[10px] text-gray-500 tracking-widest uppercase">Decoupling cognitive session...</p>
      </div>
    );
  }

  // 1. Locked Cinematic Authentication Screen
  if (!user) {
    return (
      <div className="flex-grow flex flex-col font-mono py-8 max-w-3xl mx-auto w-full space-y-6">
        
        {/* Page Header */}
        <div className="border-b-2 border-zenitsu-gray pb-4">
          <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
            <Terminal className="h-6 w-6 text-zenitsu-yellow animate-pulse" />
            ⚡ THUNDER_SYSTEM_AI
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Recruiter-vetted DevOps mission assistant and cognitive intelligence console
          </p>
        </div>

        {/* Lock Screen Frame */}
        <div className="bg-zenitsu-dark border-2 border-zenitsu-orange/50 p-6 sm:p-10 sketch-border text-center space-y-8 relative overflow-hidden">
          
          {/* Cyber Alert Ticker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-zenitsu-orange/30 bg-zenitsu-orange/10 text-[9px] tracking-widest text-zenitsu-orange uppercase rounded-full">
            <ShieldAlert className="h-3.5 w-3.5 animate-pulse" />
            [ SYSTEM DIRECTORY SECURED // VISITOR BREACH INHIBITED ]
          </div>

          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-zenitsu-light font-orbitron tracking-wider">
              [ ⚡ THUNDER SYSTEM NOTICE ]
            </h2>
            <p className="text-xs text-gray-400 font-bold leading-relaxed max-w-xl mx-auto uppercase">
              Authentication required.
              <br />
              Connect your Google Identity credentials to initialize the secure DevOps sandbox and unlock full AI assistant protocols.
            </p>
          </div>

          {/* Holographic simulated display */}
          <div className="max-w-md mx-auto p-4 bg-zenitsu-darkest border border-zenitsu-gray rounded-sm text-left text-[9px] text-gray-500 uppercase space-y-1.5 leading-relaxed font-mono">
            <span className="text-zenitsu-orange font-bold">DIRECTORY_LOG:</span>
            <p>NODE_CLASS : RESTRICTED_DEV_NODE</p>
            <p>INTELLIGENCE_MODULE : Gemini 1.5 Flash [ SLEEP_MODE ]</p>
            <p>ACCESS_PERMISSIONS : [ INSUFFICIENT_visitor_privileges ]</p>
            <p>OPERATIONAL_MODE: SECURE LOCKOUT ACTIVE</p>
          </div>

          {/* Cinematic Login Call To Action */}
          <div className="pt-4">
            <button
              onClick={() => router.push("/login?redirectTo=/terminal")}
              className="px-6 py-3.5 bg-zenitsu-dark border-2 border-zenitsu-yellow hover:bg-zenitsu-yellow hover:text-zenitsu-darkest text-zenitsu-yellow text-xs font-black tracking-widest uppercase transition-all duration-300 sketch-border-gold shadow-neonYellow inline-flex items-center gap-2"
            >
              <Zap className="h-4 w-4 animate-bounce" />
              Initialize Google Identity Verification
            </button>
          </div>

        </div>

      </div>
    );
  }

  // 2. Unlocked Full-Fidelity Cyber Terminal Screen
  return (
    <div className="flex-grow flex flex-col font-mono space-y-6 py-4">
      
      {/* Active Session Header Panel */}
      <div className="border-b-2 border-zenitsu-gray pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-zenitsu-light tracking-widest uppercase flex items-center gap-2">
            <Terminal className="h-6 w-6 text-zenitsu-yellow animate-pulse" />
            ⚡ THUNDER_SYSTEM_AI
          </h1>
          <p className="text-[10px] text-gray-500 mt-1 uppercase">
            Active session: {user.email} // Role: {user.role.toUpperCase()}
          </p>
        </div>

        <button
          onClick={() => logout()}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 border border-red-500/30 hover:border-red-500/90 text-red-400 hover:text-red-300 bg-red-950/10 text-[9px] font-bold uppercase rounded-sm transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          Disconnect Identity
        </button>
      </div>

      {/* Terminal Screen Console */}
      <div 
        onClick={focusInput}
        className="flex-grow min-h-[460px] bg-zenitsu-darkest border-2 border-zenitsu-gray p-4 flex flex-col justify-between overflow-y-auto cursor-text relative rounded-sm shadow-neonYellow/10"
      >
        {/* Terminal Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-20"></div>

        {/* Scrollable output lines */}
        <div className="space-y-4 z-10 flex-grow select-text pb-4">
          {consoleLines.map((line, idx) => {
            let colorClass = "text-gray-300";
            if (line.type === "header") colorClass = "text-zenitsu-yellow font-black";
            else if (line.type === "input") colorClass = "text-zenitsu-light font-bold";
            else if (line.type === "success") colorClass = "text-green-400 font-bold";
            else if (line.type === "error") colorClass = "text-zenitsu-orange font-bold animate-pulse";

            return (
              <pre key={idx} className={`text-xs whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                {line.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Interactive Shell input bar */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 pt-4 border-t border-zenitsu-gray z-10">
          <span className="text-xs font-bold text-zenitsu-yellow animate-pulse">
            {user.email.split("@")[0]}@thunder:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="flex-grow bg-transparent text-xs text-zenitsu-light focus:outline-none border-none p-0 select-text disabled:opacity-40"
            autoFocus
            maxLength={150}
            placeholder={isProcessing ? "THUNDER SYSTEM AI is scanning workflows..." : "Type 'help' or ask Gemini anything..."}
          />
          <span className="text-[10px] text-gray-600 flex items-center gap-1">
            {isProcessing ? (
              <>
                <Loader2 className="h-3.5 w-3.5 text-zenitsu-yellow animate-spin" /> SCANNING_AI...
              </>
            ) : (
              <>
                <ShieldCheck className="h-3.5 w-3.5 text-zenitsu-yellow" /> THUNDER_AI_ONLINE
              </>
            )}
          </span>
        </form>

      </div>

    </div>
  );
}
