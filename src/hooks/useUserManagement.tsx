import { useState, useEffect, useCallback } from "react";
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
          fetch(`https://json-server-render-cha6.onrender.com/users`),
          fetch("https://json-server-render-cha6.onrender.com/roles"),
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
      const response = await fetch("https://json-server-render-cha6.onrender.com/users", {
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
      const response = await fetch(`https://json-server-render-cha6.onrender.com/users/${editingUser.id}`, {
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
      const response = await fetch(`https://json-server-render-cha6.onrender.com/users/${id}`, {
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesSearch = searchQuery ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesRole && matchesSearch;
  });

  const [emailError, setEmailError] = useState<string>("");

  const handleEmailChange = useCallback((email: string, isEditing: boolean) => {
    if (isEditing && editingUser) {
      setEditingUser({ ...editingUser, email });
      setEmailError(validateEmail(email) ? "" : "Invalid email format");
    } else {
      setNewUser({ ...newUser, email });
      setEmailError(validateEmail(email) ? "" : "Invalid email format");
    }
  }, [editingUser, newUser, setEditingUser, setNewUser]);

  const handleSubmit = useCallback(() => {
    const emailToValidate = editingUser?.email || newUser.email;
    
    if (!emailToValidate) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(emailToValidate)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    editingUser ? handleUpdateUser() : handleAddUser();
  }, [editingUser, newUser, handleUpdateUser, handleAddUser]);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
    setEmailError("");
  }, [setShowDialog]);

  return {
    users,roles, editingUser, newUser, loading,  error,  showDialog,  searchQuery,  selectedRole,  filteredUsers,  setSearchQuery,  setSelectedRole,  setNewUser,
    setShowDialog,  toggleUserStatus,  handleAddUser,  handleUpdateUser,  handleDeleteUser, handleEditClick,  setEditingUser, validateEmail, emailError, setEmailError,
    handleEmailChange, handleCloseDialog, handleSubmit
  };
};

export default useUserManagement;
