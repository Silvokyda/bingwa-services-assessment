<template>
  <div class="home-container">
    <div class="content-wrapper">
      <h1 class="welcome-title">
        Welcome, <span class="role-highlight">{{ role }}</span>
      </h1>

      <div class="role-content" :class="roleClass">
        <div class="role-icon">
          <i :class="roleIcon"></i>
        </div>

        <p class="role-description">
          <span v-if="role === 'ADMIN'">
            As an Admin, you have full control over users and projects.
          </span>
          <span v-else-if="role === 'MANAGER'">
            As a Project Manager, you can view and edit your assigned projects.
          </span>
          <span v-else>
            As an Engineer, you can view your assigned projects only.
          </span>
        </p>

        <ul class="role-actions">
          <li v-if="role === 'ADMIN'" @click="activeComponent = 'UserManagement'">
            <i class="fas fa-users"></i> Manage Users
          </li>
          <li v-if="role === 'ADMIN'" @click="activeComponent = 'AllProjects'">
            <i class="fas fa-project-diagram"></i> View All Projects
          </li>
          <li v-if="role === 'MANAGER'" @click="activeComponent = 'AssignedProjects'">
            <i class="fas fa-tasks"></i> View Assigned Projects
          </li>
          <li v-if="role === 'MANAGER'" @click="activeComponent = 'UserList'">
            <i class="fas fa-users"></i> Access User List
          </li>
          <li v-if="role === 'ENGINEER'" @click="activeComponent = 'EngineerProjects'">
            <i class="fas fa-laptop-code"></i> View Your Projects
          </li>
        </ul>
      </div>

      <!-- Dynamic Component Section -->
      <div v-if="activeComponent" class="component-container">
        <button class="close-btn" @click="activeComponent = null">
          <i class="fas fa-times"></i>
        </button>
        <component :is="activeComponent"></component>
      </div>
    </div>
  </div>
</template>

<script>
import UserManagement from '../components/UserManagement.vue';
import AllProjects from '../components/AllProjects.vue';
import AssignedProjects from '../components/AssignedProjects.vue';
import UserList from '../components/UserList.vue';
import EngineerProjects from '../components/EngineerProjects.vue';

export default {
  components: {
    UserManagement,
    AllProjects,
    AssignedProjects,
    UserList,
    EngineerProjects
  },
  data() {
    return {
      role: 'ENGINEER',
      activeComponent: null
    };
  },
  computed: {
    roleClass() {
      return `role-${this.role.toLowerCase()}`;
    },
    roleIcon() {
      const icons = {
        ADMIN: 'fas fa-user-shield',
        MANAGER: 'fas fa-user-tie',
        ENGINEER: 'fas fa-user-cog'
      };
      return icons[this.role] || 'fas fa-user';
    }
  },
  created() {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      this.role = storedRole.toUpperCase();
    }
  }
};
</script>

<style scoped>
.home-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  padding: 20px;
  overflow: hidden;
  /* Prevent scrolling */
}

.content-wrapper {
  max-width: 600px;
  width: 100%;
  text-align: center;
  max-height: 100%;
  overflow-y: auto;
}

.welcome-title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #2d3748;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.role-highlight {
  color: #9ECC3D;
  font-weight: 800;
}

.role-content {
  background: white;
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.role-content:hover {
  transform: translateY(-5px);
}

.role-icon {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
  color: #9ECC3D;
}

.role-description {
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.role-actions {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.role-actions li {
  padding: 0.75rem;
  color: #2d3748;
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  background: #f7fafc;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.role-actions li:hover {
  background: #edf2f7;
  transform: translateX(5px);
}

.role-actions i {
  color: #9ECC3D;
}

/* Role-specific styles */
.role-admin {
  border-top: 4px solid #9ECC3D;
}

.role-manager {
  border-top: 4px solid #48bb78;
}

.role-engineer {
  border-top: 4px solid #ed8936;
}

@media (max-width: 640px) {
  .home-container {
    padding: 10px;
  }

  .role-content {
    padding: 1rem;
  }

  .role-actions li {
    padding: 0.5rem;
  }
}

.component-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  height: 80vh;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  z-index: 1000;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2d3748;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.close-btn:hover {
  background-color: #f7fafc;
}

/* Add backdrop when component is active */
.home-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.home-container:has(.component-container)::before {
  opacity: 1;
  pointer-events: auto;
}
</style>