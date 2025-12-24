import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiPlus, FiEdit3, FiTrash2, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LanguageList = () => {
  const navigate = useNavigate();

  const [languages, setLanguages] = useState([
    { id: 1, name: "English", code: "EN", default: true },
    { id: 2, name: "Hindi", code: "HI", default: false },
  ]);
  const [search, setSearch] = useState("");

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!window.confirm("Delete this language?")) return;
    setLanguages(languages.filter((l) => l.id !== id));
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Manage Languages</h1>
          <p className="text-sm text-gray-500">Configure platform languages</p>
        </div>
        <button
          onClick={() => navigate("/controls/language/add")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          <FiPlus /> Add Language
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          placeholder="Search by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="space-y-3">
        <div className="hidden md:grid grid-cols-4 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
          <div>Name</div>
          <div>Code</div>
          <div>Default</div>
          <div className="text-right">Actions</div>
        </div>

        {filtered.map((lang) => (
          <div
            key={lang.id}
            className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-y-2 items-center text-sm"
          >
            <div className="font-medium text-gray-900">{lang.name}</div>
            <div className="text-gray-600">{lang.code}</div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                lang.default ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}
            >
              {lang.default ? "Default" : "—"}
            </span>
            <div className="flex justify-end gap-2 col-span-2 md:col-span-1">
              <IconButton color="blue" onClick={() => navigate(`/controls/language/edit/${lang.id}`)}>
                <FiEdit3 />
              </IconButton>
              <IconButton color="red" onClick={() => handleDelete(lang.id)}>
                <FiTrash2 />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default LanguageList;

/* ---------- IconButton Helper ---------- */
const IconButton = ({ children, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-full bg-${color}-100 hover:bg-${color}-200`}
  >
    <span className={`text-${color}-600`}>{children}</span>
  </button>
);
