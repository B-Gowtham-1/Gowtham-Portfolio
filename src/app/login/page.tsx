"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Zap, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, loginWithGoogle, loginAsMock } = useAuth();
  
  const [emailInput, setEmailInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read destination parameter
  const redirectTo = searchParams.get("redirectTo") || "/admin/dashboard";

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        router.push(redirectTo);
      } else {
        router.push("/");
      }
    }
  }, [user, loading, router, redirectTo]);

  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess(false);

    if (!emailInput.trim()) {
      setAuthError("Email identifier is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await loginAsMock(emailInput.trim());
      if (success) {
        setAuthSuccess(true);
        const role = emailInput.trim().toLowerCase() === "gowthamsasuke2005@gmail.com" ? "admin" : "public_visitor";
        setTimeout(() => {
          if (role === "admin") {
            router.push(redirectTo);
          } else {
            router.push("/");
          }
        }, 1200);
      } else {
        setAuthError("Authentication sequence aborted.");
      }
    } catch (err) {
      setAuthError("Fatal validation fault.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setAuthError("Google OAuth connection aborted.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center font-mono py-12">
        <Zap className="h-12 w-12 text-zenitsu-yellow animate-thunder-blink mb-4" />
        <p className="text-xs text-gray-500 tracking-widest">[ COGNITIVE SCAN IN PROGRESS... ]</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-zenitsu-dark border-2 border-zenitsu-gray sketch-border-gold p-6 sm:p-8">
      
      {/* Header Panel */}
      <div className="text-center mb-8 border-b border-zenitsu-gray pb-4">
        <Zap className="h-10 w-10 text-zenitsu-yellow mx-auto mb-2 animate-pulse" />
        <h1 className="text-xl font-black text-zenitsu-light tracking-widest">
          COGNITIVE_KEYWAY
        </h1>
        <p className="text-[10px] text-gray-500 mt-1">
          VERIFY THUNDER ARCHITECT IDENTIFICATION
        </p>
      </div>

      {/* Warning alerts if visitor accesses admin */}
      {searchParams.get("redirectTo") && (
        <div className="mb-6 p-3 bg-red-950/30 border border-red-500/50 rounded-sm flex items-start gap-2.5 text-xs text-red-400">
          <ShieldAlert className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-red-300">[ 403 UNAUTHORIZED ]</span>
            <p className="text-[10px] mt-0.5">Private DevOps dashboard restricted. Input administrator credentials to initialize authorization.</p>
          </div>
        </div>
      )}

      {/* Notification Blocks */}
      {authError && (
        <div className="mb-4 p-3 bg-zenitsu-orange/10 border border-zenitsu-orange/40 text-xs text-zenitsu-orange flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>{authError}</span>
        </div>
      )}

      {authSuccess && (
        <div className="mb-4 p-3 bg-green-950/20 border border-green-500/40 text-xs text-green-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Session verified. Decrypting directories...</span>
        </div>
      )}

      {/* Interactive Authentication Form */}
      <div className="space-y-6">
        
        {/* Sandbox Development Module */}
        <form onSubmit={handleMockLogin} className="space-y-4">
          <div className="bg-zenitsu-darkest p-3 border border-zenitsu-gray rounded-sm">
            <span className="text-[9px] text-zenitsu-yellow font-bold tracking-widest block mb-2">
              ⚡ LOCAL DEV SANDBOX AUTH
            </span>
            <p className="text-[9px] text-gray-500 mb-3 leading-relaxed">
              Provide the administrator email to test dashboard controls:
              <br />
              <code className="text-zenitsu-light border-b border-dashed border-gray-600">
                gowthamsasuke2005@gmail.com
              </code>
            </p>
            
            <label htmlFor="email" className="block text-[10px] text-gray-400 font-bold uppercase mb-1">
              Security Identifier (Email)
            </label>
            <input
              id="email"
              type="email"
              placeholder="architect@domain.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-zenitsu-dark text-xs text-zenitsu-light px-3 py-2 border-2 border-zenitsu-gray focus:border-zenitsu-yellow focus:outline-none transition-all placeholder:text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-zenitsu-dark border-2 border-zenitsu-yellow text-zenitsu-yellow text-xs font-bold tracking-widest uppercase hover:bg-zenitsu-yellow hover:text-zenitsu-darkest transition-all duration-200 sketch-border-gold flex items-center justify-center gap-2"
          >
            Initialize Local Bypass
          </button>
        </form>

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zenitsu-gray"></div>
          </div>
          <span className="relative px-3 bg-zenitsu-dark text-[9px] text-gray-500 tracking-widest">
            OR PRODUCTION PROVIDER
          </span>
        </div>

        {/* Real Google Auth Connection */}
        <button
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="w-full py-2.5 bg-zenitsu-gray hover:bg-zenitsu-lightGray border border-transparent text-gray-300 hover:text-white text-xs font-bold tracking-widest uppercase transition-all duration-200 flex items-center justify-center gap-2 rounded-sm"
        >
          <Zap className="h-3.5 w-3.5 text-zenitsu-yellow" />
          Connect Google Authentication
        </button>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center font-mono py-8 max-w-md mx-auto w-full">
      <Suspense fallback={
        <div className="w-full bg-zenitsu-dark border-2 border-zenitsu-gray p-6 text-center animate-pulse text-xs text-gray-500">
          Loading security authorization console...
        </div>
      }>
        <LoginForm />
      </Suspense>
      
      <p className="text-[10px] text-gray-600 mt-4 text-center">
        Connection is encrypted & secure. Unauthorized breaches will trigger the thunder-system defensive crons.
      </p>
    </div>
  );
}
