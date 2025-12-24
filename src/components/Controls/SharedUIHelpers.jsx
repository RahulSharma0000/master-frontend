const Header = ({ title, subtitle }) => (
  <div className="flex items-center gap-3 mb-8">
    <button onClick={() => window.history.back()} className="p-2 bg-gray-50 rounded-xl">
      ←
    </button>
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex justify-between items-center border rounded-xl p-4">
    <span className="font-medium">{label}</span>
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full ${
        checked ? "bg-blue-600" : "bg-gray-300"
      } relative`}
    >
      <span
        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
          checked ? "right-1" : "left-1"
        }`}
      />
    </button>
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <select {...props} className="mt-2 w-full p-3 border rounded-xl">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);

const SaveBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-blue-600 text-white rounded-xl"
  >
    Save
  </button>
);

export {
  Header,
  Select,
  SaveBtn
}
