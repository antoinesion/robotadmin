<template>
  <div class="container">
    <img :src="require('../assets/img/map.png')" />
    <div class="side-container">
      <MenuSelector />
      <MenuContainer v-if="selectedMenu" />
    </div>
  </div>
</template>

<script>
import MenuSelector from '../components/index/MenuSelector';
import MenuContainer from '../components/index/MenuContainer';
const io = require('socket.io-client');

export default {
  components: {
    MenuSelector,
    MenuContainer,
  },
  middleware: 'auth',
  head() {
    return {
      title: "Secu'Bot - Administration",
    };
  },
  computed: {
    selectedMenu: function () {
      return this.$store.state.menu.selectedMenu;
    },
  },
  created() {
    const socket = io();
    socket.on('log', (log) => {
      this.$store.commit('logs/newLog', log);
    });
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

  > img {
    position: absolute;
    top: 0;
    left: 20%;
    height: 100%;
    width: auto;
  }

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
