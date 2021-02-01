export const state = () => ({
  selectedMenu: null,
});

export const mutations = {
  setSelectedMenu: (state, menu) => {
    state.selectedMenu = menu;
  },
};
