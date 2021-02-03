export const state = () => ({
  selectedMenu: null,
});

export const mutations = {
  selectMenu: (state, menu) => {
    state.selectedMenu = menu;
  },
};
