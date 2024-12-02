import React, { useState, useEffect } from "react";
import { Permission } from "../types";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState("");

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await fetch("http://localhost:5000/permissions");
      const data = await response.json();
      setPermissions(data);
    };
    fetchPermissions();
  }, []);

  const handleAddPermission = async () => {
    if (newPermission.trim() === "") return;
    const response = await fetch("http://localhost:5000/permissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newPermission }),
    });
    const data = await response.json();
    setPermissions((prev) => [...prev, data]);
    setNewPermission("");
  };

  const handleDeletePermission = async (id: string) => {
    await fetch(`http://localhost:5000/permissions/${id}`, { method: "DELETE" });
    setPermissions((prev) => prev.filter((perm) => perm.id !== id));
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex  items-center border-b pb-4 gap-10">
        <h2 className="text-2xl font-bold text-gray-800">Permission Management</h2>
        <div className="flex items-center space-x-2">
          <input
            className="px-4 py-2 border rounded-md border-red-800"
            placeholder="New Permission"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
          />
          <button
            onClick={handleAddPermission}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Permission
          </button>
        </div>
      </div>

      {/* Permissions List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 font-serif">
            <th className="py-2 px-4 text-left text-2xl">Permission</th>
            <th className="py-2 px-4 text-left text-2xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-50 transition-colors border-b font-serif text-lg">
              <td className="py-6 px-4 font-medium text-gray-800">{permission.name}</td>
              <td className="py-6 px-4 text-gray-600 flex items-center space-x-2">
                <button
                  onClick={() => handleDeletePermission(permission.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionManagement;
