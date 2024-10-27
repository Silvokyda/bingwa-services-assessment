<template>
    <div class="project-edit">
      <h2>Edit Project</h2>
      <form @submit.prevent="saveProject" class="edit-form">
        <div class="form-group">
          <label>Project Name</label>
          <input type="text" v-model="project.name" required>
        </div>
  
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="project.description" rows="4" required></textarea>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" v-model="project.startDate" required>
          </div>
  
          <div class="form-group">
            <label>Deadline</label>
            <input type="date" v-model="project.deadline" required>
          </div>
        </div>
  
        <div class="form-row">
          <div class="form-group">
            <label>Status</label>
            <select v-model="project.status" required>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
  
          <div class="form-group">
            <label>Priority</label>
            <select v-model="project.priority" required>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
  
        <div class="form-group">
          <label>Team Members</label>
          <div class="team-members">
            <div v-for="member in project.team" :key="member.id" class="team-member">
              <img :src="member.avatar" :alt="member.name">
              <span>{{ member.name }}</span>
              <button type="button" @click="removeMember(member)" class="remove-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <button type="button" @click="addMember" class="add-member-btn">
              <i class="fas fa-plus"></i> Add Member
            </button>
          </div>
        </div>
  
        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
          <button type="submit" class="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        project: {
          name: 'Project Alpha',
          description: 'A cutting-edge web application for data analysis',
          startDate: '2024-01-01',
          deadline: '2024-12-31',
          status: 'active',
          priority: 'high',
          team: [
            { id: 1, name: 'John Doe', avatar: 'path/to/avatar1' },
            { id: 2, name: 'Jane Smith', avatar: 'path/to/avatar2' }
          ]
        }
      }
    },
    methods: {
      saveProject() {
        // Implementation
      },
      cancel() {
        // Implementation
      },
      addMember() {
        // Implementation
      },
      removeMember(member) {
        // Implementation
      }
    }
  }
  </script>
  
  <style scoped>
  .project-edit {
    padding: 1rem;
  }
  
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  label {
    font-weight: 600;
    color: #2d3748;
  }
  
  input, select, textarea {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  textarea {
    resize: vertical;
  }
  
  .team-members {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .team-member {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background: #f7fafc;
    border-radius: 4px;
  }
  
  .team-member img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #e53e3e;
    cursor: pointer;
  }
  
  .add-member-btn {
    padding: 0.5rem 1rem;
    background: #9ECC3D;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .save-btn, .cancel-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .save-btn {
    background: #9ECC3D;
    color: white;
    border: none;
  }
  
  .cancel-btn {
    background: white;
    border: 1px solid #e2e8f0;
  }
  
  .save-btn:hover {
    background: #8bba2c;
  }
  
  .cancel-btn:hover {
    background: #f7fafc;
  }
  </style>