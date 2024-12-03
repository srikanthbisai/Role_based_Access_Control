import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
  const [emailError, setEmailError] = useState("");

  const API_USERS = `${process.env.REACT_APP_API_URL}/users`;
  const API_ROLES = `${process.env.REACT_APP_API_URL}/roles`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [userResponse, roleResponse] = await Promise.all([
          axios.get(API_USERS || ""),
          axios.get(API_ROLES || ""),
        ]);

        setUsers(userResponse.data);
        setRoles(roleResponse.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
        toast.error("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_USERS, API_ROLES]);

  const handleAddUser = async () => {
    if (!newUser.name?.trim() || !newUser.email?.trim() || !newUser.role) {
      toast.error("Name, email, and role are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_USERS || "", newUser);
      setUsers((prev) => [...prev, response.data]);
      setNewUser({ name: "", email: "", role: "", status: "Active" });
      setShowDialog(false);

      toast.success("User added successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while adding the user");
      toast.error("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    setLoading(true);
    try {
      const response = await axios.put(`${API_USERS}/${editingUser.id}`, editingUser);
      setUsers((prev) =>
        prev.map((user) => (user.id === response.data.id ? response.data : user))
      );
      setEditingUser(null);
      setShowDialog(false);

      toast.success("User updated successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while updating the user");
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`${API_USERS}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the user");
      toast.error("Failed to delete user");
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

  const handleEmailChange = useCallback(
    (email: string, isEditing: boolean) => {
      if (isEditing && editingUser) {
        setEditingUser({ ...editingUser, email });
        setEmailError(validateEmail(email) ? "" : "Invalid email format");
      } else {
        setNewUser({ ...newUser, email });
        setEmailError(validateEmail(email) ? "" : "Invalid email format");
      }
    },
    [editingUser, newUser]
  );

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
  }, [editingUser, newUser]);

  const handleCloseDialog = useCallback(() => {
    setShowDialog(false);
    setEmailError("");
    setEditingUser(null);
    setNewUser({ name: "", email: "", role: "", status: "Active" });
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedRole ? user.role === selectedRole : true;
    const matchesSearch = searchQuery ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesRole && matchesSearch;
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
    setEditingUser,
    validateEmail,
    emailError,
    setEmailError,
    handleEmailChange,
    handleCloseDialog,
    handleSubmit,
  };
};

export default useUserManagement;
