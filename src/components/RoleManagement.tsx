import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<Partial<any>>({ name: "", permissions: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

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
      toast.error("Role name is required");
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
      toast.success("Role added successfully!");
      setShowDialog(false); // Close dialog after adding role
    } catch (err: any) {
      toast.error(err.message || "An error occurred while adding the role");
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
      toast.success("Role updated successfully!");
      setEditingRole(null);
      setShowDialog(false); // Close dialog after updating role
    } catch (err: any) {
      toast.error(err.message || "An error occurred while updating the role");
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
      toast.success("Role deleted successfully!");
    } catch (err: any) {
      toast.error(err.message || "An error occurred while deleting the role");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (role: any) => {
    setEditingRole(role);
    setShowDialog(true); 
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex gap-10 items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <Button
          onClick={() => setShowDialog(true)} 
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
        >
          Add Role
        </Button>
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
              <td className="py-6 px-4 font-medium text-gray-800">{role.name}</td>
              <td className="py-6 px-4 text-gray-600">
                {role.permissions.join(", ")}
              </td>
              <td className="py-6 px-4 text-gray-600 flex items-center space-x-2">
                <Button
                  onClick={() => handleEditClick(role)}
                  variant="text"
                  color="primary"
                >
                  Edit
                </Button>
              </td>

              <td className="py-6 px-4 text-gray-600 ">
                <Button
                  onClick={() => handleDeleteRole(role.id)}
                  variant="text"
                  color="secondary"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit Role */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={editingRole ? editingRole.name : newRole.name}
            onChange={(e) =>
              editingRole
                ? setEditingRole({ ...editingRole, name: e.target.value })
                : setNewRole({ ...newRole, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
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
                  />
                }
                label={permission.name}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editingRole ? handleUpdateRole : handleAddRole}
            color="primary"
          >
            {editingRole ? "Update Role" : "Add Role"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ToastContainer for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RoleManagement;
