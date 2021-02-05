export const state = () => ({
  employeeActualMenu: 'list',
  employeeToModify: null,
  employees: [],
});

export const mutations = {
  changeEmployeeMenu: (state, menu) => {
    state.employeeActualMenu = menu;
  },
  setEmployeeToModify: (state, employee) => {
    state.employeeToModify = employee;
  },
  setEmployees: (state, employees) => {
    state.employees = employees;
  },
};
