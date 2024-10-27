<template>
  <div>
    <div class="user-management">
      <h2>User Management</h2>
      <div class="user-controls">
        <button class="primary-btn" @click="showAddUserModal">
          <i class="fas fa-user-plus"></i> Add New User
        </button>
        <div class="search-filter">
          <input type="text" v-model="searchQuery" placeholder="Search users..." class="search-input" />
          <select v-model="roleFilter" class="role-filter">
            <option value="">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="ENGINEER">Engineer</option>
          </select>
        </div>
      </div>

      <div class="table-container">
        <table class="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <td>
                <div class="user-info">
                  <i class="fas fa-user-circle"></i>
                  {{ user.name }}
                </div>
              </td>
              <td>{{ user.email }}</td>
              <td>
                <span :class="['role-badge', user.role.toLowerCase()]">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span :class="['status-badge', user.status.toLowerCase()]">
                  {{ user.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="edit-btn" @click="editUser(user)">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="delete-btn" @click="showDeleteConfirm(user)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-show="showModal" class="modal-overlay">
      <div class="main-modal">
        <div class="modal-header">
          <h3>Add New User</h3>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addUser">
            <div class="form-group">
              <label>Full Name</label>
              <input type="text" v-model="newUser.name" required placeholder="Enter full name" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" v-model="newUser.email" required placeholder="Enter email address" />
            </div>
            <div class="form-group">
              <label>Role</label>
              <select v-model="newUser.role" required>
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="ENGINEER">Engineer</option>
              </select>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="newUser.status" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="secondary-btn" @click="closeModal">
                Cancel
              </button>
              <button type="submit" class="primary-btn">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      roleFilter: '',
      showModal: false,
      newUser: {
        name: '',
        email: '',
        role: 'ENGINEER',
        status: 'Active'
      },
      users: []
    };
  },
  computed: {
    filteredUsers() {
      // Check if users is an array before filtering
      if (!Array.isArray(this.users)) {
        return [];
      }
      return this.users.filter(user => {
        const matchesSearch =
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesRole = !this.roleFilter || user.role === this.roleFilter;
        return matchesSearch && matchesRole;
      });
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/`);

        // Map the response to include the concatenated name
        this.users = (response.data.data || []).map(user => ({
          ...user,
          name: `${user.firstName} ${user.lastName}`,
          status:'Active'
        }));

        console.log('Users:', this.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        this.users = [];
      }
    },
    showAddUserModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.newUser = {
        name: '',
        email: '',
        role: 'ENGINEER',
        status: 'Active'
      };
    },
    async addUser() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/`, this.newUser);
        this.users.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    editUser(user) {
      //To-Do: Implementation for editing user details
    },
    showDeleteConfirm(user) {
      //o-Do: Implementation for confirming deletion of user
    }
  },
  created() {
    this.fetchUsers(); // Fetch users when the component is created
  }
};
</script>

<style scoped>
.user-management {

  padding: 1.5rem;
  position: relative;
  height: 100%;
  width: 100%;

}

.user-controls {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 2rem;

}

.search-filter {

  display: flex;

  gap: 1rem;

}

.search-input,

.role-filter {

  padding: 0.5rem 1rem;

  border: 1px solid #e2e8f0;

  border-radius: 4px;

  min-width: 200px;

}

.primary-btn {

  padding: 0.5rem 1rem;

  background-color: #9ECC3D;

  color: white;

  border: none;

  border-radius: 4px;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 0.5rem;

}

.table-container {

  overflow-x: auto;

}

.user-table {

  width: 100%;

  border-collapse: separate;

  border-spacing: 0;

  background: white;

  border-radius: 8px;

  overflow: hidden;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

}

.user-table th,

.user-table td {

  padding: 1rem;

  text-align: left;

  border-bottom: 1px solid #e2e8f0;

}

.user-table th {

  background-color: #f7fafc;

  font-weight: 600;

  color: #4a5568;

}

.user-info {

  display: flex;

  align-items: center;

  gap: 0.5rem;

}

.role-badge,

.status-badge {

  padding: 0.25rem 0.75rem;

  border-radius: 12px;

  font-size: 0.875rem;

}

.role-badge.admin {
  background-color: #9ECC3D;
  color: white;
}

.role-badge.manager {
  background-color: #48bb78;
  color: white;
}

.role-badge.engineer {
  background-color: #ed8936;
  color: white;
}

.status-badge.active {
  background-color: #48bb78;
  color: white;
}

.status-badge.inactive {
  background-color: #e53e3e;
  color: white;
}

.action-buttons {

  display: flex;

  gap: 0.5rem;

}

.edit-btn,

.delete-btn {

  padding: 0.5rem;

  border: none;

  border-radius: 4px;

  cursor: pointer;

  transition: all 0.2s ease;

}

.edit-btn {

  background-color: #9ECC3D;

  color: white;

}

.delete-btn {

  background-color: #e53e3e;

  color: white;

}

.edit-btn:hover,

.delete-btn:hover {

  opacity: 0.8;

}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

.main-modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1101;
}

.modal-header {
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-body {
  padding: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2.25rem;
  cursor: pointer;
  color: #9ECC3D !important;
  z-index: 1102;
  /* Higher z-index to ensure visibility */
  padding: 10px;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #6BAF2B;
}


.modal-body {
  padding: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a5568;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
}

.modal-footer {
  padding: 1rem 0 0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.secondary-btn {
  padding: 0.5rem 1rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.secondary-btn:hover {
  background-color: #cbd5e0;
}
</style>