import { z } from "zod";

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      "Invalid phone number format"
    ),
  dob: z.string().min(1, "Date of birth is required"),
  ssn: z
    .string()
    .min(1, "SSN is required")
    .regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be in format XXX-XX-XXXX"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  employer: z.string().min(1, "Employer is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  annualIncome: z
    .number({ error: "Annual income must be a number" })
    .positive("Annual income must be positive"),
  yearsEmployed: z
    .number({ error: "Years employed must be a number" })
    .min(0, "Years employed cannot be negative")
    .max(60, "Years employed seems too high"),
});

// Step 2: Loan Details
export const loanDetailsSchema = z.object({
  loanType: z.string().min(1, "Loan type is required"),
  loanProduct: z.string().min(1, "Loan product is required"),
  loanAmount: z
    .number({ error: "Loan amount must be a number" })
    .positive("Loan amount must be positive")
    .max(10_000_000, "Loan amount exceeds maximum"),
  loanTerm: z.string().min(1, "Loan term is required"),
  purpose: z.string().min(1, "Loan purpose is required").max(500),
  repaymentFrequency: z.string().min(1, "Repayment frequency is required"),
});

// Step 3: Assets & Collateral
export const assetsSchema = z.object({
  assetType: z.string().min(1, "Asset type is required"),
  assetValue: z
    .number({ error: "Asset value must be a number" })
    .positive("Asset value must be positive"),
  assetDescription: z.string().min(1, "Asset description is required"),
  assetSerial: z.string().optional(),
  savings: z
    .number({ error: "Must be a number" })
    .min(0, "Cannot be negative")
    .optional(),
  investments: z
    .number({ error: "Must be a number" })
    .min(0, "Cannot be negative")
    .optional(),
  realEstate: z
    .number({ error: "Must be a number" })
    .min(0, "Cannot be negative")
    .optional(),
  otherAssets: z
    .number({ error: "Must be a number" })
    .min(0, "Cannot be negative")
    .optional(),
});

// Step 4: Documents
export const documentsSchema = z.object({
  documents: z
    .array(z.string())
    .min(1, "At least one document must be uploaded"),
});

// Step 5: Review
export const reviewSchema = z.object({
  termsAccepted: z.literal(true, {
    error: "You must accept the terms and conditions",
  }),
});

// Complete loan application schema
export const loanApplicationSchema = personalInfoSchema
  .merge(loanDetailsSchema)
  .merge(assetsSchema)
  .merge(documentsSchema)
  .merge(reviewSchema);

export type LoanApplicationInput = z.infer<typeof loanApplicationSchema>;
