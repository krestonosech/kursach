<template>
  <div>
    <div class="month__name" v-if="Store.state.fullWeek">
      <h1 class="h1">
        {{ start.getDate() }} - {{ end.getDate() }},
        {{ monthName }}
      </h1>
      <router-link to="/main" @click="prevMonth" :class="{ 'disabled': Store.state.monther.number-1 < 1 }">
        <span class="mdi mdi-arrow-collapse-left"></span>
      </router-link>
      <router-link to="/main" @click="prev" :class="{ 'disabled': weekNumber === 1 }">
        <span class="mdi mdi-arrow-left"></span>
      </router-link>
      <router-link to="/main" @click="next" :class="{ 'disabled': weekNumber === 5 }">
        <span class="mdi mdi-arrow-right"></span>
      </router-link>
      <router-link to="/main" @click="nextMonth" :class="{ 'disabled': Store.state.monther.number-1 > 12 }">
        <span class="mdi mdi-arrow-collapse-right"></span>
      </router-link>
    </div>
    <table v-if="Store.state.fullWeek">
      <thead>
        <tr>
          <th v-for="day in week" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in 1" :key="row">
          <td v-for="col in 7" :key="col">
            <div :class="!Store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
              <div>
                <div class="current__date" v-if="new Date(getDatee(row, col).date).getDate()">{{ new Date(getDatee(row, col).date).getDate() }}</div>
                <div v-if="specialDates.includes(getDatee(row, col).date)">
                  <div v-for="(item, index) in myEventsList.filter(event => event.event_date === getDatee(row, col).date)" :key="index" class="meet">
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
                <div v-if="specialDates.includes(getDatee(row, col).date)">
                  <div v-for="(item, index) in usersEventsList.filter(event => event.event_date === getDatee(row, col).date)" :key="index" class="meet">
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { store } from '../store/index'
import { ref, onMounted } from 'vue'
import { useRouter, RouteLocationRaw } from 'vue-router'

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const week = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const Store = store
const month = (store.state.monther.number - 1)
const weekNumber = ref(1)
const start = ref(new Date(Store.state.monther.year, Store.state.monther.number - 1, 1))
const end = ref(new Date(Store.state.monther.year, Store.state.monther.number - 1, 7))
const DAYS_IN_WEEK = ref(7)
const monthName = ref(months[month])
const myEventsList = Store.state.myEvents
const usersEventsList = Store.state.invitedEvents
const myEventDates = myEventsList.map(item => item.event_date)
const usersEventDates = usersEventsList.map(item => item.event_date)
const specialDates = ref([...usersEventDates, ...myEventDates])

const router = useRouter()

function getDatee (row: number, col: number) {
  const currentDay = (row - 1) * 7 + col - start.value.getDay() + start.value.getDate() - 1
  const currentDate = new Date(start.value.getFullYear(), start.value.getMonth(), currentDay)

  if (currentDate >= start.value && currentDate <= end.value) {
    const day = currentDate.getDate().toString().padStart(2, '0')
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
    const year = currentDate.getFullYear()
    const formattedDate = `${year}-${month}-${day}`

    if (specialDates.value.includes(formattedDate)) {
      return {
        date: `${year}-${month}-${day}`,
        isSpecial: true
      }
    } else {
      return {
        date: `${year}-${month}-${day}`,
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

function nextMonth () {
  Store.dispatch('setMontherNumberPlus')
  window.location.reload()
}

function prevMonth () {
  Store.dispatch('setMontherNumberMinus')
  window.location.reload()
}

function next () {
  weekNumber.value++
  const firstDayOfNextWeek = new Date(start.value.getFullYear(), start.value.getMonth(), end.value.getDate() + 1)
  start.value = firstDayOfNextWeek
  end.value = weekNumber.value === 5
    ? new Date(Store.state.monther.year, Store.state.monther.number, 0)
    : new Date(firstDayOfNextWeek.getFullYear(), firstDayOfNextWeek.getMonth(), firstDayOfNextWeek.getDate() + 6)
  router.push('/main' as RouteLocationRaw)
}

function prev () {
  weekNumber.value--
  const firstDayOfPreviousWeek = new Date(start.value.getFullYear(), start.value.getMonth(), start.value.getDate() - DAYS_IN_WEEK.value)
  start.value = weekNumber.value === 1
    ? new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
    : firstDayOfPreviousWeek
  end.value = new Date(firstDayOfPreviousWeek.getFullYear(), firstDayOfPreviousWeek.getMonth(), firstDayOfPreviousWeek.getDate() + DAYS_IN_WEEK.value - 1)
  router.push('/main' as RouteLocationRaw)
}

onMounted(() => {
  const firstDayOfMonth = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
  const dayOfWeek = firstDayOfMonth.getDay()

  start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
  end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 7)

  switch (true) {
    case dayOfWeek === 1 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 6)
      break
    case dayOfWeek === 1 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 7)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 13)
      break
    case dayOfWeek === 2 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 5)
      break
    case dayOfWeek === 2 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 6)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 12)
      break
    case dayOfWeek === 3 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 4)
      break
    case dayOfWeek === 3 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 5)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 11)
      break
    case dayOfWeek === 4 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 3)
      break
    case dayOfWeek === 4 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 4)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 10)
      break
    case dayOfWeek === 5 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 2)
      break
    case dayOfWeek === 5 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 3)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 9)
      break
    case dayOfWeek === 6 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      break
    case dayOfWeek === 6 && weekNumber.value === 2:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 2)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 8)
      break
    case dayOfWeek === 7 && weekNumber.value === 1:
      start.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 1)
      end.value = new Date(Store.state.monther.year, Store.state.monther.number - 1, 7)
      break
  }
})
</script>

<style scoped>
.meet {
  margin-top: 20px;
  border: solid black 1px;
}
.mdi {
  font-size: 26px;
  margin-left: 10px;
}
.disabled {
  pointer-events: none;
  opacity: 0.5;
}
.h1 {
  width: 250px;
  color: slategray;
}
.month__name {
  display: flex;
  margin-top: 20px;
  align-items: center;
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
.calend.valuear {
  display: flex;
}
.day__with__notifications {
  width: 188px;
  height: 600px;
  border: solid gainsboro 1px;
}
.day {
  width: 232px;
  height: 600px;
  border: solid gainsboro 1px;
}

.aside__p__notifications {
  font-size: 20px;
  color: #3c434f;
  padding: 15px;
}
</style>
