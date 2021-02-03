export const state = () => ({
  showAddAdminUser: false,
  adminUsers: [],
});

export const mutations = {
  showAddAdminUser: (state, show) => {
    state.showAddAdminUser = show;
  },
  setAdminUsers: (state, adminUsers) => {
    state.adminUsers = adminUsers;
  },
};
