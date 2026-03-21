import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

const INITIAL_PERMISSIONS: Record<string, Record<string, boolean>> = {
  "head-admin": {
    "dashboard": true, "loans": true, "products": true, "approvals": true, "disbursement": true, "repayments": true, "merchants": true,
    "credit-scoring": true, "risk-analytics": true, "model-testing": true, "fraud-detection": true,
    "users": true, "audit-logs": true, "settings": true
  },
  "senior-lo": { "dashboard": true, "loans": true, "products": true, "approvals": true, "disbursement": true, "repayments": true, "merchants": true },
  "credit-analyst": { "dashboard": true, "loans": true, "credit-scoring": true, "risk-analytics": true, "model-testing": true },
  "risk-manager": { "dashboard": true, "loans": true, "approvals": true, "credit-scoring": true, "risk-analytics": true, "fraud-detection": true },
  "compliance-officer": { "dashboard": true, "risk-analytics": true, "fraud-detection": true, "audit-logs": true, "users": true },
  "junior-lo": { "dashboard": true, "loans": true, "merchants": true },
};

export const ROLES = [
  { id: "head-admin", name: "Head Administrator", users: 1, permissions: "Full Access", description: "Complete system access and configuration" },
  { id: "senior-lo", name: "Senior Loan Officer", users: 4, permissions: "Loan Management, Approvals", description: "Manage loan applications and approve up to $100K" },
  { id: "credit-analyst", name: "Credit Analyst", users: 3, permissions: "Risk Analysis, Reports", description: "Access credit scoring and risk reports" },
  { id: "risk-manager", name: "Risk Manager", users: 2, permissions: "Risk, Approvals, Reports", description: "Risk oversight and high-value approvals" },
  { id: "compliance-officer", name: "Compliance Officer", users: 2, permissions: "Audit, Compliance, Reports", description: "Regulatory compliance and audit access" },
  { id: "junior-lo", name: "Junior Loan Officer", users: 5, permissions: "Loan Applications", description: "Create and process loan applications" },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    type: "info",
    title: "New Loan Application",
    message: "Application #LN-8930 requires initial credit review.",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    link: "/loans",
  },
  {
    id: "notif-2",
    type: "warning",
    title: "High Risk Detected",
    message: "Fraud anomaly detected on application #10931. Please review immediately.",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: false,
    link: "/fraud-detection",
  },
  {
    id: "notif-3",
    type: "success",
    title: "Disbursement Complete",
    message: "Funds successfully disbursed for merchant #8291.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: true,
  }
];

interface RoleState {
  // Global configured permissions for all roles
  permissions: Record<string, Record<string, boolean>>;
  
  // Simulated logged-in user role
  currentRole: string; 
  
  setPermission: (roleId: string, moduleId: string, isGranted: boolean) => void;
  setCurrentRole: (roleId: string) => void;
  hasAccess: (moduleId: string) => boolean;

  // Notifications
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearAllNotifications: () => void;
}

export const useRoleStore = create<RoleState>()(
  persist(
    (set, get) => ({
      permissions: INITIAL_PERMISSIONS,
      currentRole: "head-admin", // Default logged in as admin
      notifications: INITIAL_NOTIFICATIONS,
      
      setPermission: (roleId, moduleId, isGranted) => 
        set((state) => ({
          permissions: {
            ...state.permissions,
            [roleId]: {
              ...(state.permissions[roleId] || {}),
              [moduleId]: isGranted
            }
          }
        })),

      setCurrentRole: (roleId) => set(() => {
        // Expose our current user-role as a temporary cookie so next.js server-side Proxy can access it!
        // This simulates a real authorization flow
        if (typeof document !== "undefined") {
          document.cookie = `user-role=${roleId}; path=/; max-age=3600`;
        }
        return { currentRole: roleId };
      }),
      
      hasAccess: (moduleId) => {
        const state = get();
        // The Head Administrator always has access to the settings
        if (state.currentRole === "head-admin" && moduleId === "settings") {
          return true;
        }
        return !!(state.permissions[state.currentRole] && state.permissions[state.currentRole][moduleId]);
      },

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: uuidv4(),
              timestamp: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearAllNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "role-storage", // name of item in the storage (must be unique)
    }
  )
);
