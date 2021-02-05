<template>
  <div>
    <div class="actions">
      <h1>Employees</h1>
      <div>
        <button id="add" @click="showAddEmployee"></button>
        <button id="refresh" @click="fetchEmployees"></button>
      </div>
    </div>
    <ul>
      <li v-for="employee in employees" :key="employee._id">
        <span>{{ employee.firstName }}</span>
        <span>{{ employee.lastName }}</span>
        <span>{{ employee.id }}</span>
        <span>{{ employee.email }}</span>
        <button
          title="Modify employee"
          @click="modifyEmployee(employee)"
        ></button>
        <button
          title="Delete employee"
          @click="deleteEmployee(employee._id)"
        ></button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'EmployeesList',
  computed: {
    employees: function () {
      return this.$store.state.employees.employees;
    },
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    fetchEmployees: function () {
      this.$get('/api/employees/fetch').then((res) => {
        this.$store.commit('employees/setEmployees', res.data);
      });
    },
    showAddEmployee: function () {
      this.$store.commit('employees/changeEmployeeMenu', 'add');
    },
    modifyEmployee: function (employee) {
      this.$store.commit('employees/setEmployeeToModify', employee);
      this.$store.commit('employees/changeEmployeeMenu', 'modify');
    },
    deleteEmployee: function (_id) {
      this.$del('/api/employees/delete', { _id }).then(() => {
        this.fetchEmployees();
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
    height: 350px;
    overflow-y: scroll;
    width: 100%;
    border: 1px solid $lightgray;

    li {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;
      height: 3.5rem;

      &:nth-child(even) {
        background-color: #e6e6e6;
      }

      &:nth-child(odd) {
        background-color: #ededed;
      }

      span {
        line-height: 1.3rem;
        font-size: $basic-font-size;
        overflow: hidden;
        text-overflow: ellipsis;

        &:nth-child(1),
        &:nth-child(2) {
          width: 25%;
        }

        &:nth-child(3),
        &:nth-child(4) {
          width: 45%;
        }
      }

      button {
        width: 1.3rem;
        height: 1.3rem;

        &:nth-child(5) {
          background: no-repeat center/55% url('../../assets/icons/modify.svg'),
            $darkgray;
        }

        &:nth-child(6) {
          background: no-repeat center/55% url('../../assets/icons/delete.svg'),
            $darkgray;
        }
      }
    }
  }
}
</style>
