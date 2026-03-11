"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ShieldAlert, ArrowRight, Info } from "lucide-react";
import { useRoleStore } from "@/lib/store";

const MOCK_CREDENTIALS = [
  { role: "Head Admin", email: "admin@fintrack.com", password: "password123", roleId: "head-admin" },
  { role: "Senior LO", email: "senior.lo@fintrack.com", password: "password123", roleId: "senior-lo" },
  { role: "Credit Analyst", email: "analyst@fintrack.com", password: "password123", roleId: "credit-analyst" },
  { role: "Risk Manager", email: "risk@fintrack.com", password: "password123", roleId: "risk-manager" },
  { role: "Compliance", email: "audit@fintrack.com", password: "password123", roleId: "compliance-officer" },
];

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setCurrentRole } = useRoleStore();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate login
    // 1. Set Auth cookie for Proxy
    document.cookie = "los-session=demo-token; path=/; max-age=86400";
    
    // 2. Discover role based on email mapping
    const matchedAccount = MOCK_CREDENTIALS.find((c) => c.email === email);
    const assignedRole = matchedAccount ? matchedAccount.roleId : "head-admin"; // fallback
    setCurrentRole(assignedRole);

    // Small delay for micro-animation
    await new Promise((r) => setTimeout(r, 600));

    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel: Branding / Visuals */}
      <div className="hidden lg:flex w-1/2 bg-sidebar relative overflow-hidden flex-col justify-between p-12 border-r border-border/50">
         {/* Abstract shapes for background visual appeal */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
           <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/40 blur-[120px]" />
           <div className="absolute top-[40%] right-[10%] w-[50%] h-[50%] rounded-full bg-chart-2/30 blur-[100px]" />
         </div>

         <div className="relative z-10">
           <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
              <span className="text-xl font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-2xl font-bold text-foreground">
              FinTrack
            </span>
           </div>
         </div>

         <div className="relative z-10 max-w-lg space-y-6">
           <h1 className="text-4xl font-semibold tracking-tight leading-tight">
             Enterprise Loan Origination & Risk Management
           </h1>
           <p className="text-lg text-muted-foreground">
             A unified platform to process loans, assess credit risk, and manage portfolio lifecycle with precision.
           </p>

           <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Automated Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Compliance Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Role-based Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Real-time Analytics</span>
              </div>
           </div>
         </div>

         <div className="relative z-10 flex items-center gap-4 text-sm font-medium text-muted-foreground">
           <span>Protected by Enterprise TLS 1.3</span>
           <div className="h-1 w-1 rounded-full bg-border" />
           <span>SOC2 Compliant</span>
         </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-background relative relative">
        <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center sm:text-left space-y-2">
            <div className="flex justify-center sm:justify-start lg:hidden mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <span className="text-xl font-bold text-primary-foreground">F</span>
              </div>
            </div>
            <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">
              Enter your credentials to access your workspace.
            </p>
          </div>

          <Card className="border-border/60 shadow-xl shadow-black/5 dark:shadow-black/20">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                    Work Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@fintrack.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 bg-muted/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Password
                    </Label>
                    <a href="#" className="text-xs font-medium text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 bg-muted/20"
                    required
                  />
                </div>

                <div className="bg-warning/10 border border-warning/20 rounded-md p-3 flex items-start gap-3 mt-2">
                  <ShieldAlert className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-xs text-warning-foreground leading-relaxed">
                    This is a protected system. Unauthorized access attempt will be logged and reported.
                  </p>
                </div>

                <Button type="submit" className="w-full h-11 text-base group mt-2" disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                       <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin"/>
                       Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Helper Panel to autofill mock logins */}
          <div className="mt-6 rounded-lg border border-border/50 bg-muted/20 p-4 text-sm animate-in fade-in zoom-in-95 duration-700">
            <h3 className="mb-2 font-medium text-muted-foreground flex items-center gap-2">
              <Info className="h-4 w-4" /> 
              Demo Accounts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {MOCK_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => {
                    setEmail(cred.email);
                    setPassword(cred.password);
                  }}
                  className="flex flex-col items-start rounded-md border border-border/50 bg-background px-3 py-2 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-semibold text-xs text-foreground">{cred.role}</span>
                  <span className="text-[10px] text-muted-foreground truncate w-full">{cred.email}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground text-center">
              Click an account above to autofill credentials and test application routing.
            </p>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Contact IT Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
