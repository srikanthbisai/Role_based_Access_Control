import React from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonDialog from "../utils/CommonDialog";
import useUserManagement from "../hooks/useUserManagement";

const User: React.FC = () => {
  const {
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
    setEditingUser,
    handleUpdateUser,
    handleDeleteUser,
    handleEditClick,
  } = useUserManagement();

  return (
    <div className="bg-white shadow-2xl rounded-xl p-4 sm:p-6 w-full max-w-full mx-auto overflow-x-auto font-serif text-lg">
      <div className="flex flex-col sm:flex-row gap-4 items-center border-b pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 w-full sm:w-auto text-center sm:text-left">
          User Management
        </h2>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 items-center w-full sm:w-auto">
          <input
            type="text"
            className="border p-2 rounded-md w-full sm:w-auto"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border p-2 rounded-md w-full sm:w-auto"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">ALL FILTERS</option>
            {roles.map((role) => {
              if (!role.name.toLowerCase().includes("name")) {
                return (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                );
              }
              return null; 
            })}
          </select>

          <button
            onClick={() => setShowDialog(true)}
            className="text-white p-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-colors flex justify-center items-center gap-2 w-full sm:w-auto"
          >
            <FaPlus />
            Add User
          </button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* User List */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse table-auto mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-2 text-left">Name</th>
              <th className="py-4 px-2 text-left hidden md:table-cell">
                Email
              </th>
              <th className="py-4 px-2 text-left hidden md:table-cell">
                Status
              </th>
              <th className="py-4 px-2 text-left">Role</th>
              <th className="py-4 px-2 text-left hidden md:table-cell">
                Activity
              </th>
              <th className="py-4 px-2 text-left">Edit</th>
              <th className="py-4 px-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="py-4 px-2 font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="py-3 px-2 text-gray-600 hidden md:table-cell">
                  {user.email}
                </td>
                <td className="py-3 px-2 text-gray-600 hidden md:table-cell">
                  <span
                    className={
                      user.status === "Active"
                        ? "text-green-700"
                        : "text-red-500"
                    }
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-gray-600">{user.role}</td>
                <td className="py-3 px-2 text-gray-600 hidden md:table-cell">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={user.status === "Active"}
                      onChange={() => toggleUserStatus(user)}
                      className="hidden"
                    />
                    <div className="relative">
                      <div
                        className={`w-12 h-6 rounded-full ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : "bg-red-300"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 bg-gray-200 rounded-full transition-all ${
                            user.status === "Active"
                              ? "transform translate-x-6"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </label>
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="text-blue-500 hover:text-blue-700 max-lg:text-sm lg:text-lg"
                  >
                    EDIT
                  </button>
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-purple-400 hover:text-red-700 max-lg:text-sm lg:text-lg"
                  >
                   DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Dialog */}
      <CommonDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
        title={editingUser ? "Edit User" : "Add New User"}
        submitButtonText={editingUser ? "Update" : "Add"}
        loading={loading}
      >
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">Name</label>
            <input
              type="text"
              min={3}
              max={20}
              value={editingUser ? editingUser.name : newUser.name}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, name: e.target.value })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Email</label>
            <input
              type="email"
              required
              value={editingUser ? editingUser.email : newUser.email}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, email: e.target.value })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Role</label>
            <select
              value={editingUser ? editingUser.role : newUser.role}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, role: e.target.value })
                  : setNewUser({ ...newUser, role: e.target.value })
              }
              className="border p-2 rounded-md"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1">Status</label>
            <select
              value={editingUser ? editingUser.status : newUser.status}
              onChange={(e) =>
                editingUser
                  ? setEditingUser({ ...editingUser, status: e.target.value })
                  : setNewUser({ ...newUser, status: e.target.value })
              }
              className="border p-2 rounded-md"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </CommonDialog>

      <ToastContainer />
    </div>
  );
};

export default User;