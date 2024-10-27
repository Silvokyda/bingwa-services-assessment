<template>
  <div class="login-container">
    <div class="login-form">
      <div class="text-center mb-4">
        <h2 class="fw-bold">Login to Sahihi</h2>
        <p class="text-muted">Welcome back! Please enter your credentials.</p>
      </div>
      
      <!-- Show error message when it's present -->
      <div v-if="errorMessage" class="alert alert-danger text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login" class="needs-validation" novalidate>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            v-model="email"
            required
          />
          <label for="email">Email address</label>
        </div>
        <div class="form-floating mb-4">
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="password"
            required
          />
          <label for="password">Password</label>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </div>
        <div class="text-center mt-4">
          <a href="#" class="text-muted text-decoration-none">Forgot password?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '', 
    };
  },
  methods: {
  async login() {
    this.errorMessage = ''; 
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        email: this.email,
        password: this.password,
      });

      if (response.data && response.data.data.accessToken) {
        const userRole = response.data.data.user.role; 
        localStorage.setItem('authToken', response.data.data.accessToken);
        localStorage.setItem('role', userRole);
        
        console.log('Login successful. Token:', response.data.data.accessToken);
        console.log('Role:', userRole); 
        
        // Redirect to Home
        this.$router.push({ name: 'Home' });
      } else if (response.data.data === null) {
        this.errorMessage = response.data.message || 'Invalid credentials';
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      this.errorMessage = error.response?.data?.message || 'Login failed';
    }
  },
}

};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  flex: 1;
}

.login-form {
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.btn-primary {
  background-color: #9ECC3D;
  border-color: #9ECC3D;
  color: #000;
  font-weight: 600;
  padding: 0.8rem;
}

.btn-primary:hover {
  background-color: #79b320;
  border-color: #79b320;
  color: #000;
}

.form-control:focus {
  border-color: #9ECC3D;
  box-shadow: 0 0 0 0.25rem rgba(158, 204, 61, 0.25);
}

.form-floating label {
  color: #6c757d;
}
</style>
