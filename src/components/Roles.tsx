import React, { lazy } from 'react';
import { FaPlus } from "react-icons/fa";
import { Button, TextField, Checkbox, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonDialog from '../utils/CommonDialog';
import useRoleManagement from "../hooks/useRoleManagement";

const Spinner = lazy(()=>import('../utils/Spinner'));
const Roles: React.FC = () => {
  const {  roles,  permissions,  editingRole,   setEditingRole,   newRole,   setNewRole,    error,  loading, showDialog,    setShowDialog,   handleAddRole,   roleToDelete, handleDeleteRoleConfirmation,  
    confirmDeleteRole, cancelDeleteRole, handleEditClick,  handleUpdateRole 
  } = useRoleManagement();
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-2xl rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6 w-full overflow-x-auto font-serif">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex-shrink-0">Role Management</h2>
          <Button
            onClick={() => setShowDialog(true)} 
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
            className="w-full sm:w-auto"
          >
            Add Role
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm w-full text-center sm:text-left">{error}</p>}
      </div>

      {/* Roles List */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 font-serif">
              <th className="py-4 px-2 sm:px-4 text-left max-lg:text-md lg:text-lg ">Role</th>
              <th className="py-4 px-2 sm:px-4 text-left max-lg:text-md lg:text-lg hidden sm:table-cell">Permissions</th>
              <th className="py-4 px-2 sm:px-4 text-center max-lg:text-md lg:text-lg">Edit</th>
              <th className="py-4 px-2 sm:px-4 text-center max-lg:text-md lg:text-lg ">Delete</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr 
                key={role.id} 
                className="hover:bg-gray-50 transition-colors border-b font-serif text-sm sm:text-lg"
              >
                <td className="py-4 px-2 sm:px-4 font-medium text-gray-800">
                  {role.name}
                  <div className="sm:hidden text-gray-600 text-xs mt-1">
                    {role.permissions.join(", ")}
                  </div>
                </td>
                <td className="py-4 px-2 sm:px-4 text-gray-600 hidden sm:table-cell">
                  {role.permissions.join(", ")}
                </td>
                <td className="py-4 px-2 sm:px-4 text-center text-gray-600">
                  <Button
                    onClick={() => handleEditClick(role)}
                    variant="text"
                    color="primary"
                    size="small"
                    className="text-purple-400 hover:text-red-700"
                  >
                    Edit
                  </Button>
                </td>
                <td className="py-4 px-2 sm:px-4 text-center text-gray-600">
                  <Button
                    onClick={() => handleDeleteRoleConfirmation(role.id)}
                    variant="text"
                    color="secondary"
                    size="small"
                    className="text-purple-400 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Dialog for Add/Edit Role */}
      <CommonDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onSubmit={editingRole ? handleUpdateRole : handleAddRole}
        title={editingRole ? "Edit Role" : "Add Role"}
        submitButtonText={editingRole ? "Update Role" : "Add Role"}
        maxWidth="xs"
      >
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
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                    size="small"
                  />
                }
                label={<span className="text-xs sm:text-sm">{permission.name}</span>}
              />
            ))}
          </div>
        </div>
      </CommonDialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={roleToDelete !== null}
        onClose={cancelDeleteRole}
      >
        <DialogTitle id="delete-role-dialog-title">
          Confirm Role Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-role-dialog-description">
            Are you sure you want to delete this role? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteRole} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteRole} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/*  Container registration for Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Roles;
