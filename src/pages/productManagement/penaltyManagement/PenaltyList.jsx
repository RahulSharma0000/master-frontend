import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { penaltyService } from "../../../services/penaltyService";

const PenaltyList = () => {
  const navigate = useNavigate();

  const [penalties, setPenalties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await penaltyService.getPenalties();
        setPenalties(data || []);
        */

        // TEMP MOCK DATA
        setPenalties([
          {
            id: 1,
            name: "Late EMI Penalty",
            frequency: "Recurring",
            basis: "Percentage",
            recovery_stage: "Missed EMI",
            recovery_mode: "Auto",
            rate: "2%",
            status: "Active",
          },
          {
            id: 2,
            name: "Default Penalty",
            frequency: "One-time",
            basis: "Fixed",
            recovery_stage: "Post Default",
            recovery_mode: "Manual",
            rate: "₹5000",
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredPenalties = penalties.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Penalties Management</h1>
          <p className="text-sm text-gray-500">
            Manage penalty rules for defaults and late payments
          </p>
        </div>

        <button
          onClick={() => navigate("/penalties/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Penalty
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search penalty name..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading penalties...</p>
      ) : (
        <div className="space-y-3">
          {/* TABLE HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Name</div>
            <div>Frequency</div>
            <div>Basis</div>
            <div>Recovery Stage</div>
            <div>Mode</div>
            <div>Rate</div>
            <div>Status</div>
            <div className="text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredPenalties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
            >
              <div className="font-medium text-gray-900">
                {p.name}
              </div>

              <div className="text-gray-600">
                {p.frequency}
              </div>

              <div className="text-gray-600">
                {p.basis}
              </div>

              <div className="text-gray-600">
                {p.recovery_stage}
              </div>

              <div className="text-gray-600">
                {p.recovery_mode}
              </div>

              <div className="text-gray-600">
                {p.rate}
              </div>

              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {p.status}
                </span>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/penalties/${p.id}`)}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  title="View"
                >
                  <FiEye />
                </button>

                <button
                  onClick={() => navigate(`/penalties/${p.id}/edit`)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                  title="Edit"
                >
                  <FiEdit />
                </button>

                <button
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {filteredPenalties.length === 0 && (
            <p className="text-gray-500 text-sm">
              No penalties found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default PenaltyList;
