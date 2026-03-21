import { z } from "zod";

export const simulationSchema = z.object({
  model: z.string().min(1, "Model selection is required"),
  dataset: z.string().min(1, "Dataset selection is required"),
  sampleSize: z
    .number({ error: "Sample size must be a number" })
    .int("Sample size must be an integer")
    .positive("Sample size must be positive")
    .max(100_000, "Sample size too large"),
  scenario: z.string().min(1, "Scenario is required"),
});

export type SimulationInput = z.infer<typeof simulationSchema>;
