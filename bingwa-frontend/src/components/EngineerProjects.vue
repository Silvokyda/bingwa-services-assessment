<template>
  <div class="projects-container">
    <h2>Assigned Projects</h2>
    <div class="controls">
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
          <span><i class="fas fa-calendar"></i> {{ formatDate(project.deadline) }}</span>
          <span><i class="fas fa-flag"></i> {{ project.priority }}</span>
        </div>
        <div class="progress-section">
          <div class="progress-label">
            <span>Progress</span>
            <span>{{ project.progress }}%</span>
          </div>
          <div class="progress-bar">
            <div :style="{ width: project.progress + '%' }" class="progress-fill"></div>
          </div>
        </div>
        <div class="project-team">
          <div class="team-members">
            <strong>Team:</strong>
            <div class="member-avatars">
              <div v-for="member in project.team" :key="member.id" class="member-avatar">
                <img :src="member.avatar" :alt="member.name" :title="member.name">
              </div>
            </div>
          </div>
        </div>
        <div class="project-actions">
          <button class="action-btn" @click="viewDetails(project)">
            <i class="fas fa-eye"></i> View
          </button>
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
      currentProject: null,
      projects: [
        {
          id: 1,
          name: 'Project Alpha',
          description: 'A cutting-edge web application for data analysis',
          status: 'active',
          teamSize: 5,
          deadline: '2024-12-31',
          progress: 75,
          priority: 'high',
          team: [
            { id: 1, name: 'John Doe', avatar: 'path/to/avatar1' },
            { id: 2, name: 'Jane Smith', avatar: 'path/to/avatar2' },
          ]
        },
        {
          id: 2,
          name: 'Project Beta',
          description: 'Mobile app development for client tracking',
          status: 'pending',
          teamSize: 3,
          deadline: '2024-11-15',
          progress: 30,
          priority: 'medium',
          team: [
            { id: 3, name: 'Alice Brown', avatar: 'path/to/avatar3' },
            { id: 4, name: 'Bob Wilson', avatar: 'path/to/avatar4' },
          ]
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesStatus = !this.statusFilter || project.status === this.statusFilter;
        return matchesSearch && matchesStatus;
      });
    }
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    closeModal() {
      this.showModal = false;
      this.currentProject = null;
    },
    saveProject() {
      const index = this.projects.findIndex(p => p.id === this.currentProject.id);
      if (index !== -1) {
        this.projects[index] = { ...this.currentProject };
      }
      this.closeModal();
    },
    viewDetails(project) {
      // Implementation for viewing project details
      console.log('Viewing project:', project);
    },
    async fetchAssignedProjects() {
      try {
        // Implement API call to fetch assigned projects
        // const response = await fetch('/api/assigned-projects');
        // this.projects = await response.json();
      } catch (error) {
        console.error('Error fetching assigned projects:', error);
      }
    }
  },
  created() {
    this.fetchAssignedProjects();
  }
}
</script>

<style scoped>
.projects-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: #2d3748;
  margin-bottom: 1.5rem;
}

.controls {
  margin-bottom: 2rem;
}

.search-filter {
  display: flex;
  gap: 1rem;
}

.search-filter input,
.search-filter select {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.search-filter input {
  flex: 1;
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

.project-header h3 {
  margin: 0;
  color: #2d3748;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.active {
  background: #9AE6B4;
  color: #22543D;
}

.status-badge.completed {
  background: #B2F5EA;
  color: #234E52;
}

.status-badge.pending {
  background: #FED7D7;
  color: #822727;
}

.project-description {
  color: #4A5568;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  line-height: 1.5;
}

.project-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #718096;
}

.project-meta i {
  margin-right: 0.25rem;
}

.progress-section {
  margin: 1rem 0;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  color: #4A5568;
}

.progress-bar {
  height: 8px;
  background: #EDF2F7;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #9ECC3D;
  transition: width 0.3s ease;
}

.project-team {
  margin: 1rem 0;
}

.team-members {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.member-avatars {
  display: flex;
  margin-left: 0.5rem;
}

.member-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: -0.5rem;
  border: 2px solid white;
}

.member-avatar:first-child {
  margin-left: 0;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #EDF2F7;
  color: #4A5568;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #E2E8F0;
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
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #E2E8F0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  color: #2D3748;
}

.close-btn {
  background: none;
  border: none;
  color: #718096;
  cursor: pointer;
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4A5568;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #E2E8F0;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.primary-btn,
.secondary-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.primary-btn {
  background: #9ECC3D;
  color: white;
  border: none;
}

.secondary-btn {
  background: white;
  border: 1px solid #E2E8F0;
  color: #4A5568;
}

.primary-btn:hover {
  background: #8bba2c;
}

.secondary-btn:hover {
  background: #F7FAFC;
}

@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;
  }
  
  .search-filter {
    flex-direction: column;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .main-modal {
    width: 95%;
    margin: 1rem;
  }
}
</style>