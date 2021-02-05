<template>
  <form @submit.prevent="addEmployee">
    <h1>Add employee</h1>
    <p :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage }}{{ successMessage }}
    </p>
    <input
      ref="firstName"
      v-model="form.firstName"
      type="text"
      autocomplete="given-name"
      placeholder="First name"
    />
    <input
      ref="lastName"
      v-model="form.lastName"
      type="text"
      autocomplete="family-name"
      placeholder="Last name"
    />
    <input
      ref="email"
      v-model="form.email"
      type="text"
      autocomplete="email"
      placeholder="Email"
    />
    <input ref="id" v-model="form.id" type="text" placeholder="ID" />
    <button type="button" @click="hideAddEmployee()">Back</button>
    <input type="submit" value="Register" />
  </form>
</template>

<script>
export default {
  name: 'AddEmployee',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        id: null,
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    hideAddEmployee: function () {
      this.$get('/api/employees/fetch').then((res) => {
        this.$store.commit('employees/setEmployees', res.data);
      });
      this.$store.commit('employees/changeEmployeeMenu', 'list');
      setTimeout(() => {
        this.resetForm();
      }, 500);
    },
    addEmployee: function () {
      this.$post('/api/employees/register', this.form)
        .then((res) => {
          this.resetForm();
          this.successMessage = res.data;
        })
        .catch((err) => {
          this.successMessage = '';
          this.updateErrorsDisplay(err.response.data.path);
          this.errorMessage = err.response.data.message;
        });
    },
    updateErrorsDisplay: function (path) {
      for (const [key, el] of Object.entries(this.$refs)) {
        if (path.includes(key)) {
          el.classList.add('error');
        } else {
          el.classList.remove('error');
        }
      }
    },
    resetForm: function () {
      this.errorMessage = '';
      this.successMessage = '';
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        id: null,
      };
      this.updateErrorsDisplay([]);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  transform: translateX(-100%);

  h1 {
    margin-bottom: $basic-margin;
  }

  p {
    opacity: 0;
    width: 100%;
    border-radius: 0.3rem;
    font-size: 0.8rem;
    text-align: center;
    overflow: hidden;
    max-height: 0;
    transition-property: max-height, padding, margin, opacity;
    transition-duration: 0.1s;
    transition-delay: 0s, 0s, 0s, 0.1s;
    transition-timing-function: ease-in-out;

    &.error {
      background-color: rgba(255, 0, 0, 0.2);
      color: red;
      max-height: 100px;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 2px solid red;
      opacity: 1;
    }

    &.success {
      background-color: rgba(0, 255, 0, 0.2);
      color: green;
      max-height: 100px;
      padding: 0.5rem;
      margin: 0.5rem 0;
      border: 2px solid green;
      opacity: 1;
    }
  }

  input[type='text'] {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    margin: 0.5rem 0;
    background-color: $white;
    border: 2px solid $lightgray;
    padding: 0.5rem;
    font-family: $font-family;
    font-size: 0.8rem;

    &:focus {
      border-color: $darkgray;
    }

    &.error {
      border-color: red;
    }
  }

  button,
  input[type='submit'] {
    all: unset;
    border-radius: 0.3rem;
    color: $white;
    font-size: 0.8rem;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
    cursor: pointer;
    opacity: 0.9;

    &:hover {
      opacity: 1;
    }
  }

  button {
    margin-top: 0.5rem;
    background-color: $lightgray;
  }

  input[type='submit'] {
    background-color: $darkgray;
  }
}
</style>
