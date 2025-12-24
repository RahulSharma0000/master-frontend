import React, { useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddLoginFee() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        feeName: "",
        feeType: "Flat",
        amount: "",
        status: "Active",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Add Login Fee:", form);
        navigate("/controls/login-fees");
    };

    return (
        <MainLayout>
            {/* HEADER */}
            <div className="flex items-center gap-3 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100">
                    <FiArrowLeft />
                </button>
                <div>
                    <h1 className="text-2xl font-bold">Add Login Fees</h1>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <Input label="Fee Name" name="feeName" value={form.feeName} onChange={handleChange} required />

                <Select
                    label="Fee Type"
                    name="feeType"
                    value={form.feeType}
                    onChange={handleChange}
                    options={["Flat", "Percentage"]}
                />

                <Input
                    label={form.feeType === "Flat" ? "Amount (₹)" : "Percentage (%)"}
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                />

                <Select
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    options={["Active", "Inactive"]}
                />

                <div className="md:col-span-2 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-5 py-3 rounded-xl border"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-3 rounded-xl bg-blue-600 text-white flex items-center gap-2"
                    >
                        <FiSave /> Save
                    </button>
                </div>
            </form>
        </MainLayout>
    );
}

const Header = ({ title }) => (
    <div className="flex items-center gap-3 mb-8">
        <FiArrowLeft className="cursor-pointer" />
        <h1 className="text-2xl font-bold">{title}</h1>
    </div>
);

const Input = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <input {...props} className="mt-2 w-full p-3 rounded-xl border bg-gray-50" />
    </div>
);

const Select = ({ label, options, ...props }) => (
    <div>
        <label className="text-sm font-medium">{label}</label>
        <select {...props} className="mt-2 w-full p-3 rounded-xl border bg-gray-50">
            {options.map((o) => (
                <option key={o}>{o}</option>
            ))}
        </select>
    </div>
);
