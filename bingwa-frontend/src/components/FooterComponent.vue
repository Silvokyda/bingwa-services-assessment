<template>
  <footer>
    <div class="footer-container">
      <div class="copyright">
        <p>&copy; 2024 Sahihi Interior Builders</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
footer {
  background-color: #9ECC3D;
  color: #000;
  padding: 1rem 0;
  width: 100%;
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.copyright p {
  margin: 0;
}
</style>