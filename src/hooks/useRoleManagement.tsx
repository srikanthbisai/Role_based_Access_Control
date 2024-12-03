import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function useRoleManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);
  const [editingRole, setEditingRole] = useState<any | null>(null);
  const [newRole, setNewRole] = useState<Partial<any>>({ name: "", permissions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        const errorMessage = err.message || "An error occurred while fetching data";
        setError(errorMessage);
        
        // Debug toast: Log to console and show toast
        console.error('Fetch Error:', errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRole = async () => {
    // Validate role name
    if (!newRole.name?.trim()) {
      console.error('Role name is required');
      toast.error("Role name is required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
      
      // Reset new role state
      setNewRole({ name: "", permissions: [] });
      
      // Debug success toast
      console.log('Role added successfully');
      toast.success("Role added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Close dialog
      setShowDialog(false);
    } catch (err: any) {
      // Debug error toast
      console.error('Add Role Error:', err.message);
      toast.error(err.message || "An error occurred while adding the role", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
      
      // Debug success toast
      console.log('Role updated successfully');
      toast.success("Role updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset editing state
      setEditingRole(null);
      setShowDialog(false);
    } catch (err: any) {
      // Debug error toast
      console.error('Update Role Error:', err.message);
      toast.error(err.message || "An error occurred while updating the role", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoleConfirmation = (id: number) => {
    setRoleToDelete(id);
  };

  const confirmDeleteRole = async () => {
    if (roleToDelete === null) return;

    setLoading(true);
    try {
      const response = await fetch(`https://json-server-render-cha6.onrender.com/roles/${roleToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete role");

      setRoles((prev) => prev.filter((role) => role.id !== roleToDelete));
      
      // Debug success toast
      console.log('Role deleted successfully');
      toast.success("Role deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset delete state
      setRoleToDelete(null);
    } catch (err: any) {
      // Debug error toast
      console.error('Delete Role Error:', err.message);
      toast.error(err.message || "An error occurred while deleting the role", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelDeleteRole = () => {
    setRoleToDelete(null);
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
    roleToDelete,
    handleAddRole, 
    handleDeleteRoleConfirmation, 
    confirmDeleteRole,
    cancelDeleteRole,
    handleEditClick, 
    handleUpdateRole   
  }
}

export default useRoleManagement;