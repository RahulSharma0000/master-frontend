import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddLanguage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", code: "", default: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Language:", form);
    navigate("/controls/language");
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add Language</h1>
          <p className="text-gray-500 text-sm">Configure a new platform language</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <Input
          label="Language Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Code */}
        <Input
          label="Language Code"
          name="code"
          value={form.code}
          onChange={handleChange}
          required
        />

        {/* Default */}
        <div className="flex items-center mt-4 md:col-span-2 gap-3">
          <input
            type="checkbox"
            name="default"
            checked={form.default}
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label className="text-sm font-medium text-gray-700">Set as Default Language</label>
        </div>

        {/* Actions */}
        <div className="md:col-span-2 flex justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={() => navigate("/controls/language")}
            className="px-5 py-3 rounded-xl border text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl text-white bg-blue-600 flex items-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Save Language
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

/* ---------- Reusable Input ---------- */
const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
