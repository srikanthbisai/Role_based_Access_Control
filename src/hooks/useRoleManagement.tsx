import axios from 'axios';
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
  
  
   const ROLES_API_URL = `${process.env.REACT_APP_API_URL}/roles`;
   const PERMISSIONS_API_URL = `${process.env.REACT_APP_API_URL}/permissions`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          axios.get(ROLES_API_URL),
          axios.get(PERMISSIONS_API_URL),
        ]);

        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
        
      } catch(err: any) {
        const errorMessage = err.response?.data?.message || err.message || "An error occurred while fetching data";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
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
      const response = await axios.post(ROLES_API_URL, newRole, {
        headers: { "Content-Type": "application/json" },
      });

      setRoles((prev) => [...prev, response.data]);
      setNewRole({ name: "", permissions: [] });
      toast.success("Role added successfully!");
      setShowDialog(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add role";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateRole = async () => {
    if (!editingRole) return;

    setLoading(true);
    try {
      const response = await axios.put(`${ROLES_API_URL}/${editingRole.id}`, editingRole, {
        headers: { "Content-Type": "application/json" },
      });

      setRoles((prev) =>
        prev.map((role) => (role.id === response.data.id ? response.data : role))
      );

      toast.success("Role updated successfully!");
      setEditingRole(null);
      setShowDialog(false);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update role";
      console.error('Update Role Error:', errorMessage);
      toast.error(errorMessage);
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
      await axios.delete(`${ROLES_API_URL}/${roleToDelete}`);

      setRoles((prev) => prev.filter((role) => role.id !== roleToDelete));
      toast.success("Role deleted successfully!");
      setRoleToDelete(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete role";
      console.error('Delete Role Error:', errorMessage);
      toast.error(errorMessage);
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