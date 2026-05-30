import type { Metadata, Viewport } from "next";
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "GOWTHAM B",
  description: "Professional portfolio of Gowtham B, showing DevOps orchestration, Linux server automation, Jenkins pipelines, Docker, Kubernetes EKS deployments, and cloud infrastructure operations.",
  keywords: [
    "Gowtham B",
    "DevOps Engineer Portfolio",
    "Cloud Engineer Portfolio",
    "Kubernetes Administrator",
    "Jenkins Automation Pipelines",
    "Terraform AWS IAC",
    "Demon Slayer Portfolio",
    "Zenitsu Agatsuma Portfolio"
  ],
  authors: [{ name: "Gowtham B" }],
  icons: {
    icon: "/thunder-svgrepo-com.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrains.variable} antialiased selection:bg-zenitsu-yellow selection:text-zenitsu-darkest bg-zenitsu-darkest text-gray-300 min-h-screen flex flex-col font-inter`}>
        <AuthProvider>
          {/* Main Navigation */}
          <Navigation />
          
          {/* Main Content Body */}
          <main className="flex-grow flex flex-col relative w-full z-10">
            {children}
          </main>

          {/* Footer Grid */}
          <footer className="w-full bg-[#030303] border-t border-zenitsu-gray font-mono py-6 text-center text-[10px] text-gray-500 tracking-wider">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                [ COMPILED BY GOWTHAM B ] // HONE IT TO PERFECTION
              </div>
              <div className="text-[9px]">
                © {new Date().getFullYear()} GOWTHAM B. ALL ARCHIVES SECURED UNDER THUNDER ENCRYPTION.
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
