import React from 'react';
import usePermissionManagement from "../hooks/usePermissionManagement";

const Permissions = () => {
  const {
    newPermission, 
    setNewPermission, 
    handleDeletePermission, 
    handleAddPermission, 
    permissions
  } = usePermissionManagement();

  return (
    <div className="bg-white shadow-2xl rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-6 w-full overflow-x-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center border-b pb-4 gap-4 sm:gap-10 justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex-shrink-0">Permission Management</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <input
            className="w-full sm:w-auto px-3 py-2 text-sm sm:text-base border rounded-md border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="New Permission"
            value={newPermission}
            onChange={(e) => setNewPermission(e.target.value)}
          />
          <button
            onClick={handleAddPermission}
            className="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Add Permission
          </button>
        </div>
      </div>

      {/* Permissions List */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 font-serif">
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-2xl">Permission</th>
              <th className="py-2 px-2 sm:px-4 text-left text-sm sm:text-2xl">Actions</th>
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
                  <button
                    onClick={() => handleDeletePermission(permission.id)}
                    className="text-red-500 hover:text-red-700 transition-colors text-xs sm:text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Permissions;