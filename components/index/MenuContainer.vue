<template>
  <div class="menu-container">
    <Settings v-if="selectedMenu == 'settings'" />
    <AdminUsers v-if="selectedMenu == 'admin-users'" />
  </div>
</template>

<script>
import Settings from './Settings';
import AdminUsers from './AdminUsers';

export default {
  name: 'MenuContainer',
  components: {
    Settings,
    AdminUsers,
  },
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
