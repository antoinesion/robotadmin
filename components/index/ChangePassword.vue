<template>
  <form @submit.prevent="changePassword">
    <h1>Change password</h1>
    <p :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage }}{{ successMessage }}
    </p>
    <input
      v-model="username"
      type="text"
      autocomplete="username"
      name="username"
      style="display: none"
    />
    <input
      ref="currentPassword"
      v-model="form.currentPassword"
      type="password"
      autocomplete="current-password"
      placeholder="Current password"
    />
    <input
      ref="newPassword"
      v-model="form.newPassword"
      type="password"
      autocomplete="new-password"
      placeholder="New password"
    />
    <input
      ref="confirmNewPassword"
      v-model="form.confirmNewPassword"
      type="password"
      autocomplete="new-password"
      placeholder="Confirm new password"
    />
    <button type="button" @click="hideChangePassword()">Back</button>
    <input type="submit" value="Change password" />
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      username: this.$auth.user.username,
      form: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    hideChangePassword: function () {
      this.$store.commit('settings/showChangePassword', false);
      setTimeout(() => {
        this.resetForm();
      }, 500);
    },
    changePassword: function () {
      this.$post('/api/auth/change-password', this.form)
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
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
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

  input[type='password'] {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    margin: $basic-margin 0;
    background-color: $white;
    border: 2px solid $lightgray;
    padding: $basic-padding;
    font-family: $font-family;
    font-size: $basic-font-size;

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
    border-radius: $basic-border-radius;
    color: $white;
    font-size: $basic-font-size;
    padding: $basic-padding;
    margin-bottom: $basic-margin;
    text-align: center;
    cursor: pointer;
    opacity: $no-hover-opacity;

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
