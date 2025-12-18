import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { organizationService } from "../../services/organizationService";
import { branchService } from "../../services/branchService";

const CreateBranch = () => {
  const navigate = useNavigate();

  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    organization: "",
    branchCode: "",
    name: "",
    address: "",
    contactPerson: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // 🔴 FIELD ERRORS
  const [submitting, setSubmitting] = useState(false);

  /* ---------------- LOAD ORGANIZATIONS ---------------- */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await organizationService.getOrganizations();
        const list = Array.isArray(res)
          ? res
          : Array.isArray(res?.results)
          ? res.results
          : [];
        setOrganizations(list);
      } catch (e) {
        console.error("Organization load error", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on type
  };

  /* ---------------- VALIDATION ---------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!form.organization)
      newErrors.organization = "Organization is required";

    if (!form.branchCode || form.branchCode.length < 3)
      newErrors.branchCode = "Branch code must be at least 3 characters";
    else if (!/^[A-Z0-9-_]+$/i.test(form.branchCode))
      newErrors.branchCode =
        "Only letters, numbers, - and _ allowed";

    if (!form.name || form.name.length < 3)
      newErrors.name = "Branch name must be at least 3 characters";

    if (!form.address || form.address.length < 5)
      newErrors.address = "Address is required";

    if (!form.contactPerson)
      newErrors.contactPerson = "Contact person is required";

    if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Enter valid 10 digit phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);

    const payload = {
      tenant: form.organization,
      branch_code: form.branchCode.trim(),
      name: form.name.trim(),
      address: form.address.trim(),
      contact_person: form.contactPerson.trim(),
      phone: form.phone.trim(),
    };

    try {
      await branchService.addBranch(payload);
      navigate("/organizations/branches/list");
    } catch (err) {
      const apiErrors = err?.response?.data || {};
      const mappedErrors = {};

      if (apiErrors.branch_code)
        mappedErrors.branchCode = apiErrors.branch_code[0];
      if (apiErrors.tenant)
        mappedErrors.organization = apiErrors.tenant[0];

      setErrors(mappedErrors);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-600 text-sm">
          Loading organizations...
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 shadow-sm"
        >
          <FiArrowLeft className="text-xl text-gray-700" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Create Branch
          </h1>
          <p className="text-gray-500 text-sm">
            Master Admin can create branch
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ORGANIZATION */}
          <SelectField
            label="Select Organization *"
            name="organization"
            value={form.organization}
            onChange={handleChange}
            error={errors.organization}
            options={organizations.map((o) => ({
              label: o.name,
              value: o.tenant_id,
            }))}
          />

          {/* TENANT ID (READ ONLY DISPLAY) */}
          <InputField
            label="Tenant ID"
            value={form.organization}
            readOnly
            disabled
          />

          {/* BRANCH CODE */}
          <InputField
            label="Branch Code *"
            name="branchCode"
            value={form.branchCode}
            onChange={handleChange}
            error={errors.branchCode}
            placeholder="e.g. DEL-HQ-001"
          />

          <InputField
            label="Branch Name *"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />

          {/* ADDRESS */}
          <TextAreaField
            label="Branch Address *"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />

          <InputField
            label="Contact Person *"
            name="contactPerson"
            value={form.contactPerson}
            onChange={handleChange}
            error={errors.contactPerson}
          />

          <InputField
            label="Phone Number *"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 disabled:opacity-50"
          >
            <FiSave />
            {submitting ? "Creating..." : "Create Branch"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

/* ---------------- FIELD COMPONENTS ---------------- */

function InputField({ label, error, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <input
        {...props}
        className={`mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none
          ${error ? "border border-red-500" : "border border-transparent"}`}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function SelectField({ label, options, error, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <select
        {...props}
        className={`mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none
          ${error ? "border border-red-500" : "border border-transparent"}`}
      >
        <option value="">Choose option</option>
        {options.map((op, idx) => (
          <option key={idx} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function TextAreaField({ label, error, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 text-sm font-medium">
        {label}
      </label>
      <textarea
        {...props}
        className={`mt-2 p-3 h-24 rounded-xl bg-gray-50 shadow-sm outline-none
          ${error ? "border border-red-500" : "border border-transparent"}`}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

export default CreateBranch;
