import React, { useState } from 'react';
import { UserPlus, Shield, Lock, Users, Settings, LogOut } from 'lucide-react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, name: 'Developer', permissions: ['read', 'write'] },
    { id: 2, name: 'UI/UX Designer', permissions: ['read', 'write'] },
    { id: 3, name: 'HR', permissions: ['read', 'manage_users'] },
    { id: 4, name: 'Desktop Manager', permissions: ['read', 'write', 'manage_users'] },
  ]);
  const [activeTab, setActiveTab] = useState('users');
  const [newUser, setNewUser] = useState({ id: null, name: '', email: '', role: '' });
  const [newRole, setNewRole] = useState({ id: null, name: '', permissions: [] });
  const [editUserId, setEditUserId] = useState(null);
  const [editRoleId, setEditRoleId] = useState(null);

  const allPermissions = ['read', 'write', 'delete', 'manage_users'];

  // User Management Functions
  const addUser = (e) => {
    e.preventDefault();
    if (editUserId !== null) {
      setUsers(users.map(user => (user.id === editUserId ? { ...newUser, id: editUserId } : user)));
      setEditUserId(null);
    } else if (newUser.name && newUser.email && newUser.role) {
      setUsers([...users, { ...newUser, id: users.length + 1 }]);
    }
    setNewUser({ id: null, name: '', email: '', role: '' });
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const editUser = (user) => {
    setNewUser(user);
    setEditUserId(user.id);
  };

  // Role Management Functions
  const addRole = (e) => {
    e.preventDefault();
    if (editRoleId !== null) {
      setRoles(roles.map(role => (role.id === editRoleId ? { ...newRole, id: editRoleId } : role)));
      setEditRoleId(null);
    } else if (newRole.name && newRole.permissions.length > 0) {
      setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    }
    setNewRole({ id: null, name: '', permissions: [] });
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const editRole = (role) => {
    setNewRole(role);
    setEditRoleId(role.id);
  };

  const togglePermission = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">RBAC Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
              <LogOut className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
              activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ${
              activeTab === 'roles' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-blue-100'
            }`}
          >
            <Lock className="h-5 w-5" />
            <span>Roles</span>
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Users</h2>
            {/* Add/Edit User Form */}
            <form onSubmit={addUser} className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300"
              >
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.name}>{role.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
              >
                {editUserId ? 'Update User' : 'Add User'}
              </button>
            </form>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Email</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Role</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{user.name}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">{user.role}</td>
                      <td className="px-6 py-3 space-x-2">
                        <button
                          onClick={() => editUser(user)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-500 hover:text-red-700"
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
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Roles</h2>
            {/* Add/Edit Role Form */}
            <form onSubmit={addRole} className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
  {/* Role Name Input */}
  <input
    type="text"
    placeholder="Role Name"
    value={newRole.name}
    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
    className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-blue-300"
  />

  {/* Permissions Section */}
  <div>
    <h3 className="text-sm font-medium text-gray-800 mb-2">Permissions</h3>
    <div className="grid grid-cols-2 gap-2">
      {allPermissions.map(permission => (
        <label key={permission} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={newRole.permissions.includes(permission)}
            onChange={() => togglePermission(permission)}
            className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400 rounded"
          />
          <span className="text-sm">{permission}</span>
        </label>
      ))}
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="bg-blue-500 text-white px-2 py-1 text-l w-24 rounded-md hover:bg-blue-600 shadow-sm"
  >
    {editRoleId ? 'Update Role' : 'Add Role'}
  </button>
</form>

            {/* Roles Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Role Name</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Permissions</th>
                    <th className="px-6 py-3 text-left text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id} className="border-t hover:bg-gray-50 transition">
                      <td className="px-6 py-3">{role.name}</td>
                      <td className="px-6 py-3">
                        {role.permissions.length > 0
                          ? role.permissions.join(', ')
                          : 'No Permissions'}
                      </td>
                      <td className="px-6 py-3 space-x-2">
                        <button
                          onClick={() => editRole(role)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRole(role.id)}
                          className="text-red-500 hover:text-red-700"
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;



