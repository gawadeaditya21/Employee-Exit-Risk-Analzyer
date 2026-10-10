import React from "react";
import { UserCheck, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Employee Exit Risk Analyzer</h1>
            <p className="text-xs text-slate-400">AI-Powered HR Retention & Attrition Intelligence</p>
          </div>
        </div>
      </div>
    </header>
  );
}