"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Package,
  CheckSquare,
  Wallet,
  Receipt,
  Store,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  AlertTriangle,
  FlaskConical,
  ClipboardList,
  Shield,
  Save,
  CheckCircle2,
  Lock
} from "lucide-react";

import { useRoleStore, ROLES } from "@/lib/store";
import { useOnboardingStore } from "@/lib/onboarding-store";

const MODULE_GROUPS = [
  {
    name: "Loan Management",
    modules: [
      { id: "dashboard", label: "Dashboard", description: "System overview and key metrics", icon: LayoutDashboard },
      { id: "loans", label: "Loan Applications", description: "Process and view incoming applications", icon: FileText },
      { id: "products", label: "Loan Products", description: "Configure interest rates and rules", icon: Package },
      { id: "approvals", label: "Approvals", description: "Credit review and decision making", icon: CheckSquare },
      { id: "disbursement", label: "Disbursement", description: "Fund transfer and account crediting", icon: Wallet },
      { id: "repayments", label: "Repayments", description: "Collection and payment schedules", icon: Receipt },
      { id: "merchants", label: "Merchants", description: "Partner store and POS management", icon: Store },
    ]
  },
  {
    name: "Analytics & Risk",
    modules: [
      { id: "credit-scoring", label: "Credit Scoring", description: "Automated underwriting factors", icon: CreditCard },
      { id: "risk-analytics", label: "Risk Analytics", description: "Portfolio exposure and risk reporting", icon: BarChart3 },
      { id: "model-testing", label: "Model Testing", description: "Algorithm configuration and backtesting", icon: FlaskConical },
      { id: "fraud-detection", label: "Fraud Detection", description: "Anomaly and suspicious activity alerts", icon: AlertTriangle },
    ]
  },
  {
    name: "System",
    modules: [
      { id: "users", label: "Users & Roles", description: "Account provisioning and access control", icon: Users },
      { id: "audit-logs", label: "Audit Logs", description: "Activity history and compliance tracking", icon: ClipboardList },
      { id: "settings", label: "Settings", description: "Global platform configuration", icon: Settings },
    ]
  }
];

