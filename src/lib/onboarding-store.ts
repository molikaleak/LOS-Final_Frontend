import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingStepConfig {
  id: string;
  label: string;
  enabled: boolean;
  minAmount?: number;
}

interface OnboardingState {
  steps: OnboardingStepConfig[];
  toggleStep: (id: string) => void;
  setMinAmount: (id: string, amount: number) => void;
  resetSteps: () => void;
}

const DEFAULT_STEPS: OnboardingStepConfig[] = [
  { id: "personal-info", label: "Personal Info", enabled: true },
  { id: "loan-details", label: "Loan Details", enabled: true },
  { id: "assets-collateral", label: "Assets & Collateral", enabled: true, minAmount: 5000 },
  { id: "document-upload", label: "Document Upload", enabled: true },
  { id: "review-submit", label: "Review & Submit", enabled: true },
];

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      steps: DEFAULT_STEPS,
      toggleStep: (id) =>
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === id ? { ...step, enabled: !step.enabled } : step
          ),
        })),
      setMinAmount: (id, amount) =>
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === id ? { ...step, minAmount: amount } : step
          ),
        })),
      resetSteps: () => set({ steps: DEFAULT_STEPS }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);
