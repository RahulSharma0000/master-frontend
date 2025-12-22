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

// import { moratoriumService } from "../../../services/moratoriumService";

const MoratoriumList = () => {
  const navigate = useNavigate();

  const [moratoriums, setMoratoriums] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD LIST ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await moratoriumService.getMoratoriums();
        setMoratoriums(data || []);
        */

        // TEMP MOCK DATA
        setMoratoriums([
          {
            id: 1,
            type: "Full",
            period_value: 3,
            period_unit: "Months",
            amount: 50000,
            effect: "Deferred",
            interest_rationalisation: true,
            status: "Active",
          },
          {
            id: 2,
            type: "Interest-only",
            period_value: 60,
            period_unit: "Days",
            amount: 20000,
            effect: "Interest-only",
            interest_rationalisation: false,
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredMoratoriums = moratoriums.filter((m) =>
    m.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Moratorium Management</h1>
          <p className="text-sm text-gray-500">
            Manage payment deferral rules and impacts
          </p>
        </div>

        <button
          onClick={() => navigate("/moratorium/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <FiPlus /> Add Moratorium
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by moratorium type..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading moratoriums...</p>
      ) : (
        <div className="space-y-3">
          {/* TABLE HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Type</div>
            <div>Period</div>
            <div>Amount</div>
            <div>Effect</div>
            <div>Interest Waived</div>
            <div>Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* ROWS */}
          {filteredMoratoriums.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
            >
              <div className="font-medium text-gray-900">
                {m.type}
              </div>

              <div className="text-gray-600">
                {m.period_value} {m.period_unit}
              </div>

              <div className="text-gray-600">
                ₹{m.amount}
              </div>

              <div className="text-gray-600">
                {m.effect}
              </div>

              <div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    m.interest_rationalisation
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {m.interest_rationalisation ? "Yes" : "No"}
                </span>
              </div>

              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {m.status}
                </span>
              </div>

              <div className="flex justify-end gap-2 col-span-2">
                <button
                  onClick={() => navigate(`/moratorium/${m.id}`)}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                  title="View"
                >
                  <FiEye />
                </button>

                <button
                  onClick={() => navigate(`/moratorium/${m.id}/edit`)}
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

          {filteredMoratoriums.length === 0 && (
            <p className="text-gray-500 text-sm">
              No moratorium rules found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default MoratoriumList;
