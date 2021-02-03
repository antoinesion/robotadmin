export const state = () => ({
  showChangePassword: false,
});

export const mutations = {
  showChangePassword: (state, show) => {
    state.showChangePassword = show;
  },
};
