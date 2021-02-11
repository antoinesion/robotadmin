<template>
  <div>
    <h1>Logs</h1>
    <ul>
      <li v-for="log in logs" :key="log._id">
        <div>
          <img :src="require(`../../assets/icons/${log.type}.svg`)" />
          <p>{{ log.content }}</p>
        </div>
        <span v-if="log.date.getDate() == today"
          >Today, {{ log.date.toLocaleTimeString('en-US') }}</span
        >
        <span v-else-if="log.date.getDate() == yesterday"
          >Yesterday, {{ log.date.toLocaleTimeString('en-US') }}</span
        >
        <span v-else>{{
          log.date.toLocaleString('en-US', { timeZone: 'CET' })
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  computed: {
    logs: function () {
      return this.$store.state.logs.logs;
    },
    today: function () {
      let todayDate = new Date();
      return todayDate.getDate();
    },
    yesterday: function () {
      let yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      return yesterdayDate.getDate();
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  h1 {
    margin-bottom: 2 * $basic-margin;
  }

  ul {
    list-style-type: none;
    height: $basic-list-height;
    overflow-y: scroll;
    width: 100%;
    border: 1px solid $lightgray;

    li {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 0.5rem;

      &:nth-child(even) {
        background-color: #e6e6e6;
      }

      &:nth-child(odd) {
        background-color: #ededed;
      }

      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 1rem;
          height: 1rem;
        }

        p {
          width: 91%;
          font-size: 0.8rem;
        }
      }

      span {
        width: fit-content;
        color: $lightgray;
        font-size: 0.8rem;
        margin-right: $basic-margin;
      }
    }
  }
}
</style>
