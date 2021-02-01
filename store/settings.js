export const state = () => ({
  showChangePassword: false,
});

export const mutations = {
  setShowChangePassword: (state, show) => {
    state.showChangePassword = show;
  },
};
