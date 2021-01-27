export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'robotadmin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Raleway&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main'],

  // Global Styles Resources (variables, functions, etc.)
  styleResources: {
    scss: ['~/assets/scss/variables.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    // https://github.com/nuxt-community/style-resources-module#readme
    '@nuxtjs/style-resources',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
  },

  // Server Middleware: https://fr.nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware/
  serverMiddleware: [{ path: '/api', handler: '~/api/rest.js' }],

  // nuxt/auth refresh scheme: https://auth.nuxtjs.org/schemes/refresh
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        },
        user: {
          property: false,
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
          refresh: { url: '/api/auth/refresh', method: 'post' },
          user: { url: '/api/auth/user', method: 'get' },
          logout: false,
        },
        // autoLogout: false
      },
    },
  },
};
