import type { DashboardData } from "../types";

export async function getDashboardData(): Promise<DashboardData> {
  // Simulate async data fetch — replace with real API call later
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    stats: [
      { title: "Total Applications", value: "1,284", change: "+12.5%", trend: "up", icon: "FileText" },
      { title: "Approved Loans", value: "856", change: "+8.3%", trend: "up", icon: "CheckCircle2" },
      { title: "Rejected Loans", value: "142", change: "-3.1%", trend: "down", icon: "XCircle" },
      { title: "Pending Approvals", value: "286", change: "+5.2%", trend: "up", icon: "Clock" },
      { title: "Portfolio Value", value: "$42.5M", change: "+15.7%", trend: "up", icon: "DollarSign" },
    ],
    trendData: [
      { month: "Jan", value: 65 },
      { month: "Feb", value: 45 },
      { month: "Mar", value: 80 },
      { month: "Apr", value: 55 },
      { month: "May", value: 72 },
      { month: "Jun", value: 90 },
      { month: "Jul", value: 68 },
      { month: "Aug", value: 85 },
      { month: "Sep", value: 60 },
      { month: "Oct", value: 78 },
      { month: "Nov", value: 92 },
      { month: "Dec", value: 70 },
    ],
    statusBreakdown: [
      { label: "Approved", value: 856, total: 1284 },
      { label: "Pending", value: 286, total: 1284 },
      { label: "Rejected", value: 142, total: 1284 },
    ],
    recentApplications: [
      { id: "LN-8932", name: "Sarah Mitchell", initials: "SM", type: "Personal Loan", amount: "$25,000", status: "Under Review", date: "Mar 10, 2026", score: 742 },
      { id: "LN-8931", name: "David Chen", initials: "DC", type: "Auto Loan", amount: "$35,500", status: "Approved", date: "Mar 9, 2026", score: 810 },
      { id: "LN-8930", name: "Emily Rodriguez", initials: "ER", type: "Home Mortgage", amount: "$320,000", status: "Documents Pending", date: "Mar 9, 2026", score: 695 },
      { id: "LN-8929", name: "Michael Scott", initials: "MS", type: "Business Loan", amount: "$75,000", status: "Approved", date: "Mar 8, 2026", score: 780 },
      { id: "LN-8928", name: "Pam Beesly", initials: "PB", type: "Personal Loan", amount: "$12,000", status: "Rejected", date: "Mar 8, 2026", score: 580 },
    ],
    pendingTasks: [
      { title: "Document Verification", description: "Appl. #LN-8902 • Michael Scott", priority: "high", time: "2h ago" },
      { title: "Credit Score Override", description: "Appl. #LN-8915 • Pam Beesly", priority: "medium", time: "4h ago" },
      { title: "Income Proof Approval", description: "Appl. #LN-8921 • Jim Halpert", priority: "high", time: "6h ago" },
      { title: "Security Valuation", description: "Appl. #LN-8922 • Dwight Schrute", priority: "low", time: "1d ago" },
    ],
  };
}
