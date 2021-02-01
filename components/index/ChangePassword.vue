<template>
  <form @submit.prevent="changePassword">
    <p :class="{ error: errorMessage, success: successMessage }">
      {{ errorMessage }}{{ successMessage }}
    </p>
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
    <button type="button" @click="hideChangePassword()">Abort</button>
    <input type="submit" value="Change password" />
  </form>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    hideChangePassword: function () {
      this.successMessage = '';
      this.errorMessage = '';
      this.$store.commit('settings/setShowChangePassword', false);
    },
    changePassword: function () {
      this.$post('/api/auth/change-password', this.form)
        .then((res) => {
          this.errorMessage = '';
          this.updateErrorsDisplay([]);
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
      this.form = {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      };
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

  input[type='username'],
  input[type='password'] {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    margin: 0.5rem 0;
    background-color: $white;
    border: 2px solid $darkgray;
    padding: 0.5rem;
    font-family: $font-family;
    font-size: 0.8rem;

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
