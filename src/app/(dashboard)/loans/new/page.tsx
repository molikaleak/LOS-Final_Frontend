"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  Upload,
  CheckSquare,
  X,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useState, useMemo, useEffect } from "react";

const ALL_STEPS = [
  { id: "personal-info", label: "Personal Info", icon: User },
  { id: "loan-details", label: "Loan Details", icon: FileText },
  { id: "assets-collateral", label: "Assets & Collateral", icon: Briefcase },
  { id: "document-upload", label: "Document Upload", icon: Upload },
  { id: "review-submit", label: "Review & Submit", icon: CheckSquare },
];

export default function NewLoanPage() {
  const { steps: stepConfigs } = useOnboardingStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);

  // Dynamic steps based on config and condition
  const steps = useMemo(() => {
    return ALL_STEPS.filter(step => {
      const config = stepConfigs.find(c => c.id === step.id);
      if (!config || !config.enabled) return false;
      
      // Special condition for Assets & Collateral: only show if loan > minAmount
      if (step.id === "assets-collateral") {
        return loanAmount > (config.minAmount ?? 5000);
      }
      
      return true;
    });
  }, [stepConfigs, loanAmount]);

  const currentStep = steps[currentStepIndex];

  // If steps change and current index is out of bounds, reset or adjust
  useEffect(() => {
    if (currentStepIndex >= steps.length) {
      setCurrentStepIndex(Math.max(0, steps.length - 1));
    }
  }, [steps, currentStepIndex]);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/loans">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader title="New Loan Application" />
      </div>
        <div className="mx-auto max-w-4xl">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === currentStepIndex;
                const isCompleted = i < currentStepIndex;
                return (
                  <div key={step.id} className="flex items-center">
                    <button
                      onClick={() => setCurrentStepIndex(i)}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : isCompleted
                              ? "bg-success text-success-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-sm font-medium hidden lg:inline ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.label}
                      </span>
                    </button>
                    {i < steps.length - 1 && (
                      <div
                        className={`mx-3 h-[2px] w-12 lg:w-20 ${
                          isCompleted ? "bg-success" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step Content */}
          {currentStep?.id === "personal-info" && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ssn">SSN / Tax ID</Label>
                    <Input id="ssn" placeholder="XXX-XX-XXXX" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Address</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Springfield" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IL">Illinois</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Employment Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employer">Employer</Label>
                      <Input id="employer" placeholder="Company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" placeholder="Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="income">Annual Income</Label>
                      <Input id="income" type="number" placeholder="95000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsEmployed">Years Employed</Label>
                      <Input id="yearsEmployed" type="number" placeholder="3" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep?.id === "loan-details" && (
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Loan Type</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select loan type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Loan</SelectItem>
                        <SelectItem value="auto">Auto Loan</SelectItem>
                        <SelectItem value="mortgage">Home Mortgage</SelectItem>
                        <SelectItem value="business">Business Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Loan Product</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Rate</SelectItem>
                        <SelectItem value="premium">Premium Fixed</SelectItem>
                        <SelectItem value="variable">Variable Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="amount">Loan Amount</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      placeholder="50000" 
                      value={loanAmount || ""}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Loan Term</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select term" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 Months</SelectItem>
                        <SelectItem value="24">24 Months</SelectItem>
                        <SelectItem value="36">36 Months</SelectItem>
                        <SelectItem value="48">48 Months</SelectItem>
                        <SelectItem value="60">60 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Textarea id="purpose" placeholder="Describe the purpose of the loan..." rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>Repayment Frequency</Label>
                    <Select>
                      <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep?.id === "assets-collateral" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Assets & Collateral</CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Asset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Collateral Asset #1</h3>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><X className="h-4 w-4" /></Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Asset Type</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vehicle">Vehicle</SelectItem>
                          <SelectItem value="property">Real Estate</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="securities">Securities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assetValue">Estimated Value</Label>
                      <Input id="assetValue" type="number" placeholder="65000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assetDesc">Description</Label>
                      <Input id="assetDesc" placeholder="2025 Toyota Camry XSE" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assetSerial">Serial / VIN Number</Label>
                      <Input id="assetSerial" placeholder="1HGBH41JXMN109186" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold">Other Assets</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="savings">Savings Accounts</Label>
                      <Input id="savings" type="number" placeholder="25000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investments">Investment Accounts</Label>
                      <Input id="investments" type="number" placeholder="50000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="realEstate">Real Estate Value</Label>
                      <Input id="realEstate" type="number" placeholder="350000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherAssets">Other Assets</Label>
                      <Input id="otherAssets" type="number" placeholder="10000" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep?.id === "document-upload" && (
            <Card>
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Government-Issued ID", desc: "Passport, Driver's License, or National ID", required: true },
                  { label: "Proof of Income", desc: "Pay stubs, tax returns, or employment letter", required: true },
                  { label: "Bank Statements", desc: "Last 6 months of bank statements", required: true },
                  { label: "Proof of Address", desc: "Utility bill or official correspondence", required: true },
                  { label: "Collateral Documentation", desc: "Vehicle title, property deed, or appraisal", required: false },
                  { label: "Additional Documents", desc: "Any other supporting documents", required: false },
                ].map((doc) => (
                  <div
                    key={doc.label}
                    className="rounded-lg border-2 border-dashed p-4 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{doc.label}</p>
                          {doc.required && (
                            <Badge variant="secondary" className="text-[10px]">Required</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{doc.desc}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {currentStep?.id === "review-submit" && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Submit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    section: "Personal Information",
                    fields: [
                      { label: "Full Name", value: "John Doe" },
                      { label: "Email", value: "john.doe@email.com" },
                      { label: "Phone", value: "+1 (555) 123-4567" },
                      { label: "Address", value: "123 Main St, Springfield, IL" },
                    ],
                  },
                  {
                    section: "Loan Details",
                    fields: [
                      { label: "Loan Type", value: "Car Loan" },
                      { label: "Amount", value: "$50,000" },
                      { label: "Term", value: "24 Months" },
                      { label: "Purpose", value: "Vehicle Purchase" },
                    ],
                  },
                  {
                    section: "Assets & Collateral",
                    fields: [
                      { label: "Collateral Type", value: "Vehicle" },
                      { label: "Estimated Value", value: "$65,000" },
                      { label: "Total Assets", value: "$435,000" },
                    ],
                  },
                ].map((section) => (
                  <div key={section.section}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold">{section.section}</h3>
                      <Button variant="ghost" size="sm" className="text-primary text-xs h-7">Edit</Button>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-4 grid grid-cols-2 gap-3">
                      {section.fields.map((field) => (
                        <div key={field.label}>
                          <p className="text-xs text-muted-foreground">{field.label}</p>
                          <p className="text-sm font-medium">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex items-start gap-2">
                  <Checkbox id="terms" />
                  <div>
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I confirm that all information provided is accurate and complete. I authorize
                      the verification of all submitted information.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStepIndex(Math.max(0, currentStepIndex - 1))}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            {currentStepIndex < steps.length - 1 ? (
              <Button onClick={() => setCurrentStepIndex(Math.min(steps.length - 1, currentStepIndex + 1))}>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button className="bg-success hover:bg-success/90">
                <CheckSquare className="mr-2 h-4 w-4" />
                Submit Application
              </Button>
            )}
          </div>
        </div>
    </div>
  );
}
