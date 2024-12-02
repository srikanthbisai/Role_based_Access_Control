import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface Role {
  id: number;
  name: string;
}

const useUserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, roleResponse] = await Promise.all([
          fetch("http://localhost:5000/users"),
          fetch("http://localhost:5000/roles"),
        ]);

        if (!userResponse.ok || !roleResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await userResponse.json();
        const rolesData = await roleResponse.json();

        setUsers(usersData);
        setRoles(rolesData);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name?.trim() || !newUser.email?.trim() || !newUser.role) {
      toast.error("Name, email, and role are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) throw new Error("Failed to add user");

      const addedUser = await response.json();
      setUsers((prev) => [...prev, addedUser]);
      setNewUser({ name: "", email: "", role: "", status: "Active" });
      setError("");
      setShowDialog(false);

      toast.success("User added successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditingUser(null);
      setError("");
      setShowDialog(false);

      toast.success("User updated successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((user) => user.id !== id));

      toast.success("User deleted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the user");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = (user: User) => {
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
    );
    setUsers(updatedUsers);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowDialog(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole ? user.role === selectedRole : true;

    return matchesSearch && matchesRole;
  });

  return {
    users,
    roles,
    editingUser,
    newUser,
    loading,
    error,
    showDialog,
    searchQuery,
    selectedRole,
    filteredUsers,
    setSearchQuery,
    setSelectedRole,
    setNewUser,
    setShowDialog,
    toggleUserStatus,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
    handleEditClick,
    setEditingUser
  };
};

export default useUserManagement;
