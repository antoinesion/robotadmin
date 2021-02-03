<template>
  <form @submit.prevent="addAdminUser">
    <p :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage }}{{ successMessage }}
    </p>
    <input
      ref="username"
      v-model="form.username"
      type="text"
      autocomplete="username"
      placeholder="Username"
    />
    <input
      ref="password"
      v-model="form.password"
      type="password"
      autocomplete="new-password"
      placeholder="Password"
    />
    <input
      ref="confirmPassword"
      v-model="form.confirmPassword"
      type="password"
      autocomplete="new-password"
      placeholder="Confirm password"
    />
    <label>
      <div>
        <img src="../../assets/icons/super-admin.svg" />
        <span>Super admin </span>
      </div>
      <input
        id="isSuperAdminCheckbox"
        v-model="form.isSuperAdmin"
        type="checkbox"
      />
    </label>
    <button type="button" @click="hideAddAdminUser()">Abort</button>
    <input type="submit" value="Register" />
  </form>
</template>

<script>
export default {
  name: 'AddAdminUser',
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        isSuperAdmin: false,
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    hideAddAdminUser: function () {
      this.$get('/api/admin-users/fetch').then((res) => {
        this.$store.commit('adminUsers/setAdminUsers', res.data);
      });
      this.$store.commit('adminUsers/showAddAdminUser', false);
      setTimeout(() => {
        this.resetForm();
      }, 500);
    },
    addAdminUser: function () {
      this.$post('/api/admin-users/register', this.form)
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
        username: '',
        password: '',
        confirmPassword: '',
        isSuperAdmin: false,
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

  input[type='text'],
  input[type='password'] {
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

  label {
    user-select: none;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: $basic-margin 0;

    div {
      height: 100%;
      display: flex;
      align-items: center;

      *:nth-child(1) {
        margin-right: 0.3rem;
      }

      span {
        line-height: 1rem;
        font-size: $basic-font-size;
      }

      img {
        height: 100%;
        width: auto;
      }
    }

    input[type='checkbox'] {
      all: unset;
      box-sizing: border-box;
      height: 100%;
      width: 1rem;
      border: 1px solid $lightgray;

      &:checked {
        border-color: $darkgray;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 75%;
        background-image: url('../../assets/icons/checked.svg');
        background-color: $darkgray;
      }
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
