import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddJointApplicant() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "",
    workflow: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Joint Applicant:", form);
    navigate("/controls/joint-applicant");
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
          <h1 className="text-2xl font-bold">Add Joint Applicant</h1>
          <p className="text-gray-500 text-sm">
            Configure joint applicant behavior
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Joint Applicant Type"
          name="type"
          value={form.type}
          onChange={handleChange}
          options={["Co-Borrower", "Partner"]}
          required
        />

        <Select
          label="Approval Workflow"
          name="workflow"
          value={form.workflow}
          onChange={handleChange}
          options={["Single Approval", "Dual Approval"]}
          required
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={["Active", "Inactive"]}
        />

        <div className="md:col-span-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-3 rounded-xl border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2"
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
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);
