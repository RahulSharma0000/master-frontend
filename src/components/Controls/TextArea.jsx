import React from "react";

export default function TextArea({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || ""}
        rows={rows}
        className="border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
}
