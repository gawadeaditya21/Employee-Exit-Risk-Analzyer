import React from "react";
import { AlertTriangle, CheckCircle2, AlertCircle } from "lucide-react";

export default function PredictionResult({ result }) {
  if (!result) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400">
        <p className="text-sm">Submit the employee profile form to calculate exit probability.</p>
      </div>
    );
  }

  const isHighRisk = result.prediction === 1;
  const percentage = result.probability_percentage;

  const getTheme = () => {
    if (percentage >= 65) {
      return {
        bg: "bg-red-50 border-red-200",
        badge: "bg-red-100 text-red-800 border-red-300",
        bar: "bg-red-600",
        icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      };
    }
    if (percentage >= 35) {
      return {
        bg: "bg-amber-50 border-amber-200",
        badge: "bg-amber-100 text-amber-800 border-amber-300",
        bar: "bg-amber-500",
        icon: <AlertCircle className="w-6 h-6 text-amber-600" />,
      };
    }
    return {
      bg: "bg-emerald-50 border-emerald-200",
      badge: "bg-emerald-100 text-emerald-800 border-emerald-300",
      bar: "bg-emerald-600",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
    };
  };

  const theme = getTheme();

  return (
    <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${theme.bg}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme.icon}
          <h3 className="text-lg font-bold text-slate-800">{result.risk_label}</h3>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${theme.badge}`}>
          Score: {percentage}%
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-600">
          <span>Retention Probability ({(100 - percentage).toFixed(1)}%)</span>
          <span>Exit Risk ({percentage}%)</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div className={`h-full ${theme.bar} transition-all duration-500`} style={{ width: `${percentage}%` }} />
        </div>
      </div>

      <p className="text-xs text-slate-600 border-t border-slate-200/60 pt-3">
        {isHighRisk
          ? "⚠️ High likelihood of leaving the company after training. Proactive HR retention measures recommended."
          : "✅ Employee shows strong statistical likelihood of remaining with the organization."}
      </p>
    </div>
  );
}