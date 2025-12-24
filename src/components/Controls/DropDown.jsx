import React from "react";

export default function Dropdown({ label, value, onChange, options = [], placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2"
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}
