// =====================================================
// ManageApprovalPage.jsx
// =====================================================
export function ManageApprovalPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Approval</h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select className="border rounded-xl p-2">
            <option>User Type</option>
            <option>Individual</option>
            <option>Group</option>
          </select>
          <select className="border rounded-xl p-2">
            <option>Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        {/* Checklist for Group */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Group Checklist</h3>
          <div className="space-y-2">
            <label className="flex gap-2"><input type="checkbox" /> ID Proof</label>
            <label className="flex gap-2"><input type="checkbox" /> Address Proof</label>
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl">Save</button>
      </div>
    </div>
  );
}