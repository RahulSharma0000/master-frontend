import React from "react";

export default function MultiSelect({ label, options = [], selected = [], onChange }) {
  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(o => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <div className="border border-gray-300 rounded px-3 py-2 max-h-40 overflow-y-auto">
        {options.map(opt => (
          <div key={opt.value || opt} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={selected.includes(opt.value || opt)}
              onChange={() => toggleOption(opt.value || opt)}
              className="mr-2"
            />
            <span>{opt.label || opt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
