import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CO_APPLICANT_TYPES = ["Primary", "Secondary", "Guarantor"];
const RELATIONSHIPS = ["Spouse", "Parent", "Sibling", "Business Partner"];

export default function AddCoApplicant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    relationship: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Co-Applicant:", form);
    navigate("/controls/co-applicant");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add Co-Applicant</h1>
          <p className="text-gray-500 text-sm">
            Define a new co-applicant rule
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Co-Applicant Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          options={CO_APPLICANT_TYPES}
          required
        />

        <Select
          label="Relationship"
          name="relationship"
          value={form.relationship}
          onChange={handleChange}
          options={RELATIONSHIPS}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />

        <div className="md:col-span-2 flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/controls/co-applicant")}
            className="px-5 py-3 rounded-xl border text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700"
          >
            <FiSave /> Save
          </button>
        </div>
      </form>
    </MainLayout>
  );
}

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);
