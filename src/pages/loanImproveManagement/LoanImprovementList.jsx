import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import { loanService } from "../../../services/loanService";

const LoanImprovementList = () => {
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD ELIGIBLE LOANS ---------------- */
  useEffect(() => {
    (async () => {
      try {
        /*
        const data = await loanService.getLoansEligibleForImprovement();
        setLoans(data || []);
        */

        // TEMP MOCK DATA
        setLoans([
          {
            id: 101,
            loan_no: "LN-0001",
            product: "Personal Loan",
            interest: 12.5,
            emi: 8500,
            tenure: "36 Months",
            outstanding: 285000,
            status: "Active",
          },
          {
            id: 102,
            loan_no: "LN-0002",
            product: "Home Loan",
            interest: 8.75,
            emi: 32000,
            tenure: "240 Months",
            outstanding: 4200000,
            status: "Active",
          },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- SEARCH (LOAN-ONLY) ---------------- */
  const filteredLoans = loans.filter((l) =>
    l.loan_no.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Loan Improvement Management
        </h1>
        <p className="text-sm text-gray-500">
          Select an active loan to apply governed post-disbursement changes
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 mb-6 flex items-center gap-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Loan Number"
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      {loading ? (
        <p className="text-gray-500">Loading loans...</p>
      ) : (
        <div className="space-y-3">
          {/* TABLE HEADER */}
          <div className="hidden md:grid grid-cols-8 bg-gray-100 rounded-xl px-5 py-3 text-xs font-semibold text-gray-600">
            <div>Loan No</div>
            <div>Product</div>
            <div>Interest %</div>
            <div>EMI</div>
            <div>Tenure</div>
            <div>Outstanding</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          {/* ROWS */}
          {filteredLoans.map((loan) => (
            <div
              key={loan.id}
              className="bg-white rounded-2xl px-5 py-4 shadow-sm grid grid-cols-2 md:grid-cols-8 gap-y-2 items-center text-sm"
            >
              <div className="font-medium text-gray-900">
                {loan.loan_no}
              </div>

              <div className="text-gray-600">
                {loan.product}
              </div>

              <div className="text-gray-600">
                {loan.interest}%
              </div>

              <div className="text-gray-600">
                ₹{loan.emi.toLocaleString()}
              </div>

              <div className="text-gray-600">
                {loan.tenure}
              </div>

              <div className="text-gray-600">
                ₹{loan.outstanding.toLocaleString()}
              </div>

              <div>
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  {loan.status}
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() =>
                    navigate(`/loan-improvement/${loan.id}`)
                  }
                  className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  View Improvements <FiArrowRight />
                </button>
              </div>
            </div>
          ))}

          {filteredLoans.length === 0 && (
            <p className="text-gray-500 text-sm">
              No eligible loans found.
            </p>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default LoanImprovementList;
