export const state = () => ({
  logs: [],
});

export const mutations = {
  setLogs: (state, logs) => {
    for (let log of logs) {
      log.date = new Date(log.date);
    }
    state.logs = logs;
  },
};
