import { useState, useEffect } from "react";
import axios from 'axios';
import { Permission } from "../types";

function usePermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://json-server-render-cha6.onrender.com/permissions";

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API_URL);
        setPermissions(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching permissions:", err);
        setError("Failed to fetch permissions");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPermissions();
  }, []);

  const handleAddPermission = async () => {
    if (newPermission.trim() === "") return;
    
    try {
      const response = await axios.post(API_URL, { 
        name: newPermission,
        id: `perm_${Date.now()}` // Ensure unique ID
      });
      setPermissions((prev) => [...prev, response.data]);
      setNewPermission("");
      setError(null);
    } catch (err) {
      console.error("Error adding permission:", err);
      setError("Failed to add permission");
    }
  };

  const handleDeletePermission = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPermissions((prev) => prev.filter((perm) => perm.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting permission:", err);
      setError("Failed to delete permission");
    }
  };

  return {
    permissions, 
    handleAddPermission, 
    handleDeletePermission, 
    newPermission, 
    setNewPermission,
    error,
    isLoading
  }
}

export default usePermissionManagement;