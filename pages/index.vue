<template>
  <div class="container">
    <div class="side-container">
      <MenuSelector />
      <MenuContainer v-if="selectedMenu" />
    </div>
  </div>
</template>

<script>
import MenuSelector from '../components/index/MenuSelector';
import MenuContainer from '../components/index/MenuContainer';

export default {
  components: {
    MenuSelector,
    MenuContainer,
  },
  middleware: 'auth',
  computed: {
    selectedMenu: function () {
      return this.$store.state.menu.selectedMenu;
    },
  },
  created() {
    this.$get('/api/logs/fetch').then((res) => {
      this.$store.commit('logs/setLogs', res.data);
    });
  },
};
</script>

<style lang="scss">
.container {
  position: fixed;
  width: 100%;
  height: 100%;

  .side-container {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;

    > div {
      width: $menu-selector-width;
      border-radius: $widget-border-radius;
      box-shadow: $widget-box-shadow;
      margin: 1rem 1rem 0 0;
    }
  }
}
</style>
