import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiEye, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoginAuthList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const [policies, setPolicies] = useState([
    {
      id: 1,
      authType: "OTP",
      deviceRestriction: true,
      mfaEnabled: false,
      status: "Active",
    },
    {
      id: 2,
      authType: "Password",
      deviceRestriction: false,
      mfaEnabled: true,
      status: "Inactive",
    },
  ]);

  const filtered = policies.filter((p) =>
    p.authType.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this authentication policy?")) return;
    setPolicies(policies.filter((p) => p.id !== id));
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Login Authentication</h1>
          <p className="text-sm text-gray-500">
            Manage login access and authentication rules
          </p>
        </div>
        <button
          onClick={() => navigate("/controls/login-auth/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <FiPlus /> Add Policy
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search by authentication type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-5 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Auth Type</div>
          <div>Device Restriction</div>
          <div>MFA</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-5 gap-y-2 items-center text-sm"
          >
            <div className="font-medium">{p.authType}</div>

            <div className="text-gray-600">
              {p.deviceRestriction ? "Enabled" : "Disabled"}
            </div>

            <div className="text-gray-600">
              {p.mfaEnabled ? "Enabled" : "Disabled"}
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full justify-self-start ${
                p.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {p.status}
            </span>

            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="gray" onClick={() => navigate(`/controls/login-auth/view/${p.id}`)}>
                <FiEye />
              </IconButton>
              <IconButton color="blue" onClick={() => navigate(`/controls/login-auth/edit/${p.id}`)}>
                <FiEdit3 />
              </IconButton>
              <IconButton color="red" onClick={() => handleDelete(p.id)}>
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
