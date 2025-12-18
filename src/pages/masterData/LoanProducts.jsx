import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { loanProductService } from "../../services/loanProductService";

const LoanProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  // Edit mode
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // ---------------------------------
  // SAFE REFRESH FUNCTION (KEY FIX)
  // ---------------------------------
  const refreshProducts = () => {
    try {
      const data = loanProductService.getProducts();

      // Always normalize to array
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.results)) {
        setProducts(data.results);
      } else {
        console.error("Invalid products response:", data);
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
      setProducts([]);
    }
  };

  // Load products on mount
  useEffect(() => {
    refreshProducts();
  }, []);

  // ---------------------------------
  // CRUD HANDLERS
  // ---------------------------------
  const handleAdd = () => {
    if (!newProduct.trim()) {
      alert("Enter product name");
      return;
    }

    loanProductService.addProduct(newProduct.trim());
    refreshProducts();
    setNewProduct("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this loan product?")) return;

    loanProductService.deleteProduct(id);
    refreshProducts();
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) {
      alert("Enter name");
      return;
    }

    loanProductService.updateProduct(editId, editName.trim());
    refreshProducts();

    setEditId(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  // ---------------------------------
  // UI
  // ---------------------------------
  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 border rounded-xl hover:bg-gray-100"
        >
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">
          Define Loan Product Types
        </h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl">
        {/* ADD NEW */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="e.g. Personal Loan, Business Loan"
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleAdd}
            className="px-4 bg-blue-600 text-white rounded-xl flex items-center gap-1 hover:bg-blue-700"
          >
            <FiPlus /> Add
          </button>
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {Array.isArray(products) &&
            products.map((p) => (
              <div
                key={p.id}
                className="p-3 bg-gray-50 rounded-xl flex justify-between items-center"
              >
                {/* Name or edit input */}
                {editId === p.id ? (
                  <input
                    className="flex-1 p-2 border rounded-lg mr-3"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span className="font-medium">{p.name}</span>
                )}

                <div className="flex items-center gap-2">
                  {editId === p.id ? (
                    <>
                      <button
                        onClick={saveEdit}
                        className="text-green-600 p-2 hover:bg-green-100 rounded-lg"
                        title="Save"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 p-2 hover:bg-gray-200 rounded-lg"
                        title="Cancel"
                      >
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(p)}
                      className="text-blue-600 p-2 hover:bg-blue-100 rounded-lg"
                      title="Edit"
                    >
                      <FiEdit3 />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 p-2 hover:bg-red-100 rounded-lg"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

          {products.length === 0 && (
            <p className="text-gray-500 text-sm mt-4">
              No products added yet.
            </p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LoanProducts;
