<template>
  <div class="settings">
    <SettingsActions :class="{ show: !showChangePassword }" />
    <ChangePassword :class="{ show: showChangePassword }" />
  </div>
</template>

<script>
export default {
  name: 'Settings',
  computed: {
    showChangePassword: function () {
      return this.$store.state.settings.showChangePassword;
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  display: flex;

  > * {
    width: 100%;
    flex-shrink: 0;

    max-height: 0;
    opacity: 0;
    pointer-events: none;
    transition-property: max-height, opacity;
    transition-duration: 0.5s, 0.1s;
    transition-delay: 0s, 0s;
    transition-timing-function: ease-in-out;

    &.show {
      transition-delay: 0s, 0.4s;
      max-height: 350px;
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
