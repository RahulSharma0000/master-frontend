import React from "react";

export default function ApprovalPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Approval</h1>

      {/* List */}
      <div className="bg-white rounded-2xl shadow p-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium">Approval List</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">Add</button>
        </div>
        <div className="space-y-2">
          <div className="p-3 border rounded-xl flex justify-between">
            <span>Loan Approval</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-medium mb-4">Approval Detail</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="border rounded-xl p-2">
            <option>Level</option>
            <option>1</option><option>2</option><option>3</option><option>Final</option>
          </select>
          <select className="border rounded-xl p-2">
            <option>Type</option>
            <option>Individual</option><option>Team</option>
          </select>
          <input className="border rounded-xl p-2" placeholder="Product Type" />
          <input className="border rounded-xl p-2" placeholder="Product Name" />
          <input className="border rounded-xl p-2" placeholder="Approver Name" />
          <input className="border rounded-xl p-2" type="number" placeholder="Rate" />
          <input className="border rounded-xl p-2" type="number" placeholder="Tenure" />
          <select className="border rounded-xl p-2">
            <option>Status</option>
            <option>Active</option><option>Inactive</option>
          </select>
        </div>
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-xl">Save</button>
          <button className="px-4 py-2 border rounded-xl">Cancel</button>
        </div>
      </div>
    </div>
  );
}
