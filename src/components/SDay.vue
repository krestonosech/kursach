<template>
  <table v-if="Store.state.day">
    <thead>
      <tr>
        <th>{{ currentDay }}</th>
      </tr>
    </thead>
    <tbody>
      <div :class="!Store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
        <div class="current__date">
          <p>{{ today }}</p>
          <div v-for="item in myEventsList" :key="item">
            <div v-if="item && item.event_date === today">
              <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                <div v-if="arrayItem.id == item.author_id">
                  <h4>Встреча {{ index + 1 }}</h4>
                  <div>Создатель: {{ arrayItem.username }}</div>
                  <div>Описание: {{ item.name }}</div>
                </div>
              </div>
              <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                <div v-if="arrayItem.id == item.invited_id">
                  <div>Кому: {{ arrayItem.username }}</div>
                </div>
              </div>
            </div>
          </div>
<!--           <div v-for="item in specialDates" :key="item">
            <div v-if="item.event_date !== today">На сегодня нет никаких встреч</div>
          </div> -->
          <div v-for="(item, index) in usersEventsList" :key="index">
            <div v-if="item && item.event_date === today">
              <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                <div v-if="arrayItem.id == item.author_id">
                  <h4>Встреча {{ index + 1 }}</h4>
                  <div>Создатель: {{ arrayItem.username }}</div>
                  <div>Описание: {{ item.name }}</div>
                </div>
              </div>
              <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                <div v-if="arrayItem.id == item.invited_id">
                  <div>Кому: {{ arrayItem.username }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { store } from '../store/index'

const Store = store
const currentDay = ref('Сегодня')
const myEventsList = Store.state.myEvents
const usersEventsList = Store.state.invitedEvents
const myEventDates = myEventsList.map(item => item.event_date)
const usersEventDates = usersEventsList.map(item => item.event_date)
const specialDates = ref([...usersEventDates, ...myEventDates])

const today = new Date().toISOString().slice(0, 10)
</script>

<style scoped>
.current__date {
  font-size: 30px;
  color: gray;
}
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
