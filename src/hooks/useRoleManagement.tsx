import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function useRoleManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<Partial<any>>({ name: "", permissions: [] });
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Ensure loading is true when fetching
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          fetch("https://json-server-render-cha6.onrender.com/roles"),
          fetch("https://json-server-render-cha6.onrender.com/permissions"),
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
        toast.error(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch
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
      const response = await fetch("https://json-server-render-cha6.onrender.com/roles", {
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
      const response = await fetch(`https://json-server-render-cha6.onrender.com/roles/${editingRole.id}`, {
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
      const response = await fetch(`https://json-server-render-cha6.onrender.com/roles/${id}`, {
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

  return {
    loading, 
    setLoading, 
    roles, 
    setRoles, 
    permissions, 
    setPermissions, 
    editingRole, 
    setEditingRole, 
    newRole, 
    setNewRole, 
    error, 
    setError, 
    showDialog, 
    setShowDialog,
    handleAddRole, 
    handleDeleteRole, 
    handleEditClick, 
    handleUpdateRole   
  }
}

export default useRoleManagement;