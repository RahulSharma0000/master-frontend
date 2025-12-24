import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiEye, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ReferenceList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [references, setReferences] = useState([
    {
      id: 1,
      referenceType: "Personal",
      referenceRole: "Emergency Contact",
      status: "Active",
    },
    {
      id: 2,
      referenceType: "Professional",
      referenceRole: "Employer",
      status: "Inactive",
    },
  ]);

  const filtered = references.filter(
    (r) =>
      r.referenceType.toLowerCase().includes(search.toLowerCase()) ||
      r.referenceRole.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this reference configuration?")) return;
    setReferences(references.filter((r) => r.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Reference Management</h1>
          <p className="text-sm text-gray-500">
            Configure reference types and roles
          </p>
        </div>
        <button
          onClick={() => navigate("/controls/references/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <FiPlus /> Add Reference
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search reference type or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-4 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Reference Type</div>
          <div>Reference Role</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((row) => (
          <div
            key={row.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{row.referenceType}</div>
            <div className="text-gray-600">{row.referenceRole}</div>

            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                row.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {row.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <ActionBtn
                color="gray"
                onClick={() =>
                  navigate(`/controls/references/view/${row.id}`)
                }
              >
                <FiEye />
              </ActionBtn>
              <ActionBtn
                color="blue"
                onClick={() =>
                  navigate(`/controls/references/edit/${row.id}`)
                }
              >
                <FiEdit3 />
              </ActionBtn>
              <ActionBtn color="red" onClick={() => handleDelete(row.id)}>
                <FiTrash2 />
              </ActionBtn>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const ActionBtn = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
