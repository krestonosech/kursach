<template>
  <div>
    <div class="month__name" v-if="Store.state.month">
      <h1 class="h1">{{ monthName }} {{ Store.state.monther.year }}</h1>
      <router-link to="/" @click="prev" :class="{ disabled: Store.state.monther.number < 1 }"><span class="mdi mdi-arrow-left"></span></router-link>
      <router-link to="/" @click="next" :class="{ disabled: Store.state.monther.number > 12 }"><span class="mdi mdi-arrow-right"></span></router-link>
    </div>
    <table v-if="Store.state.month">
      <thead>
        <tr>
          <th v-for="day in week" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 5" :key="row">
          <td v-for="col in 7" :key="col">
            <div :class="!Store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
              <div>
                <div class="current__date" v-if="new Date(getDate(row, col).date).getDate()">{{ new Date(getDate(row, col).date).getDate() }}</div>
                <div v-if="specialDates.includes(getDate(row, col).date)">
                  <div v-for="(item, index) in myEventsList.filter(event => event.event_date === getDate(row, col).date)" :key="index" class="meet">
                    <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                      <div v-if="arrayItem.id == item.author_id">
                        <h4 :style="{backgroundColor: item.status}">Мероприятие {{ index + 1 }}</h4>
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
                <div v-if="specialDates.includes(getDate(row, col).date)">
                  <div v-for="(item, index) in usersEventsList.filter(event => event.event_date === getDate(row, col).date)" :key="index" class="meet" :style="{backgroundColor: item.status}">
                    <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                      <div v-if="arrayItem.id == item.author_id">
                        <h4 :style="{backgroundColor: item.status}">Мероприятие {{ index + 1 }}</h4>
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { store } from '../store/index'
import { useRouter, RouteLocationRaw } from 'vue-router'

const Store = store
const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
const monthName = ref('')
const year = ref(2024)
const myEventsList = Store.state.myEvents
const usersEventsList = Store.state.invitedEvents
const myEventDates = myEventsList.map(item => item.event_date)
const usersEventDates = usersEventsList.map(item => item.event_date)
const specialDates = ref([...usersEventDates, ...myEventDates])

const router = useRouter()

const getDate = (row: number, col: number) => {
  const firstDayOfMonth = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
  const dayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = new Date(Store.state.monther.year, Store.state.monther.number, 0).getDate()
  const currentDay = (row - 1) * 7 + col - dayOfWeek + 1
  const currentDate = new Date(Store.state.monther.year, Store.state.monther.number - 1, currentDay)
  const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`

  if (currentDay > 0 && currentDay <= daysInMonth) {
    if (specialDates.value.includes(formattedDate)) {
      return {
        date: formattedDate,
        isSpecial: true
      }
    } else {
      return {
        date: formattedDate,
        isSpecial: false
      }
    }
  } else {
    return {
      date: '',
      isSpecial: false
    }
  }
}

const next = () => {
  Store.dispatch('setMontherNumberPlus')
  router.push('/main' as RouteLocationRaw)
}

const prev = () => {
  Store.dispatch('setMontherNumberMinus')
  router.push('/main' as RouteLocationRaw)
}

const getMonth = () => {
  const months = ['Дальше бога нет, только лягушка', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  const monthNumber = Store.state.monther.number

  monthName.value = months[monthNumber] || 'Дальше бога нет, только лягушка'
  return monthName.value
}

const getYear = () => {
  year.value = Store.state.monther.year === 2024 ? 2024 : year.value
  return year.value
}

onMounted(() => {
  getMonth()
})

watch(() => Store.state.monther.number, () => {
  getMonth()
})
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.h1 {
  width: 230px;
  color: slategray;
}
.month__name {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.mdi {
  font-size: 26px;
  margin-left: 20px;
  width: 30px;
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

th {
  border: solid gainsboro 1px;
  color: gray;
}
.calendar {
  display: flex;
}
.day__with__notifications {
  width: 188px;
  height: 150px;
  border: solid gainsboro 1px;
}
.day {
  width: 233px;
  height: 150px;
  border: solid gainsboro 1px;
}

.aside__p__notifications {
  font-size: 20px;
  color: #3c434f;
  padding: 15px;
}
</style>
