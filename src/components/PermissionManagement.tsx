// src/components/PermissionManagement.tsx
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
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Permission Management</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Permission</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{permission.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDeletePermission(permission.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex">
        <input
          className="border border-gray-300 p-2 flex-1"
          placeholder="New Permission"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
        />
        <button
          onClick={handleAddPermission}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
        >
          Add Permission
        </button>
      </div>
    </div>
  );
};

export default PermissionManagement;
