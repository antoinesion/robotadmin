<template>
  <div>
    <button
      id="logs"
      :class="{ selected: selectedMenu == 'logs' }"
      title="Show logs"
      @click="onClick('logs')"
    ></button>
    <!-- <button
      id="control"
      :class="{ selected: selectedMenu == 'control' }"
      title="Control the robot"
      @click="onClick('control')"
    ></button> -->
    <button
      id="employees"
      :class="{ selected: selectedMenu == 'employees' }"
      title="Manage employees"
      @click="onClick('employees')"
    ></button>
    <button
      v-if="this.$auth.hasScope('super-admin')"
      id="admin-users"
      :class="{ selected: selectedMenu == 'admin-users' }"
      title="Manage administration users"
      @click="onClick('admin-users')"
    ></button>
    <button
      id="settings"
      :class="{ selected: selectedMenu == 'settings' }"
      title="Settings"
      @click="onClick('settings')"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'MenuSelector',
  computed: {
    selectedMenu: function () {
      return this.$store.state.menu.selectedMenu;
    },
  },
  created() {
    this.$store.commit('menu/selectMenu', null);
  },
  methods: {
    onClick: function (menu) {
      if (this.selectedMenu == menu) {
        this.$store.commit('menu/selectMenu', null);
      } else {
        this.$store.commit('menu/selectMenu', menu);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  height: $menu-selector-height;
  background-color: $darkgray;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  button {
    all: unset;
    width: $menu-selector-button-size;
    height: $menu-selector-button-size;
    margin: 0 0.4rem;
    opacity: 0.8;
    will-change: filter;

    &#logs {
      background: no-repeat center/100% url('../../assets/icons/logs.svg');

      &.selected:hover {
        background-image: url('../../assets/icons/quit.svg');
      }
    }

    &#control {
      background: no-repeat center/100% url('../../assets/icons/control.svg');

      &.selected:hover {
        background-image: url('../../assets/icons/quit.svg');
      }
    }

    &#employees {
      background: no-repeat center/100% url('../../assets/icons/employees.svg');

      &.selected:hover {
        background-image: url('../../assets/icons/quit.svg');
      }
    }

    &#admin-users {
      background: no-repeat center/100%
        url('../../assets/icons/admin-users.svg');

      &.selected:hover {
        background-image: url('../../assets/icons/quit.svg');
      }
    }

    &#settings {
      background: no-repeat center/100% url('../../assets/icons/settings.svg');

      &.selected:hover {
        background-image: url('../../assets/icons/quit.svg');
      }
    }

    &:hover {
      opacity: 1;
    }

    &.selected {
      opacity: 1;
      filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));

      &:hover {
        filter: none;
        transform: scale(0.8);
      }
    }
  }
}
</style>
