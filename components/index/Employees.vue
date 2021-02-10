<template>
  <div class="employees">
    <EmployeesList :class="{ show: employeeActualMenu == 'list' }" />
    <AddEmployee :class="{ show: employeeActualMenu == 'add' }" />
    <ModifyEmployee :class="{ show: employeeActualMenu == 'modify' }" />
  </div>
</template>

<script>
export default {
  name: 'Employees',
  computed: {
    employeeActualMenu: function () {
      return this.$store.state.employees.employeeActualMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.employees {
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
