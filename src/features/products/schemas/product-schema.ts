import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string().optional(),
  type: z.string().min(1, "Product type is required"),
  minAmount: z
    .number({ error: "Minimum amount must be a number" })
    .positive("Minimum amount must be positive"),
  maxAmount: z
    .number({ error: "Maximum amount must be a number" })
    .positive("Maximum amount must be positive"),
  baseRate: z
    .number({ error: "Base rate must be a number" })
    .min(0, "Rate cannot be negative")
    .max(100, "Rate cannot exceed 100%"),
  minTerm: z
    .number({ error: "Minimum term must be a number" })
    .positive("Must be positive"),
  maxTerm: z
    .number({ error: "Maximum term must be a number" })
    .positive("Must be positive"),
  status: z.enum(["Draft", "Active", "Inactive"]).default("Draft"),
});

export type ProductInput = z.infer<typeof productSchema>;
