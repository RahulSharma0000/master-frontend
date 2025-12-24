import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddReference() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    referenceType: "",
    referenceRole: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Add Reference:", form);
    navigate("/controls/references");
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
          <h1 className="text-2xl font-bold">Add Reference</h1>
          <p className="text-gray-500 text-sm">
            Define reference type and role
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Select
          label="Reference Type"
          name="referenceType"
          value={form.referenceType}
          onChange={handleChange}
          options={["Personal", "Professional", "Emergency"]}
          required
        />

        <Input
          label="Reference Role"
          name="referenceRole"
          value={form.referenceRole}
          onChange={handleChange}
          placeholder="Guarantor, Employer, Informer"
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

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-2 w-full p-3 bg-gray-50 rounded-xl border border-gray-300"
    />
  </div>
);

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
