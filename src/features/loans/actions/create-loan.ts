"use server";

import { loanApplicationSchema } from "../schemas/loan-schema";

export async function createLoan(formData: unknown) {
  // Server-side Zod validation
  const result = loanApplicationSchema.safeParse(formData);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    success: true,
    data: {
      id: `LN-${Math.floor(Math.random() * 10000)}`,
      ...result.data,
    },
  };
}
