import {  Dialog,  DialogActions,  DialogContent,  DialogContentText,  DialogTitle,  Button} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePermissionManagement from "../hooks/usePermissionManagement";
import { lazy } from 'react';
const Spinner = lazy(()=> import("../utils/Spinner"))

const Permissions = () => {
  const { newPermission,  handleAddPermission,  permissions,isLoading, openDeleteDialog, error,  handlePermissionInput,handleConfirmDelete,  handleCancelDelete, confirmDelete
  } = usePermissionManagement();


  if(isLoading) {
    return <div className='h-screen flex items-center justify-center'>
      <Spinner/>
    </div>
  }

  return (
    <div className="bg-white shadow-2xl rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6 w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 gap-4 sm:gap-10 justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex-shrink-0 font-serif">Permission Management</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <input
            className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="New Permission"
            value={newPermission}
            onChange={handlePermissionInput}
          />
          <Button
          onClick={handleAddPermission}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          className="w-full sm:w-auto"
          >
          Add
          </Button>
        </div>
      </div>


      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          {error}
        </div>
      )}

       
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 font-serif">
                <th className="py-4 px-2 sm:px-4 text-left max-lg:text-md lg:text-lg">Permission</th>
                <th className="py-4 px-2 sm:px-4 text-left max-lg:text-md lg:text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((permission) => (
                <tr 
                  key={permission.id} 
                  className="hover:bg-gray-50 transition-colors border-b font-serif text-sm sm:text-lg"
                >
                  <td className="py-4 px-2 sm:px-4 font-medium text-gray-800">
                    {permission.name}
                  </td>
                  <td className="py-4 px-2 sm:px-4 text-gray-600">
                    <Button
                      onClick={() => confirmDelete(permission.id)}
                      color="error"
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {permissions.length === 0 && (
            <p className="text-center text-gray-500 py-4">No permissions found</p>
          )}
        </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle id="delete-permission-dialog-title">
          {"Confirm Delete Permission"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-permission-dialog-description">
            Are you sure you want to delete this permission? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete}
           variant="contained"
           color="error"
           className="bg-red-600 hover:bg-red-700 text-white"
           autoFocus
           >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Permissions;
