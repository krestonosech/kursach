<template>
    <table v-if="this.$store.state.day">
        <thead>
          <tr>
            <th v-for="day in week" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
            <div :class="!this.$store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
                <div class="current__date">
                    {{ new Date() }}
                </div>
            </div>
        </tbody>
      </table>
    </template>
    
    <script>
    export default {
        data() {
        const week = ["Сегодня"];
        return {
          week,
          currentView: 'month'
        }
      },
    }
    </script>
    
    <style scoped>
    .current__date {
      font-size: 30px;
      color: gray;
    }
    .table__settings {
      display: flex;
      list-style: none;
      margin: 10px 10px 10px 0;
      float: right;
    }
    
    .str__in__day__with__notifications {
      height: 25px;
      width: 188px;
      border-bottom: solid gainsboro 1px;
    }
    .str__in__day {
      height: 25px;
      width: 220px;
      border-bottom: solid gainsboro 1px;
    }
    th {
      border: solid gainsboro 1px;
      color: gray;
    }
    .calendar {
      display: flex;
    }
    .day__with__notifications {
      width: 1350px;
      height: 600px;
      border: solid gainsboro 1px;
    }
    .day {
      width: 1660px;
      height: 600px;
      border: solid gainsboro 1px;
    }
    
    .aside__p__notifications {
      font-size: 20px;
      color: #3c434f;
      padding: 15px;
    }
    </style>