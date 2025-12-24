import React from "react";

export default function UploadControl({ label, onChange, accept }) {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <input
        type="file"
        onChange={e => onChange(e.target.files)}
        accept={accept || "*"}
        className="border border-gray-300 rounded px-3 py-2"
      />
    </div>
  );
}
