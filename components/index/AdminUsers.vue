<template>
  <div class="admin-users">
    <AdminUsersList :class="{ show: !showAddAdminUser }" />
    <AddAdminUser :class="{ show: showAddAdminUser }" />
  </div>
</template>

<script>
import AdminUsersList from './AdminUsersList';
import AddAdminUser from './AddAdminUser';

export default {
  name: 'AdminUsers',
  components: {
    AdminUsersList,
    AddAdminUser,
  },
  computed: {
    showAddAdminUser: function () {
      return this.$store.state.adminUsers.showAddAdminUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-users {
  display: flex;

  > * {
    width: 100%;
    flex-shrink: 0;

    max-height: 0;
    opacity: 0;
    pointer-events: none;
    transition-property: max-height, opacity;
    transition-duration: 0.5s, 0.1s;
    transition-delay: 0.2s, 0s;
    transition-timing-function: ease-in-out;

    &.show {
      transition-delay: 0s, 0.4s;
      max-height: 400px;
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
