import React from "react";

export default function ToggleSwitch({ label, checked, onChange }) {
  return (
    <div className="flex items-center mb-4">
      <label className="mr-2 font-medium">{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="w-5 h-5"
      />
    </div>
  );
}
