<template>
  <div class="login-container">
    <div class="login-form">
      <div class="text-center mb-4">
        <h2 class="fw-bold">Login to Sahihi</h2>
        <p class="text-muted">Welcome back! Please enter your credentials.</p>
      </div>
      <form @submit.prevent="login" class="needs-validation" novalidate>
        <div class="form-floating mb-3">
          <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="email" required>
          <label for="email">Email address</label>
        </div>
        <div class="form-floating mb-4">
          <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" required>
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
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('Logging in with email:', this.email, 'and password:', this.password);
    },
  },
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