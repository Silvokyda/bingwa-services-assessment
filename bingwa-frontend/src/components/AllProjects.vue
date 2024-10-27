<template>
  <div class="projects-container">
    <h2>All Projects</h2>
    <div class="controls">
      <button v-if="isAdmin" class="primary-btn" @click="showAddProjectModal">
        <i class="fas fa-plus"></i> New Project
      </button>
      <div class="search-filter">
        <input type="text" v-model="searchQuery" placeholder="Search projects...">
        <select v-model="statusFilter">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <div class="projects-grid">
      <div v-for="project in filteredProjects" :key="project.id" class="project-card">
        <div class="project-header">
          <h3>{{ project.name }}</h3>
          <span :class="['status-badge', project.status]">{{ project.status }}</span>
        </div>
        <p class="project-description">{{ project.description }}</p>
        <div class="project-meta">
          <span><i class="fas fa-users"></i> {{ project.teamSize }} members</span>
          <span><i class="fas fa-calendar"></i> {{ project.deadline }}</span>
          <span><i class="fas fa-user-tie"></i> {{ project.manager }}</span>
        </div>
        <div class="project-team">
          <span><strong>Engineers:</strong> {{ project.engineers.join(', ') }}</span>
        </div>
        <div class="project-actions">
          <button v-if="canEditProject(project)" class="action-btn" @click="editProject(project)">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button class="action-btn" @click="viewDetails(project)">
            <i class="fas fa-eye"></i> View
          </button>
          <button v-if="isAdmin" class="action-btn delete" @click="deleteProject(project)">
            <i class="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Project Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="main-modal">
        <div class="modal-header">
          <h3>{{ editingProject ? 'Edit Project' : 'New Project' }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveProject">
            <div class="form-group">
              <label>Project Name</label>
              <input type="text" v-model="currentProject.name" required>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="currentProject.description" required></textarea>
            </div>
            <div class="form-group">
              <label>Status</label>
              <select v-model="currentProject.status" required>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div class="form-group">
              <label>Deadline</label>
              <input type="date" v-model="currentProject.deadline" required>
            </div>
            <div class="form-group">
              <label>Team Size</label>
              <input type="number" v-model="currentProject.teamSize" required min="1">
            </div>
            <div class="modal-footer">
              <button type="button" class="secondary-btn" @click="closeModal">Cancel</button>
              <button type="submit" class="primary-btn">
                {{ editingProject ? 'Update Project' : 'Create Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      searchQuery: '',
      statusFilter: '',
      showModal: false,
      editingProject: null,
      currentProject: {
        name: '',
        description: '',
        status: 'active',
        teamSize: 1,
        deadline: '',
        manager: '',
        engineers: []
      },
      projects: [
        {
          id: 1,
          name: 'Project Alpha',
          description: 'A cutting-edge web application for data analysis',
          status: 'active',
          teamSize: 5,
          deadline: '2024-12-31',
          manager: 'John Doe',
          engineers: ['Alice Smith', 'Bob Johnson']
        },
        {
          id: 2,
          name: 'Project Beta',
          description: 'Mobile app development for client tracking',
          status: 'pending',
          teamSize: 3,
          deadline: '2024-11-15',
          manager: 'Jane Smith',
          engineers: ['Charlie Brown', 'David Wilson']
        }
      ]
    }
  },
  computed: {
    isAdmin() {
      return localStorage.getItem('role') === 'ADMIN';
    },
    userRole() {
      return localStorage.getItem('role');
    },
    userName() {
      return localStorage.getItem('userName') || '';
    },
    filteredProjects() {
      return this.projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = !this.statusFilter || project.status === this.statusFilter;
        return matchesSearch && matchesStatus;
      });
    }
  },
  methods: {
    canEditProject(project) {
      if (this.isAdmin) return true;
      return this.userRole === 'ENGINEER' && project.engineers.includes(this.userName);
    },
    showAddProjectModal() {
      this.editingProject = null;
      this.currentProject = {
        name: '',
        description: '',
        status: 'active',
        teamSize: 1,
        deadline: '',
        manager: '',
        engineers: []
      };
      this.showModal = true;
    },
    editProject(project) {
      this.editingProject = project;
      this.currentProject = { ...project };
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingProject = null;
    },
    saveProject() {
      if (this.editingProject) {
        const index = this.projects.findIndex(p => p.id === this.editingProject.id);
        this.projects[index] = { ...this.currentProject };
      } else {
        const newProject = {
          ...this.currentProject,
          id: this.projects.length + 1
        };
        this.projects.push(newProject);
      }
      this.closeModal();
    },
    viewDetails(project) {
      // Implementation for viewing project details
      console.log('Viewing project:', project);
    },
    deleteProject(project) {
      if (confirm('Are you sure you want to delete this project?')) {
        this.projects = this.projects.filter(p => p.id !== project.id);
      }
    }
  }
}
</script>

<style scoped>
.projects-container {
  padding: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.search-filter {
  display: flex;
  gap: 1rem;
}

.primary-btn {
  padding: 0.5rem 1rem;
  background-color: #9ECC3D;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
}

.status-badge.active {
  background-color: #9ECC3D;
  color: white;
}

.status-badge.completed {
  background-color: #48bb78;
  color: white;
}

.status-badge.pending {
  background-color: #ed8936;
  color: white;
}

.project-description {
  color: #4a5568;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  gap: 1rem;
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #9ECC3D;
  background: transparent;
  color: #9ECC3D;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #9ECC3D;
  color: white;
}

input,
select {
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.main-modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
}

.modal-footer {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.project-team {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #4a5568;
}

.action-btn.delete {
  border-color: #e53e3e;
  color: #e53e3e;
}

.action-btn.delete:hover {
  background: #e53e3e;
  color: white;
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
