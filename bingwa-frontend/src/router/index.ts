import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import CustomersView from '../views/Customers.vue';
import ProjectsView from '../views/Projects.vue';
import LoginView from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView, 
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/customers',
    name: 'Customers',
    component: CustomersView,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsView,
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory((import.meta as any).env.VITE_BASE_URL),
  routes,
});

// Navigation guard to check authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('role');

  if (!isAuthenticated && to.name !== 'Login') {
    next({ name: 'Login' });
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;