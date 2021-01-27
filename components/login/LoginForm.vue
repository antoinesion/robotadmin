<template>
  <form @submit.prevent="login">
    <h1>Administration</h1>
    <p ref="errorMessage" class="error-message">&nbsp;</p>
    <input
      v-model="form.username"
      type="username"
      autocomplete="username"
      placeholder="Username"
    />
    <input
      v-model="form.password"
      type="password"
      autocomplete="current-password"
      placeholder="Password"
    />
    <input type="submit" value="" />
  </form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$auth
        .loginWith('local', {
          data: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .catch((err) => {
          this.$refs.errorMessage.innerHTML = err.response.data;
          this.$refs.errorMessage.classList.add('show');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: $login-width;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: $darkgray;
  border-radius: $widget-border-radius;
  box-shadow: $widget-box-shadow;

  h1 {
    color: $white;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .error-message {
    max-height: 0;
    opacity: 0;
    width: 100%;
    border-radius: 0.3rem;
    background-color: rgba(255, 0, 0, 0.2);
    margin: 0.5rem 0;
    color: red;
    font-size: 0.8rem;
    text-align: center;
    overflow: hidden;
    transition-property: max-height, padding, opacity;
    transition-duration: 0.1s;
    transition-delay: 0s, 0s, 0.1s;
    transition-timing-function: ease-in-out;

    &.show {
      max-height: 100px;
      padding: 0.5rem;
      border: 2px solid red;
      opacity: 1;
    }
  }

  input {
    all: unset;
    box-sizing: border-box;

    &[type='username'],
    &[type='password'] {
      width: 100%;
      margin: 0.5rem 0;
      background-color: $white;
      padding: 0.5rem;
      font-size: 1rem;
      font-family: $font-family;
    }

    &[type='submit'] {
      height: 2.5rem;
      width: 2.5rem;
      margin-top: 0.5rem;
      opacity: 0.8;
      background: no-repeat center/100%
        url('../../assets/icons/login-submit.svg');
      transition: transform 0.15s ease-in-out;

      &:hover {
        opacity: 1;
      }

      &:active {
        transform: translateX(10%);
      }
    }
  }
}
</style>
