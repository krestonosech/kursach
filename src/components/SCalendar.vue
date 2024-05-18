<template>
    <div class="calendar">
          <div class="users__list">
            <h2 class="users__list__li">Пользователи</h2>
            <div v-for="item in ListOFUsers" :key="item">
              <h4>{{ item.username }}</h4>
            </div>
          </div>
        <div class="month">
          <ul class="table__settings">
            <router-link to=""
            class="router-link"
            @click="openCloseModal"
            >
              <li
              class="table__settings__li"
              :class="{ 'activee': isModalOpen }"
              >Создать встречу</li>
            </router-link>
            <router-link to="/main"
            class="router-link"
            @click="day"
            >
              <li
              class="table__settings__li"
              :class="{ 'activee': Store.state.day }"
              >День</li>
            </router-link>
            <router-link to="/main"
            class="router-link"
            @click="fullWeek"
            >
              <li class="table__settings__li"
              :class="{ 'activee': Store.state.fullWeek }"
              >Неделя</li>
            </router-link>
            <router-link to="/main"
            class="router-link"
            @click="month"
            >
              <li class="table__settings__li"
              :class="{ 'activee': Store.state.month }"
              >Месяц</li>
            </router-link>
          </ul>
          <SDay/>
          <SFullWeek/>
          <Smonth/>
        </div>
        <div class="aside__main-part">
          <aside v-if="Store.state.asideOpenClose" class="aside__dark" :class="{'aside': !Store.state.darkTheme}">
            <p class="aside__dark__p" :class="{'aside__p': !Store.state.darkTheme}">Уведомления</p>
            <div class="aside__p__notifications__dark" :class="{'aside__p__notifications': !Store.state.darkTheme}">
              <h3 class="modal__content__elements">Назначенные мне встречи</h3>
              <p class="modal__content__elements" v-if="!notificationTextInvitedEvents">Ни одной встречи не запланировано</p>
              <div v-for="(item, index) in notificationTextInvitedEvents" :key="index" class="items__notification">
                <div v-for="arrayItem in Store.state.usersList" :key="arrayItem">
                  <div v-if="arrayItem.id == item.author_id">
                    <h4>Встреча {{ index + 1 }}</h4>
                    <div>Создатель: {{ arrayItem.username }}</div>
                    <div>Описание: {{ item.name }}</div>
                  </div>
                </div>
              </div>
              <h3 class="modal__content__elements">Назначенные мной встречи</h3>
              <p class="modal__content__elements" v-if="!notificationTextMyEvents">Ни одной встречи не запланировано</p>
              <div v-for="(item, index) in notificationTextMyEvents" :key="index" class="items__notification">
                <div v-for="arrayItem in ListOFUsers" :key="arrayItem">
                  <div v-if="arrayItem.id == item.author_id">
                    <h4>Встреча {{ index + 1 }}</h4>
                    <div>Создатель: {{ arrayItem.username }}</div>
                    <div>Описание: {{ item.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
        <div class="modal-backdrop" @click="handleOutsideClick" v-if="isModalOpen">
          <div class="modal">
            <div class="modal__content">
              <h2 class="modal__content__elements">Сведения</h2>
              <h4 class="modal__content__elements">
                Назначить встречу:
                <button class="modal__content__elements" @click="openUsersList">Выбрать пользователя</button>
                <h4 v-if="anotherUserId">Пользователь выбран</h4>
              </h4>
              <div v-if="opennedUsersList" class="modal__content__elements">
                Выберите пользователя:
                <div class="modal__content__elements" v-for="(item, index) in ListOFUsers" :key="index">
                  <div v-if="item.id !== userId" class="modal__content__elements">
                    <button @click="chooseThisUser(item.id)">{{ item.username }}</button>
                  </div>
                </div>
              </div>
              <h4 class="modal__content__elements">Описание встречи: <input placeholder="Встреча" v-model="meetDescription"></h4>
              <p class="modal__content__elements">* Напишите краткое описание встречи</p>
              <h4 class="modal__content__elements">Дата встречи: <input type="text" v-model="meetDateResult" placeholder="DD-MM" readonly></h4>
              <p class="modal__content__elements">* Выберите время встречи</p>
              <v-date-picker
                v-model="meetDate"
              >
              </v-date-picker>
              <button class="modal__content__elements" @click="formattedMeetDate">Подтвердить дату</button>
              <button class="modal__content__elements" @click="createMeet" :disabled="!meetDescription || !meetDateResult || !anotherUserId">Создать встречу</button>
            </div>
          </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import Smonth from './SMonth.vue'
import SFullWeek from './SFullWeek.vue'
import SDay from './SDay.vue'
import { ref, onMounted } from 'vue'
import { store } from '../store/index'
import { axios } from '../plagins/axios'
import { VDatePicker } from 'vuetify/components/VDatePicker'
import { dayjsLib } from '../plagins/dayjs'

const currentView = ref('month')
const Store = store
const notificationTextInvitedEvents = ref(null)
const notificationTextMyEvents = ref(null)
const isModalOpen = ref(false)
const userId = ref(Number(localStorage.getItem('userId')))
const anotherUserId = ref<number>()
const ListOFUsers = ref(Store.state.usersList)
const opennedUsersList = ref(false)
const meetDescription = ref<string>()
const meetDate = ref(undefined)
const meetDateResult = ref()
const meetTime = ref('')

/* getUsersList() */

const formattedMeetDate = () => {
  const formattedDate = dayjsLib(String(meetDate.value)).format('YYYY-MM-DD')
  meetDateResult.value = dayjsLib(formattedDate).format('YYYY-MM-DD')
}

function handleOutsideClick (event: any) {
  const modal = event.target.closest('.modal')
  if (!modal) {
    close()
  }
}

async function createMeet () {
  try {
    const data = {
      author_id: Number(localStorage.getItem('userId')),
      invited_id: anotherUserId.value,
      name: meetDescription.value,
      event_date: meetDateResult.value
    }

    await axios.post(`${Store.state.server}/api/v1/events/create`, data, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    isModalOpen.value = false
    meetDescription.value = ''
    meetDateResult.value = ''
    anotherUserId.value = undefined
  } catch (error) {
    console.error(error)
  }
}

function openUsersList () {
  opennedUsersList.value = !opennedUsersList.value
}

function chooseThisUser (item: number) {
  anotherUserId.value = item
  opennedUsersList.value = false
}

/* async function getUsersList () {
  try {
    const response = await axios.get(`${Store.state.server}/api/v1/users/list`, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    anotherUserId.value = undefined
    opennedUsersList.value = !opennedUsersList.value
    usersList.value = response.data
  } catch (error) {
    console.error(error)
  }
} */

function openCloseModal () {
  isModalOpen.value = !isModalOpen.value
}

onMounted(() => {
  if (Store.state.invitedEvents.length !== 0) {
    notificationTextInvitedEvents.value = Store.state.invitedEvents
  } else {
    notificationTextInvitedEvents.value = null
  }
  if (Store.state.myEvents.length !== 0) {
    notificationTextMyEvents.value = Store.state.myEvents
  } else {
    notificationTextMyEvents.value = null
  }
})

function day () {
  Store.dispatch('setDay')
  currentView.value = 'day'
  window.location.reload()
}

function fullWeek () {
  Store.dispatch('setFullWeek')
  currentView.value = 'fullWeek'
  window.location.reload()
}

function month () {
  Store.dispatch('setMonth')
  currentView.value = 'month'
  window.location.reload()
}

</script>

<style scoped>
button {
  border: none;
  background-color: white;
  cursor: pointer;
}
.items__notification {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
.modal__content__elements {
  margin-bottom: 20px;
}
  .modal__content {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    margin-top: 50px;
  }
  .modal-backdrop {
    position: fixed;
    width: 200px;
    z-index: 2;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 500px;
    height: 1000px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
.table__settings__li {
  color: grey;
}
.activee {
  color: royalblue;
  border-bottom: solid royalblue 2px;
}
.router-link {
    text-decoration: none;
    color: black;
    font-size: 18px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
.table__settings {
  display: flex;
  list-style: none;
  margin: 10px 10px 10px 0;
  float: right;
}
/* ::v-deep .VCalendar {

} */
.users__list__li {
margin-bottom: 20px;
}

.users__list {
  z-index: 1;
  margin-top: 20px;
  margin-left: 20px;
  width: 380px;
  height: 100%;
  color: grey;
}

th {
  border: solid black 2px;
}
.calendar {
  display: flex;
}
.day__with__notifications {
  width: 188px;
  height: 150px;
  border: solid black 2px;
}
.day {
  width: 232px;
  height: 150px;
  border: solid black 2px;
}

.aside__p__notifications {
  font-size: 20px;
  color: #3c434f;
  padding: 15px;
}

.aside__p__notifications__dark {
  font-size: 20px;
  color: gray;
  padding: 15px;
}

.aside__p {
  font-size: 26px;
  padding: 20px;
  color: #3c434f;
}

.aside__dark__p {
  font-size: 26px;
  padding: 20px;
  color: darkgrey;
}

.active {
  background-color: white;
  color: black;
}

.check {
  float: right;
}
.aside__dark {
  display: flex;
  flex-direction: column;
  float: right;
  height: 94vh;
  width: 300px;
  border: solid gainsboro 1px;
  background-color: #0f172a;
}

.aside {
  display: flex;
  flex-direction: column;
  float: right;
  height: 94vh;
  width: 300px;
  border: solid gainsboro 1px;
  background-color: whitesmoke;
}
</style>
