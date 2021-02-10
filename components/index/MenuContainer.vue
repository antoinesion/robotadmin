<template>
  <div class="menu-container">
    <Logs v-if="selectedMenu == 'logs'" />
    <Employees v-if="selectedMenu == 'employees'" />
    <AdminUsers v-if="selectedMenu == 'admin-users'" />
    <Settings v-if="selectedMenu == 'settings'" />
  </div>
</template>

<script>
export default {
  name: 'MenuContainer',
  computed: {
    selectedMenu: function () {
      return this.$store.state.menu.selectedMenu;
    },
  },
};
</script>
<style lang="scss" scoped>
.menu-container > div {
  background-color: $white;
  border-radius: $widget-border-radius;
  box-shadow: $widget-box-shadow;
  padding: 1rem;
  width: 100%;
}
</style>
