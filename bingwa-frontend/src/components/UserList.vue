<template>
  <div>
    <div class="user-management">
      <h2>User Management</h2>
      <div class="user-controls">
        <div class="search-filter">
          <input type="text" v-model="searchQuery" placeholder="Search users..." class="search-input">
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
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
      users: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'ENGINEER',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'MANAGER',
          status: 'Active'
        }
      ]
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const matchesSearch =
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesRole = !this.roleFilter || user.role === this.roleFilter;
        return matchesSearch && matchesRole;
      });
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 1.5rem;
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

.table-container {
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: separate;
  background: white;
  border-radius: 8px;
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

.close-btn {
  background: none;
  border: none;
  font-size: 2.25rem;
  cursor: pointer;
  color: #9ECC3D;
  padding: 10px;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #6BAF2B;
}
</style>