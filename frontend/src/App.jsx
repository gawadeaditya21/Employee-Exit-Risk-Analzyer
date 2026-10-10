import React, { useState } from "react";
import Header from "/components/Header";
import EmployeeForm from "/components/EmployeeForm";
import PredictionResult from "/components/PredictionResult";
import { predictExitRisk } from "/services/api";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handlePredict = async (formData) => {
    setLoading(true);
    setError("");
    try {
      const data = await predictExitRisk(formData);
      setResult(data);
    } catch (err) {
      setError("Failed to connect to FastAPI backend (http://localhost:8000). Check if server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Header />

      <main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <EmployeeForm onSubmit={handlePredict} loading={loading} />
        </div>

        <div className="lg:col-span-5 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {error}
            </div>
          )}
          <PredictionResult result={result} />
        </div>
      </main>
    </div>
  );
}