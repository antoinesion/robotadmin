<template>
  <div class="menu-container">
    <Settings v-if="selectedMenu == 'settings'" />
    <Administrators v-if="selectedMenu == 'administrators'" />
  </div>
</template>

<script>
import Settings from './Settings';
import Administrators from './Administrators';

export default {
  name: 'MenuContainer',
  components: {
    Settings,
    Administrators,
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
