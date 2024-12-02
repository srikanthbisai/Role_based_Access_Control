import { FaPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useUserManagement from "../hooks/useUserManagement";

const UserManagement: React.FC = () => {
  const { roles, editingUser, newUser, loading, error, showDialog, searchQuery, selectedRole, filteredUsers, setSearchQuery, setSelectedRole, setNewUser, setShowDialog, toggleUserStatus, handleAddUser, setEditingUser,  handleUpdateUser,  handleDeleteUser,  handleEditClick,
  } = useUserManagement();

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex gap-10 items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            className="border p-2 rounded-md"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border p-2 rounded-md"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Filter by role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowDialog(true)} // Open dialog for adding user
            className="text-white px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 transition-colors flex justify-center items-center gap-3"
          >
            <FaPlus />
            Add User
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* User List */}
      <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-100 font-serif text-xl">
      <th className="py-2 px-4 text-left">Name</th>
      <th className="py-2 px-4 text-left">Email</th>
      <th className="py-2 px-4 text-left hidden lg:table-cell">Status</th>
      <th className="py-2 px-4 text-left">Role</th>
      <th className="py-2 px-4 text-left hidden lg:table-cell">Activity</th>
      <th className="py-2 px-4 text-left">Edit</th>
      <th className="py-2 px-4 text-left">Delete</th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user) => (
      <tr
        key={user.id}
        className="hover:bg-gray-50 transition-colors border-b font-serif text-lg"
      >
        <td className="py-6 px-4 font-medium text-gray-800">
          {user.name}
        </td>
        <td className="py-6 px-4 text-gray-600">{user.email}</td>
        {/* Status column hidden on smaller screens */}
        <td className="py-6 px-4 text-gray-600 hidden lg:table-cell">
          <span
            className={`${
              user.status === "Active" ? "text-green-700" : "text-red-500"
            }`}
          >
            {user.status}
          </span>
        </td>
        <td className="py-6 px-4 text-gray-600">{user.role}</td>
        {/* Activity column hidden on smaller screens */}
        <td className="py-6 px-4 text-gray-600 hidden lg:table-cell">
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
                  user.status === "Active" ? "bg-green-500" : "bg-red-300"
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
        <td className="py-6 px-4">
          <button
            onClick={() => handleEditClick(user)}
            className="text-blue-500 hover:text-blue-700"
          >
            EDIT
          </button>
        </td>
        <td className="py-6 px-4">
          <button
            onClick={() => handleDeleteUser(user.id)}
            className="text-purple-400 hover:text-red-700 text-md"
          >
            DELETE
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


      {/* Add/Edit User Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label>Name</label>
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
              <label>Email</label>
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
              <label>Role</label>
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
              <label>Status</label>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={editingUser ? handleUpdateUser : handleAddUser}
            color="primary"
            disabled={loading}
          >
            {editingUser ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default UserManagement;
