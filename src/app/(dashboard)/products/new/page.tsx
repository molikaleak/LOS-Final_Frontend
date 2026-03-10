"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/shared/page-header";
import {
  ArrowLeft, CheckSquare, Save, X, PlusCircle, PenTool, PieChart, Info,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/features/products/actions/create-product";
import { productSchema } from "@/features/products/schemas/product-schema";
import { ZodError } from "zod";

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    minAmount: "",
    maxAmount: "",
    baseRate: "",
    minTerm: "",
    maxTerm: "",
    status: "Draft",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});
    
    // Format numeric values
    const payload = {
      ...formData,
      minAmount: formData.minAmount ? Number(formData.minAmount) : NaN,
      maxAmount: formData.maxAmount ? Number(formData.maxAmount) : NaN,
      baseRate: formData.baseRate ? Number(formData.baseRate) : NaN,
      minTerm: formData.minTerm ? Number(formData.minTerm) : NaN,
      maxTerm: formData.maxTerm ? Number(formData.maxTerm) : NaN,
    };

    try {
      // Client-side validation
      const parsed = productSchema.parse(payload);
      
      // Server action
      const result = await createProduct(parsed);
      
      if (result.success) {
        // Redirect back to products
        router.push("/products");
        router.refresh();
      } else if (result.errors) {
        setErrors(result.errors as any);
      }
    } catch (err) {
      if (err instanceof ZodError) {
        setErrors(err.flatten().fieldErrors as Record<string, string[]>);
      } else {
        console.error("Submission failed:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/products">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <PageHeader title="Create Loan Product" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          
          {/* Main Form Area */}
          <div className="col-span-2 space-y-6">
            
            {/* General Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Info className="h-4 w-4 text-primary" />
                  Product Information
                </CardTitle>
                <CardDescription>Basic details about the loan product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="e.g. Premium Auto Loan" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="text-xs text-destructive">{errors.name[0]}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Product Type <span className="text-destructive">*</span></Label>
                  <Select value={formData.type} onValueChange={(val) => { if (val) handleSelectChange("type", val); }}>
                    <SelectTrigger className={errors.type ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Personal">Personal Loan</SelectItem>
                      <SelectItem value="Auto">Auto Loan</SelectItem>
                      <SelectItem value="Mortgage">Mortgage</SelectItem>
                      <SelectItem value="Business">Business Loan</SelectItem>
                      <SelectItem value="Student">Student Loan</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-xs text-destructive">{errors.type[0]}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    name="description" 
                    placeholder="Describe the loan product..." 
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && <p className="text-xs text-destructive">{errors.description[0]}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Financial Parameters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <PieChart className="h-4 w-4 text-primary" />
                  Financial Parameters
                </CardTitle>
                <CardDescription>Set the financial boundaries for this product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Min Amount ($) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="minAmount" 
                      name="minAmount" 
                      type="number" 
                      placeholder="e.g. 1000" 
                      value={formData.minAmount}
                      onChange={handleChange}
                    />
                    {errors.minAmount && <p className="text-xs text-destructive">{errors.minAmount[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxAmount">Max Amount ($) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="maxAmount" 
                      name="maxAmount" 
                      type="number" 
                      placeholder="e.g. 50000" 
                      value={formData.maxAmount}
                      onChange={handleChange}
                    />
                    {errors.maxAmount && <p className="text-xs text-destructive">{errors.maxAmount[0]}</p>}
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="baseRate">Base Rate (%) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="baseRate" 
                      name="baseRate" 
                      type="number" 
                      step="0.01"
                      placeholder="e.g. 5.5" 
                      value={formData.baseRate}
                      onChange={handleChange}
                    />
                    {errors.baseRate && <p className="text-xs text-destructive">{errors.baseRate[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minTerm">Min Term (Months) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="minTerm" 
                      name="minTerm" 
                      type="number" 
                      placeholder="12" 
                      value={formData.minTerm}
                      onChange={handleChange}
                    />
                    {errors.minTerm && <p className="text-xs text-destructive">{errors.minTerm[0]}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxTerm">Max Term (Months) <span className="text-destructive">*</span></Label>
                    <Input 
                      id="maxTerm" 
                      name="maxTerm" 
                      type="number" 
                      placeholder="60" 
                      value={formData.maxTerm}
                      onChange={handleChange}
                    />
                    {errors.maxTerm && <p className="text-xs text-destructive">{errors.maxTerm[0]}</p>}
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PenTool className="h-4 w-4 text-primary" />
                  Publishing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(val) => { if (val) handleSelectChange("status", val); }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft (Hidden)</SelectItem>
                      <SelectItem value="Active">Active (Published)</SelectItem>
                      <SelectItem value="Inactive">Inactive (Archived)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-2" />
                
                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={handleSubmit} 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Product</>}
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/products")}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-6 text-center">
                <div className="mx-auto rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-3">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Custom Attributes</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Add specific requirements or properties to this product (e.g., minimum credit score).
                </p>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Add Attribute
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
