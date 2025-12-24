import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiEye, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoginFeeList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [fees, setFees] = useState([
    {
      id: 1,
      feeName: "Application Login Fee",
      amount: 1500,
      type: "Flat",
      status: "Active",
    },
    {
      id: 2,
      feeName: "MSME Login Fee",
      amount: 1,
      type: "Percentage",
      status: "Inactive",
    },
  ]);

  const filtered = fees.filter(
    (f) =>
      f.feeName.toLowerCase().includes(search.toLowerCase()) ||
      f.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this login fee?")) return;
    setFees(fees.filter((f) => f.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Login Fee Management</h1>
          <p className="text-sm text-gray-500">
            Configure login/application fee structures
          </p>
        </div>
        <button
          onClick={() => navigate("/controls/login-fees/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <FiPlus /> Add Login Fee
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search fee name or type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Fee Name</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{f.feeName}</div>
            <div>{f.type === "Flat" ? `₹${f.amount}` : `${f.amount}%`}</div>
            <div className="text-gray-600">{f.type}</div>

            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                f.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {f.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <ActionBtn color="gray" onClick={() => navigate(`/controls/login-fees/view/${f.id}`)}>
                <FiEye />
              </ActionBtn>
              <ActionBtn color="blue" onClick={() => navigate(`/controls/login-fees/edit/${f.id}`)}>
                <FiEdit3 />
              </ActionBtn>
              <ActionBtn color="red" onClick={() => handleDelete(f.id)}>
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
