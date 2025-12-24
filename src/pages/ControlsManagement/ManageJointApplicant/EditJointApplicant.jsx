import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJointApplicant() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    type: "",
    workflow: "",
    status: "Active",
  });

  useEffect(() => {
    setForm({
      type: "Co-Borrower",
      workflow: "Dual Approval",
      status: "Active",
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Joint Applicant:", form);
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
          <h1 className="text-2xl font-bold">Edit Joint Applicant</h1>
          <p className="text-gray-500 text-sm">
            Update joint applicant configuration
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <select name="type" value={form.type} onChange={handleChange} className="p-3 border rounded-xl">
          <option>Co-Borrower</option>
          <option>Partner</option>
        </select>

        <select name="workflow" value={form.workflow} onChange={handleChange} className="p-3 border rounded-xl">
          <option>Single Approval</option>
          <option>Dual Approval</option>
        </select>

        <select name="status" value={form.status} onChange={handleChange} className="p-3 border rounded-xl">
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="md:col-span-2 flex justify-end">
          <button className="px-5 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2">
            <FiSave /> Update
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
