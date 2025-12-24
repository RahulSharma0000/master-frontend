import React from "react";

export default function TextField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ""}
        className="border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
}
