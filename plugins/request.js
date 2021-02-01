const axios = require('axios');

export default ({ app }, inject) => {
  // axios get request global method
  inject('get', async (url) => {
    if (app.$auth.loggedIn && app.$auth.strategy.token.status().expired()) {
      await app.$auth.refreshTokens();
    }
    return axios.get(
      url,
      app.$auth.loggedIn
        ? {
            headers: {
              Authorization: app.$auth.strategy.token.get(),
            },
          }
        : {}
    );
  });
  // axios post request global method
  inject('post', async (url, data = {}) => {
    if (app.$auth.loggedIn && app.$auth.strategy.token.status().expired()) {
      await app.$auth.refreshTokens();
    }
    return axios.post(
      url,
      data,
      app.$auth.loggedIn
        ? {
            headers: {
              Authorization: app.$auth.strategy.token.get(),
            },
          }
        : {}
    );
  });
};
