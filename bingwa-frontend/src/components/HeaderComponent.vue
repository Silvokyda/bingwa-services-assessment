<template>
  <header>
    <div class="header-container">
      <div class="logo">
        <img src="https://www.sahihi.co.ke/_ipx/f_webp/images/logo.png" alt="Sahihi Interior Builders" />
      </div>
      
      <!-- Hamburger Menu Button -->
      <button class="menu-toggle" @click="toggleMenu" :class="{ 'active': isMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Menu -->
      <nav :class="{ 'active': isMenuOpen }">
        <ul>
          <li><a href="https://www.sahihi.co.ke" @click="closeMenu">Home</a></li>
          <li><a href="https://www.sahihi.co.ke/services" @click="closeMenu">Services</a></li>
          <li><a href="https://www.sahihi.co.ke/portfolio" @click="closeMenu">Portfolio</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    }
  }
};
</script>

<style scoped>
header {
  background-color: #ffffff;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1000;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo img {
  height: 40px;
}

nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav li {
  margin-left: 1.5rem;
}

nav a {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

nav a:hover {
  color: #9ECC3D;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.menu-toggle span {
  width: 30px;
  height: 3px;
  background: #000;
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  nav {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  nav.active {
    display: block;
  }

  nav ul {
    flex-direction: column;
    align-items: center;
  }

  nav li {
    margin: 1rem 0;
  }

  /* Hamburger Menu Animation */
  .menu-toggle.active span:first-child {
    transform: rotate(45deg);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: rotate(-45deg);
  }
}

/* Additional responsive adjustments */
@media (max-width: 480px) {
  .logo img {
    height: 30px;
  }

  header {
    padding: 0.8rem;
  }
}
</style>