export default function SettingsPage() {
  const { permissions, currentRole, setPermission, setCurrentRole } = useRoleStore();
  const { steps, toggleStep, setMinAmount } = useOnboardingStore();
  const [selectedRole, setSelectedRole] = useState(ROLES.find(r => r.id === currentRole) || ROLES[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // Toggle permission for the selected role
  const togglePermission = (moduleId: string) => {
    // If it's head-admin, prevent removing system settings
    if (selectedRole.id === "head-admin" && moduleId === "settings") return;
    
    const isCurrentlyGranted = !!(permissions[selectedRole.id] && permissions[selectedRole.id][moduleId]);
    setPermission(selectedRole.id, moduleId, !isCurrentlyGranted);
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMsg(true);
      setTimeout(() => setShowSavedMsg(false), 3000);
    }, 800);
  };

  const currentPermissions = permissions[selectedRole.id] || {};

  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Role Configurations" 
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Role List */}
        <div className="w-full md:w-80 flex-shrink-0">
          <Card className="h-full border-muted/60 shadow-sm">
            <CardHeader className="pb-3 px-4 pt-4 bg-muted/20 border-b border-border/50">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base font-medium">System Roles</CardTitle>
                </div>
                <CardDescription className="text-xs">
                  Select a role to configure page access. <br/>You are currently testing as: <b>{ROLES.find(r => r.id === currentRole)?.name}</b>
                </CardDescription>
              </div>
            </CardHeader>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              <div className="p-2 space-y-1">
                {ROLES.map(role => (
                   <button
                   key={role.id}
                   onClick={() => setSelectedRole(role)}
                   className={cn(
                     "w-full flex flex-col text-left px-3 py-3 rounded-md transition-all duration-200 border",
                     selectedRole.id === role.id 
                       ? "bg-primary/10 border-primary/20 shadow-sm ring-1 ring-primary/20" 
                       : "bg-transparent border-transparent hover:bg-sidebar-accent hover:border-sidebar-border"
                   )}
                 >
                   <div className="flex justify-between items-start w-full mb-1 gap-2">
                     <span className={cn(
                       "text-sm font-semibold leading-tight mt-0.5",
                       selectedRole.id === role.id ? "text-primary" : "text-foreground"
                     )}>
                       {role.name}
                     </span>
                     <Badge variant={selectedRole.id === role.id ? "default" : "secondary"} className="text-[10px] h-5 px-1.5 flex gap-1 shrink-0">
                        <Users className="w-3 h-3" />
                        {role.users}
                     </Badge>
                   </div>
                   <span className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                     {role.description}
                   </span>
                   {currentRole !== role.id ? (
                     <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs h-7 mt-auto bg-background/50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentRole(role.id);
                        }}
                      >
                       Test as this Role
                     </Button>
                   ) : (
                     <Badge variant="outline" className="w-full justify-center text-xs h-7 mt-auto border-primary/30 text-primary bg-primary/5">
                        Active App Role
                     </Badge>
                   )}
                 </button>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        {/* Right Column: Configuration */}
        <div className="flex-1">
          <Card className="h-full border-muted/60 shadow-sm flex flex-col">
            <CardHeader className="pb-4 border-b border-border/50">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {selectedRole.name} Access List
                  </CardTitle>
                  <CardDescription className="mt-1.5 max-w-xl">
                    {selectedRole.description}. Turn on the switches to grant this role access to specific pages. Hidden pages will be removed from their sidebar.
                  </CardDescription>
                </div>
                {/* Save Button for Desktop */}
                <div className="hidden md:flex items-center gap-3">
                  {showSavedMsg && (
                    <span className="text-sm text-success flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
                      <CheckCircle2 className="w-4 h-4" /> Saved
                    </span>
                  )}
                  <Button 
                    onClick={handleSave} 
                    disabled={isSaving}
                    className="shadow-sm gap-2"
                  >
                    {isSaving ? (
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin"/>
                    ) : (
                       <Save className="w-4 h-4" />
                    )}
                    Save Configurations
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <ScrollArea className="flex-1 h-[calc(100vh-22rem)] px-6">
              <div className="py-6 space-y-8">
                {MODULE_GROUPS.map((group, gIdx) => (
                  <div key={group.name} className="space-y-4">
                    <div className="flex items-center">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                        {group.name}
                      </h3>
                      <Separator className="flex-1 ml-4" />
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                      {group.modules.map(module => {
                        const Icon = module.icon;
                        const isChecked = !!currentPermissions[module.id];
                        const isLocked = selectedRole.id === "head-admin" && module.id === "settings";
                        
                        return (
                          <div 
                            key={module.id} 
                            className={cn(
                              "flex items-center justify-between p-4 rounded-lg border transition-all duration-200",
                              isChecked ? "border-primary/20 bg-primary/5" : "border-border/60 bg-card hover:bg-muted/30"
                            )}
                          >
                            <div className="flex items-start gap-4 mr-4">
                              <div className={cn(
                                "flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center transition-colors",
                                isChecked ? "bg-primary/20 text-primary pt-0" : "bg-muted text-muted-foreground"
                              )}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="flex flex-col gap-0.5 pt-0.5">
                                <span className={cn(
                                  "text-sm font-medium",
                                  isChecked ? "text-foreground" : "text-muted-foreground"
                                )}>
                                  {module.label}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {module.description}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0 flex items-center">
                              {isLocked ? (
                                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/50 text-muted-foreground text-xs font-medium cursor-not-allowed">
                                  <Lock className="w-3 h-3" />
                                  Required
                                </div>
                              ) : (
                                <Switch 
                                  checked={isChecked}
                                  onCheckedChange={() => togglePermission(module.id)}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Onboarding Configuration Section */}
              {selectedRole.id === "head-admin" && (
                <div className="py-6 px-6 space-y-4 bg-muted/20 border-t border-border/50">
                  <div className="flex items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Loan Onboarding Flow Configuration
                    </h3>
                    <Separator className="flex-1 ml-4" />
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {steps.map(step => (
                      <div 
                        key={step.id} 
                        className={cn(
                          "flex flex-col gap-4 p-4 rounded-lg border transition-all duration-200",
                          step.enabled ? "border-primary/20 bg-primary/5 shadow-sm" : "border-border/60 bg-card hover:bg-muted/30"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col gap-0.5">
                            <span className={cn(
                              "text-sm font-semibold",
                              step.enabled ? "text-foreground" : "text-muted-foreground"
                            )}>
                              {step.label}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {step.id === 'assets-collateral' ? 'Requires "Assets & Collateral" for high-value loans' : `Visibility of this step`}
                            </span>
                          </div>
                          <Switch 
                            checked={step.enabled}
                            onCheckedChange={() => toggleStep(step.id)}
                          />
                        </div>

                        {step.enabled && step.id === 'assets-collateral' && (
                          <div className="space-y-2 mt-2 pt-4 border-t border-border/40 animate-in fade-in slide-in-from-top-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                               Condition: Loan Amount &gt;
                             </Label>
                             <div className="relative">
                               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                               <Input 
                                 type="number"
                                 value={step.minAmount || 0}
                                 onChange={(e) => setMinAmount(step.id, Number(e.target.value))}
                                 className="h-9 pl-6 bg-background/50 border-primary/20 focus-visible:ring-primary/20"
                               />
                             </div>
                             <p className="text-[10px] text-muted-foreground italic px-1">
                               This step will only be shown if the loan amount exceeds this value.
                             </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>
           
            {/* Save Button for Mobile */}
            <CardFooter className="md:hidden border-t border-border/50 p-4 bg-muted/10">
              <Button onClick={handleSave} disabled={isSaving} className="w-full gap-2">
                {isSaving ? (
                  <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin"/>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Configurations
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
