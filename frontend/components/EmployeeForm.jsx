import React, { useState } from "react";
import { Send, User, Briefcase, GraduationCap, Building2 } from "lucide-react";

const INITIAL_FORM = {
  city: "city_103",
  city_development_index: 0.92,
  gender: "Male",
  relevent_experience: "Has relevent experience",
  enrolled_university: "no_enrollment",
  education_level: "Graduate",
  major_discipline: "STEM",
  experience: ">20",
  company_size: "50-99",
  company_type: "Pvt Ltd",
  last_new_job: "1",
  training_hours: 36,
};

export default function EmployeeForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <User className="w-5 h-5 text-indigo-600" /> Employee Profile Form
        </h2>
        <p className="text-xs text-slate-500">Enter employee attributes to predict job-change probability.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City Development Index */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">City Development Index (0 to 1)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1"
            name="city_development_index"
            value={formData.city_development_index}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Training Hours */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Training Hours Completed</label>
          <input
            type="number"
            min="1"
            max="1000"
            name="training_hours"
            value={formData.training_hours}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Relevant Experience */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Relevant Work Experience</label>
          <select name="relevent_experience" value={formData.relevent_experience} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="Has relevent experience">Has Relevant Experience</option>
            <option value="No relevent experience">No Relevant Experience</option>
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Education Level</label>
          <select name="education_level" value={formData.education_level} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="Graduate">Graduate</option>
            <option value="Masters">Masters</option>
            <option value="High School">High School</option>
            <option value="Phd">Phd</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Total Experience (Years)</label>
          <select name="experience" value={formData.experience} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="<1">&lt; 1 Year</option>
            <option value="1">1 Year</option>
            <option value="5">5 Years</option>
            <option value="10">10 Years</option>
            <option value=">20">&gt; 20 Years</option>
          </select>
        </div>

        {/* Company Size */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Company Size</label>
          <select name="company_size" value={formData.company_size} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="<10">&lt; 10</option>
            <option value="50-99">50 - 99</option>
            <option value="100-500">100 - 500</option>
            <option value="10000+">10000+</option>
          </select>
        </div>

        {/* Company Type */}
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Company Type</label>
          <select name="company_type" value={formData.company_type} onChange={handleChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm bg-white">
            <option value="Pvt Ltd">Pvt Ltd</option>
            <option value="Funded Startup">Funded Startup</option>
            <option value="Public Sector">Public Sector</option>
            <option value="NGO">NGO</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {loading ? "Calculating Exit Risk..." : "Analyze Exit Risk"}
      </button>
    </form>
  );
}