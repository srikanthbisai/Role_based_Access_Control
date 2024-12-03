import { useState, useEffect } from "react"; 
import axios from 'axios'; 
import { Permission } from "../types"; 
import { toast } from 'react-toastify';

function usePermissionManagement() { 
  const [permissions, setPermissions] = useState<Permission[]>([]); 
  const [newPermission, setNewPermission] = useState(""); 
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<string | null>(null);
  
  const API_URL = `${process.env.REACT_APP_API_URL}/permissions`; 
  

  useEffect(() => { 
    const fetchPermissions = async () => { 
      if (!API_URL) {
        setError("API URL is not defined");
        setIsLoading(false);
        return;
      }    
      try { 
        setIsLoading(true); 
        const response = await axios.get(API_URL, {
          validateStatus: function (status) {
            return status >= 200 && status < 300; 
          }
        }); 
        setPermissions(response.data); 
        setError(null); 
      } catch (err: any) { 
        console.error("Detailed error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers
        }); 
        setError(`Failed to fetch permissions: ${err.message}`); 
      } finally { 
        setIsLoading(false); 
      } 
    }; 
    fetchPermissions(); 
  }, []); 



  const handleAddPermission = async () => { 
    if (!API_URL) {
      setError("API URL is not defined");
      return;
    }
    
    if (newPermission.trim() === "") return; 
    try { 
      const response = await axios.post(API_URL, { 
        name: newPermission, 
        id: `perm_${Date.now()}` 
      }); 
      setPermissions((prev) => [...prev, response.data]); 
      setNewPermission(""); 
      setError(null); 
    } catch (err: any) { 
      console.error("Error adding permission:", err); 
      setError("Failed to add permission"); 
    } 
  }; 

  const handlePermissionInput = (e: React.ChangeEvent<HTMLInputElement>) => {   //regex check for email Validation
    const lettersOnly = /^[A-Za-z]*$/; 
    if (lettersOnly.test(e.target.value)) { 
      setNewPermission(e.target.value); 
    } 
  }; 

  const handleDeletePermission = async (id: string) => { 
    if (!API_URL) {
      setError(" API URL is not defined");
      return;
    }  
    try { 
      await axios.delete(`${API_URL}/${id}`); 
      setPermissions((prev) => prev.filter((perm) => perm.id !== id)); 
      toast.success("Permission deleted successfully"); 
      setError(null); 
    } catch (err: any) { 
      console.error("Error deleting permission:", err); 
      setError("Failed to delete permission"); 
    } 
  }; 

  const confirmDelete = (id: string) => {
    setPermissionToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (permissionToDelete) {
      handleDeletePermission(permissionToDelete);
      setOpenDeleteDialog(false);
      setPermissionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setPermissionToDelete(null);
  };

  return { 
    permissions,  handleAddPermission,  handleDeletePermission,  newPermission,  setNewPermission,  error,  isLoading,  handlePermissionInput,  openDeleteDialog,  setOpenDeleteDialog, 
    handleConfirmDelete,   handleCancelDelete,   confirmDelete
  }; 
} 

export default usePermissionManagement;