import { useState, useEffect } from "react";
import { Permission } from "../types";

function usePermissionManagement() {
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
  return {
     permissions, handleAddPermission, handleDeletePermission, newPermission, setNewPermission
  }
}

export default usePermissionManagement
