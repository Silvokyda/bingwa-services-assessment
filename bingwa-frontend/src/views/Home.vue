<template>
  <div class="home-container">
    <h1 class="welcome-title">Welcome, {{ role.toUpperCase() }}</h1>
    <div class="role-content" v-if="role === 'admin'">
      <p class="role-description">
        As an Admin, you have full control over users and projects.
      </p>
      <ul class="role-actions">
        <li>Manage Users</li>
        <li>View All Projects</li>
        <li>Edit Project Details</li>
      </ul>
    </div>
    <div class="role-content" v-else-if="role === 'project_manager'">
      <p class="role-description">
        As a Project Manager, you can view and edit your assigned projects.
      </p>
      <ul class="role-actions">
        <li>View Assigned Projects</li>
        <li>Edit Project Information</li>
        <li>Access User List</li>
      </ul>
    </div>
    <div class="role-content" v-else>
      <p class="role-description">
        As an Engineer, you can view your assigned projects only.
      </p>
      <ul class="role-actions">
        <li>View Your Projects</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    role() {
      return localStorage.getItem('role');
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.welcome-title {
  font-size: 2rem;
  color: #35424a;
  margin-bottom: 20px;
}

.role-content {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.role-description {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #555;
}

.role-actions {
  list-style-type: none;
  padding: 0;
}

.role-actions li {
  padding: 5px 0;
  color: #35424a;
  font-size: 1rem;
}
</style>