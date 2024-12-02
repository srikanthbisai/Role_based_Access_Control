
import { FaPlus } from "react-icons/fa";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useRoleManagement from "../hooks/useRoleManagement";

const RoleManagement: React.FC = () => {
 const {  roles ,  permissions, editingRole, setEditingRole, newRole, setNewRole, error, showDialog, setShowDialog,
  handleAddRole, handleDeleteRole, handleEditClick, handleUpdateRole } = useRoleManagement();

  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 space-y-6">
      <div className="flex gap-10 items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Role Management</h2>
        <Button
          onClick={() => setShowDialog(true)} 
          variant="contained"
          color="primary"
          startIcon={<FaPlus />}
        >
          Add Role
        </Button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {/* Roles List */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 font-serif">
            <th className="py-2 px-4 text-left text-2xl">Role Name</th>
            <th className="py-2 px-4 text-left text-2xl">Permissions</th>
            <th className="py-2 px-4 text-left text-2xl">Edit</th>
            <th className="py-2 px-4 text-left text-2xl">Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="hover:bg-gray-50 transition-colors border-b font-serif text-lg">
              <td className="py-6 px-4 font-medium text-gray-800">{role.name}</td>
              <td className="py-6 px-4 text-gray-600">
                {role.permissions.join(", ")}
              </td>
              <td className="py-6 px-4 text-gray-600 flex items-center space-x-2">
                <Button
                  onClick={() => handleEditClick(role)}
                  variant="text"
                  color="primary"
                >
                  Edit
                </Button>
              </td>

              <td className="py-6 px-4 text-gray-600 ">
                <Button
                  onClick={() => handleDeleteRole(role.id)}
                  variant="text"
                  color="secondary"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog for Add/Edit Role */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            value={editingRole ? editingRole.name : newRole.name}
            onChange={(e) =>
              editingRole
                ? setEditingRole({ ...editingRole, name: e.target.value })
                : setNewRole({ ...newRole, name: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            {permissions.map((permission) => (
              <FormControlLabel
                key={permission.id}
                control={
                  <Checkbox
                    checked={
                      editingRole
                        ? editingRole.permissions.includes(permission.name)
                        : newRole.permissions.includes(permission.name)
                    }
                    onChange={(e) => {
                      const updatedPermissions = e.target.checked
                        ? [...(editingRole ? editingRole.permissions : newRole.permissions), permission.name]
                        : (editingRole ? editingRole.permissions : newRole.permissions).filter(
                            (perm: string) => perm !== permission.name
                          );

                      if (editingRole) {
                        setEditingRole({ ...editingRole, permissions: updatedPermissions });
                      } else {
                        setNewRole({ ...newRole, permissions: updatedPermissions });
                      }
                    }}
                  />
                }
                label={permission.name}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={editingRole ? handleUpdateRole : handleAddRole}
            color="primary"
          >
            {editingRole ? "Update Role" : "Add Role"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ToastContainer for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default RoleManagement;