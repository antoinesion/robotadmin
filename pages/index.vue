<template>
  <div></div>
</template>

<script>
export default {
  middleware: 'auth',
  created() {
    this.$auth.logout();
  },
};
</script>

<style></style>
