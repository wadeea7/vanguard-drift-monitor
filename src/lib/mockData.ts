export type Severity = "Healthy" | "Warning" | "Critical" | "Monitoring";

export const severityColor = (s: Severity) => ({
  Healthy: "#10B981",
  Warning: "#F59E0B",
  Critical: "#EF4444",
  Monitoring: "#3B82F6",
}[s]);

export const models = [
  { id: "credit-risk", modelName: "Credit Risk Model", type: "Classification", accuracy: 78.5, driftScore: 0.82, severity: "Critical" as Severity, lastChecked: "2 min ago" },
  { id: "churn", modelName: "Customer Churn Model", type: "Classification", accuracy: 84.2, driftScore: 0.67, severity: "Warning" as Severity, lastChecked: "5 min ago" },
  { id: "fraud", modelName: "Fraud Detection Model", type: "Classification", accuracy: 92.1, driftScore: 0.54, severity: "Healthy" as Severity, lastChecked: "1 min ago" },
  { id: "loan", modelName: "Loan Approval Model", type: "Classification", accuracy: 86.3, driftScore: 0.58, severity: "Warning" as Severity, lastChecked: "3 min ago" },
  { id: "recommend", modelName: "Product Recommendation", type: "Ranking", accuracy: 90.7, driftScore: 0.31, severity: "Healthy" as Severity, lastChecked: "4 min ago" },
  { id: "price", modelName: "Price Prediction Model", type: "Regression", accuracy: 91.4, driftScore: 0.28, severity: "Healthy" as Severity, lastChecked: "6 min ago" },
];

export const healthTrend = [
  { day: "May 2", healthy: 18, atRisk: 4, critical: 2 },
  { day: "May 3", healthy: 18, atRisk: 4, critical: 2 },
  { day: "May 4", healthy: 17, atRisk: 5, critical: 2 },
  { day: "May 5", healthy: 17, atRisk: 4, critical: 3 },
  { day: "May 6", healthy: 16, atRisk: 5, critical: 3 },
  { day: "May 7", healthy: 16, atRisk: 5, critical: 3 },
  { day: "May 8", healthy: 16, atRisk: 5, critical: 3 },
];

export const driftAlerts = [
  { modelName: "Credit Risk Model", driftScore: 0.82, severity: "Critical" as Severity, detectedAt: "May 8, 10:24 AM" },
  { modelName: "Customer Churn Model", driftScore: 0.67, severity: "Warning" as Severity, detectedAt: "May 8, 08:15 AM" },
  { modelName: "Fraud Detection Model", driftScore: 0.54, severity: "Warning" as Severity, detectedAt: "May 8, 06:47 AM" },
];

export const riskDistribution = [
  { name: "Healthy", value: 12, color: "#10B981" },
  { name: "Medium", value: 7, color: "#F59E0B" },
  { name: "High", value: 5, color: "#EF4444" },
];

export const accuracyTimeline = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, "0")}:00`,
  accuracy: 95 - i * 0.7 + Math.sin(i / 2) * 1.5,
  baseline: 95.2,
}));

export const featureDrift = [
  { feature: "age", baseline: 42.3, current: 38.7, driftScore: 0.89, change: -8.5, severity: "Critical" as Severity },
  { feature: "income", baseline: 65400, current: 58200, driftScore: 0.84, change: -11.0, severity: "Critical" as Severity },
  { feature: "creditScore", baseline: 682, current: 645, driftScore: 0.78, change: -5.4, severity: "Warning" as Severity },
  { feature: "employmentYears", baseline: 8.2, current: 7.9, driftScore: 0.32, change: -3.7, severity: "Monitoring" as Severity },
  { feature: "loanAmount", baseline: 125000, current: 132000, driftScore: 0.45, change: 5.6, severity: "Monitoring" as Severity },
  { feature: "debtRatio", baseline: 0.34, current: 0.41, driftScore: 0.71, change: 20.6, severity: "Warning" as Severity },
];

export const trendsData = Array.from({ length: 30 }, (_, i) => ({
  date: `Apr ${i + 9}`,
  accuracy: 95 - i * 0.55 + Math.sin(i / 3) * 2,
  precision: 94 - i * 0.42 + Math.cos(i / 4) * 1.5,
  recall: 92 - i * 0.5 + Math.sin(i / 2) * 1.8,
  f1: 93 - i * 0.47 + Math.cos(i / 3) * 1.6,
}));

export const distributionBaseline = [
  { bin: "0-20", count: 12 },
  { bin: "20-40", count: 24 },
  { bin: "40-60", count: 38 },
  { bin: "60-80", count: 18 },
  { bin: "80-100", count: 8 },
];
export const distributionCurrent = [
  { bin: "0-20", count: 28 },
  { bin: "20-40", count: 32 },
  { bin: "40-60", count: 22 },
  { bin: "60-80", count: 12 },
  { bin: "80-100", count: 6 },
];

export const alertsList = [
  { id: "ALT-2026-0547", severity: "Critical" as Severity, type: "Data Drift", modelName: "Credit Risk Model", message: "Drift score exceeded 0.7 threshold. 12 features affected.", detectedAt: "May 8, 10:24 AM", status: "Active" },
  { id: "ALT-2026-0546", severity: "Warning" as Severity, type: "Performance", modelName: "Customer Churn", message: "Accuracy dropped below 85% threshold", detectedAt: "May 8, 08:15 AM", status: "Acknowledged" },
  { id: "ALT-2026-0545", severity: "Critical" as Severity, type: "Concept Drift", modelName: "Fraud Detection", message: "Significant shift in prediction patterns detected", detectedAt: "May 8, 06:47 AM", status: "Active" },
  { id: "ALT-2026-0544", severity: "Monitoring" as Severity, type: "Feature Drift", modelName: "Loan Approval", message: "3 features showing moderate drift", detectedAt: "May 7, 11:30 PM", status: "Acknowledged" },
  { id: "ALT-2026-0543", severity: "Warning" as Severity, type: "Performance", modelName: "Price Prediction", message: "Prediction confidence variance increased", detectedAt: "May 7, 09:15 PM", status: "Resolved" },
];
