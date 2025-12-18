import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const loadUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();

    // SAME TAB refresh support
    const handler = () => loadUser();
    window.addEventListener("profile-updated", handler);

    return () => {
      window.removeEventListener("profile-updated", handler);
    };
  }, []);

  return (
    <div className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">

      <h1 className="text-xl font-semibold text-gray-900">Xpertland.Ai</h1>

      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        {/* USER NAME */}
        <span className="text-gray-700 text-sm font-medium">
          {user?.first_name || "User"}
        </span>

        {/* AVATAR */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {(user?.first_name || "U").charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
