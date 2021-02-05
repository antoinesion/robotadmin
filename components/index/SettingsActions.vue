<template>
  <div>
    <h1>Settings</h1>
    <button @click="showChangePassword()">Change password</button>
    <button @click="logout()">Log out</button>
  </div>
</template>

<script>
export default {
  name: 'SettingsActions',
  methods: {
    logout: function () {
      this.$auth.logout().then(this.$router.replace({ name: 'login' }));
    },
    showChangePassword: function () {
      this.$store.commit('settings/showChangePassword', true);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: $basic-margin;
  }

  button {
    all: unset;
    background-color: $darkgray;
    border-radius: 0.3rem;
    color: $white;
    font-size: 0.8rem;
    padding: 0.5rem;
    margin: $basic-margin 0;
    text-align: center;
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
