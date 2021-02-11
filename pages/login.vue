<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/login/LoginForm';

export default {
  components: {
    LoginForm,
  },
  head() {
    return {
      title: "Secu'Bot - Identification",
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.replace({ name: 'index' });
    }
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
