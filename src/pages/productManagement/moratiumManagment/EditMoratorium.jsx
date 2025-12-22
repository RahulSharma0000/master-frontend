import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

// import { moratoriumService } from "../../../services/moratoriumService";

/* ---------------- OPTIONS ---------------- */
const TYPE_OPTIONS = ["Full", "Interest-only"];
const PERIOD_UNIT_OPTIONS = ["Months", "Days"];
const EFFECT_OPTIONS = ["Interest-only", "Deferred"];

const EditMoratorium = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    type: "",
    period_value: "",
    period_unit: "Months",
    amount: "",
    effect: "",
    interest_rationalisation: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await moratoriumService.getMoratoriumById(id);
        setForm({
          type: data.type,
          period_value: data.period_value,
          period_unit: data.period_unit,
          amount: data.amount,
          effect: data.effect,
          interest_rationalisation: data.interest_rationalisation,
        });
        */

        // TEMP MOCK DATA
        setForm({
          type: "Full",
          period_value: 3,
          period_unit: "Months",
          amount: 50000,
          effect: "Deferred",
          interest_rationalisation: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* ---------------- VALIDATION ---------------- */
  const validate = (v) => {
    const e = {};

    if (!v.type) e.type = "Moratorium type is required";

    if (v.period_value === "")
      e.period_value = "Period is required";
    else if (+v.period_value <= 0)
      e.period_value = "Period must be greater than 0";

    if (!v.period_unit)
      e.period_unit = "Period unit is required";

    if (v.amount === "")
      e.amount = "Amount is required";
    else if (+v.amount <= 0)
      e.amount = "Amount must be greater than 0";

    if (!v.effect)
      e.effect = "Effect of moratorium is required";

    return e;
  };

  const hasErrors = useMemo(
    () => Object.keys(validate(form)).length > 0,
    [form]
  );

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updated = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };

    setForm(updated);

    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({
      type: true,
      period_value: true,
      period_unit: true,
      amount: true,
      effect: true,
    });

    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);
    try {
      /*
      const payload = {
        type: form.type,
        period_value: Number(form.period_value),
        period_unit: form.period_unit,
        amount: Number(form.amount),
        effect: form.effect,
        interest_rationalisation: form.interest_rationalisation,
      };

      await moratoriumService.updateMoratorium(id, payload);
      */

      navigate(-1);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading moratorium details...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Moratorium
          </h1>
          <p className="text-gray-500 text-sm">
            Update moratorium configuration and interest impact
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* TYPE */}
          <SelectField
            label="Moratorium Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            onBlur={handleBlur}
            options={TYPE_OPTIONS}
            error={errors.type}
          />

          {/* PERIOD */}
          <div className="flex gap-3">
            <InputField
              label="Period"
              type="number"
              name="period_value"
              value={form.period_value}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.period_value}
            />
            <SelectField
              label="Unit"
              name="period_unit"
              value={form.period_unit}
              onChange={handleChange}
              onBlur={handleBlur}
              options={PERIOD_UNIT_OPTIONS}
            />
          </div>

          {/* AMOUNT */}
          <InputField
            label="Amount Under Moratorium"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.amount}
          />

          {/* EFFECT */}
          <SelectField
            label="Effect of Moratorium"
            name="effect"
            value={form.effect}
            onChange={handleChange}
            onBlur={handleBlur}
            options={EFFECT_OPTIONS}
            error={errors.effect}
          />

          {/* INTEREST RATIONALISATION */}
          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="interest_rationalisation"
              checked={form.interest_rationalisation}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">
              Waive / Rationalise Interest during Moratorium
            </label>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={hasErrors || submitting}
              className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white shadow-md transition ${
                hasErrors || submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <FiSave />
              {submitting ? "Updating..." : "Update Moratorium"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditMoratorium;

/* ---------------- REUSABLE UI ---------------- */

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  error,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-2 p-3 rounded-xl bg-gray-50 focus:bg-white shadow-sm outline-none"
    />
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  error,
}) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm font-medium">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className="mt-2 p-3 rounded-xl bg-gray-50 shadow-sm outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((op, i) => (
        <option key={i} value={op}>
          {op}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
  </div>
);
