import React, { useState, useEffect } from "react";
import { FaEdit, FaUserCheck, FaUserTimes, FaTrash } from "react-icons/fa";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [newUser, setNewUser] = useState<Partial<any>>({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false); // Manage dialog visibility

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
    if (!newUser.name?.trim() || !newUser.email?.trim() || !newUser.role?.trim()) {
      setError("Name, email, and role are required");
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
      setShowDialog(false); // Close the dialog after adding user
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
      setShowDialog(false); // Close dialog after editing user
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
    } catch (err: any) {
      setError(err.message || "An error occurred while deleting the user");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = (user: any) => {
    const updatedUser: any = {
      ...user,
      status: user.status === "Active" ? "Inactive" : "Active",
    };

    setEditingUser(updatedUser);
    handleUpdateUser();
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setShowDialog(true); // Show dialog for editing
  };

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <button
          onClick={() => setShowDialog(true)} // Open dialog for adding user
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add User
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* User List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 font-serif">
            <th className="py-2 px-4 text-left text-2xl">Name</th>
            <th className="py-2 px-4 text-left text-2xl">Email</th>
            <th className="py-2 px-4 text-left text-2xl">Status</th>
            <th className="py-2 px-4 text-left text-2xl">Role</th>
            <th className="py-2 px-4 text-left text-2xl">Actions</th>
            <th className="py-2 px-4 text-left text-2xl">Edit User</th>
            <th className="py-2 px-4 text-left text-2xl">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors border-b font-serif text-lg">
              <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
              <td className="py-3 px-4 text-gray-600">{user.email}</td>
              <td className="py-3 px-4 text-gray-600">
                <span
                  className={`px-2 py-1 rounded-md text-lg ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-600">{user.role}</td>
              <td className="py-3 px-4 text-gray-600 flex items-center space-x-2">
                <button
                  onClick={() => toggleUserStatus(user)}
                  className={`${
                    user.status === "Active"
                      ? "text-red-500 hover:text-red-700"
                      : "text-green-500 hover:text-green-700"
                  } transition-colors`}
                >
                  {user.status === "Active" ? "Deactivate" : "Activate"}
                </button>
              </td>
              <td className="py-3 px-4 text-gray-600 ">
                <button
                  onClick={() => handleEditClick(user)} // Open dialog to edit user
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Edit
                </button>
              </td>
              <td className="py-3 px-4 text-gray-600">
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-gray-300 hover:text-red-700 transition-colors font-serif"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit User */}
      {showDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4">{editingUser ? "Edit User" : "Add User"}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={(e) =>
                    editingUser
                      ? setEditingUser({ ...editingUser, name: e.target.value })
                      : setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={(e) =>
                    editingUser
                      ? setEditingUser({ ...editingUser, email: e.target.value })
                      : setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={editingUser ? editingUser.role : newUser.role}
                  onChange={(e) =>
                    editingUser
                      ? setEditingUser({ ...editingUser, role: e.target.value })
                      : setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
