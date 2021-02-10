<template>
  <div>
    <div class="actions">
      <h1>Admin users</h1>
      <div>
        <button id="add" @click="showAddAdminUser"></button>
        <button id="refresh" @click="fetchAdminUsers"></button>
      </div>
    </div>
    <ul>
      <li
        v-for="user in adminUsers"
        :key="user._id"
        :class="{ self: user._id == $auth.user._id }"
      >
        <span>{{ user.username }}</span>
        <button
          title="Toggle admin user scope"
          :class="{ super: user.isSuperAdmin }"
          @click="modifyAdminUserScope(user._id, !user.isSuperAdmin)"
        ></button>
        <button
          title="Delete admin user"
          @click="deleteAdminUser(user._id)"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AdminUsersList',
  computed: {
    adminUsers: function () {
      return this.$store.state.adminUsers.adminUsers;
    },
  },
  created() {
    this.fetchAdminUsers();
  },
  methods: {
    fetchAdminUsers: function () {
      this.$get('/api/admin-users/fetch').then((res) => {
        this.$store.commit('adminUsers/setAdminUsers', res.data);
      });
    },
    showAddAdminUser: function () {
      this.$store.commit('adminUsers/showAddAdminUser', true);
    },
    modifyAdminUserScope: function (_id, isSuperAdmin) {
      this.$put('/api/admin-users/modify', { _id, isSuperAdmin }).then(() => {
        this.fetchAdminUsers();
      });
    },
    deleteAdminUser: function (_id) {
      this.$del('/api/admin-users/delete', { _id }).then(() => {
        this.fetchAdminUsers();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  button {
    all: unset;
    border-radius: $basic-border-radius;
    opacity: $no-hover-opacity;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }

  .actions {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: $basic-margin;

    h1 {
      margin-bottom: $basic-margin;
    }

    div {
      display: flex;
      margin-bottom: $basic-margin;

      button {
        height: 1.8rem;
        width: 1.8rem;

        &:nth-child(1) {
          margin-right: 0.2rem;
        }

        &#add {
          background: no-repeat center/60% url('../../assets/icons/add.svg'),
            $darkgray;
        }

        &#refresh {
          background: no-repeat center/60% url('../../assets/icons/refresh.svg'),
            $darkgray;
        }
      }
    }
  }

  ul {
    list-style-type: none;
    height: $basic-list-height;
    overflow-y: scroll;
    width: 100%;
    border: 1px solid $lightgray;

    li {
      display: flex;
      justify-content: space-around;
      padding: 0.5rem 0;

      &:nth-child(even) {
        background-color: #e6e6e6;
      }

      &:nth-child(odd) {
        background-color: #ededed;
      }

      span {
        width: 70%;
        line-height: 1.3rem;
        font-size: $basic-font-size;
      }

      button {
        width: 1.3rem;
        height: 1.3rem;

        &:nth-child(2) {
          opacity: 0.3;
          background: no-repeat center/70%
            url('../../assets/icons/super-admin.svg');

          &.super {
            opacity: 1;
          }
        }

        &:nth-child(3) {
          background: no-repeat center/55% url('../../assets/icons/delete.svg'),
            $darkgray;
        }
      }

      &.self {
        background-color: $darkgray;

        span {
          color: $white;
        }

        button {
          pointer-events: none;

          &:nth-child(2) {
            background: no-repeat center/70%
              url('../../assets/icons/super-admin-self.svg');
          }

          &:nth-child(3) {
            background: none;
          }
        }
      }
    }
  }
}
</style>
