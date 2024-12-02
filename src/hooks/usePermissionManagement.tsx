import { useState, useEffect } from "react";
import { Permission } from "../types";
import axios from 'axios'; 

function usePermissionManagement() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://json-server-4ksl.vercel.app/permissions";

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await axios.get(API_URL);
        setPermissions(response.data);
      } catch (err) {
        console.error("Error fetching permissions:", err);
        setError("Failed to fetch permissions");
      }
    };
    fetchPermissions();
  }, []);

  const handleAddPermission = async () => {
    if (newPermission.trim() === "") return;
    
    try {
      const response = await axios.post(API_URL, { name: newPermission });
      setPermissions((prev) => [...prev, response.data]);
      setNewPermission("");
    } catch (err) {
      console.error("Error adding permission:", err);
      setError("Failed to add permission");
    }
  };

  const handleDeletePermission = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPermissions((prev) => prev.filter((perm) => perm.id !== id));
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
    error
  }
}

export default usePermissionManagement;