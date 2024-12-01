import React, { useState, useEffect } from "react";

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<Partial<any>>({ name: "", permissions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false); // Manage dialog visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          fetch("http://localhost:5000/roles"),
          fetch("http://localhost:5000/permissions"),
        ]);

        if (!rolesResponse.ok || !permissionsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const rolesData = await rolesResponse.json();
        const permissionsData = await permissionsResponse.json();

        setRoles(rolesData);
        setPermissions(permissionsData);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  const handleAddRole = async () => {
    if (!newRole.name?.trim()) {
      setError("Role name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRole),
      });

      if (!response.ok) throw new Error("Failed to add role");

      const addedRole = await response.json();
      setRoles((prev) => [...prev, addedRole]);
      setNewRole({ name: "", permissions: [] });
      setError("");
      setShowDialog(false); // Close dialog after adding role
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the role");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!editingRole) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/roles/${editingRole.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRole),
      });

      if (!response.ok) throw new Error("Failed to update role");

      const updatedRole = await response.json();
      setRoles((prev) =>
        prev.map((role) => (role.id === updatedRole.id ? updatedRole : role))
      );
      setEditingRole(null);
      setError("");
      setShowDialog(false); // Close dialog after updating role
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the role");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/roles/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete role");

      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the role");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (role: any) => {
    setEditingRole(role);
    setShowDialog(true); // Show dialog for editing
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <button
          onClick={() => setShowDialog(true)} // Open dialog for adding role
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Role
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Roles List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 font-serif">
            <th className="py-2 px-4 text-left text-2xl">Role Name</th>
            <th className="py-2 px-4 text-left text-2xl">Permissions</th>
            <th className="py-2 px-4 text-left text-2xl">Edit</th>
            <th className="py-2 px-4 text-left text-2xl">Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50 transition-colors border-b font-serif text-lg">
              <td className="py-3 px-4 font-medium text-gray-800">{role.name}</td>
              <td className="py-3 px-4 text-gray-600">
                {role.permissions.join(", ")}
              </td>
              <td className="py-3 px-4 text-gray-600 flex items-center space-x-2">
                <button
                  onClick={() => handleEditClick(role)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Edit
                </button>
              </td>

              <td className="py-3 px-4 text-gray-600 ">
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit Role */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">{editingRole ? "Edit Role" : "Add Role"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Role Name</label>
                <input
                  type="text"
                  value={editingRole ? editingRole.name : newRole.name}
                  onChange={(e) =>
                    editingRole
                      ? setEditingRole({ ...editingRole, name: e.target.value })
                      : setNewRole({ ...newRole, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Permissions</label>
                <div className="space-y-2">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={permission.name}
                        checked={
                          editingRole
                            ? editingRole.permissions.includes(permission.name)
                            : newRole.permissions.includes(permission.name)
                        }
                        onChange={(e) => {
                          const updatedPermissions = e.target.checked
                            ? [...(editingRole ? editingRole.permissions : newRole.permissions), permission.name]
                            : (editingRole ? editingRole.permissions : newRole.permissions).filter(
                                (perm: string) => perm !== permission.name
                              );

                          if (editingRole) {
                            setEditingRole({ ...editingRole, permissions: updatedPermissions });
                          } else {
                            setNewRole({ ...newRole, permissions: updatedPermissions });
                          }
                        }}
                        className="mr-2"
                      />
                      <label className="text-sm text-gray-700">{permission.name}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={editingRole ? handleUpdateRole : handleAddRole}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingRole ? "Update Role" : "Add Role"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleManagement;
