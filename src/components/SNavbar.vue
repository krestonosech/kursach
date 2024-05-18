<template>
  <div>
    <div class="navbar">
      <div class="navbar-brand">Календарь</div>
      <div class="navbar-buttons">
        <router-link to="" @click="aside()"
        :class="{ 'active': Store.state.asideOpenClose }"
        class="navbar-button"
        >
          <span class="mdi mdi-bell"></span>
        </router-link>
        <router-link to="" @click="openModal" class="navbar-button">
          <span class="mdi mdi-cog"></span>
        </router-link>
        <router-link to="" class="navbar-button" @click="openModalProfile">
          <img class="mdi" src="../assets/norm-Photoroom.png" width="50" height="45">
        </router-link>
      </div>
    </div>
    <div class="modal-backdrop" @click="handleOutsideClick" v-if="isOpenModalProfile">
      <div class="modal">
        <img src="../assets/norm-Photoroom.png" width="50" height="45">
        <div class="modal__data">
          <p>Имя: {{ userName }}</p>
          <p>Почта: {{ userEmail }}</p>
          <router-link to="" @click="logout" class="router__link_logout">Выйти</router-link>
        </div>
      </div>
    </div>
    <div class="aside__main-part">
      <s-modal v-if="showModal" @close="showModal = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { store } from '../store/index'
import SModal from './SModal.vue'
import { axios } from '../plagins/axios'
import { useRouter, RouteLocationRaw } from 'vue-router'

const router = useRouter()

const showModal = ref(false)
const isOpenModalProfile = ref(false)
const Store = store
const userId = ref()
const emit = defineEmits(['setInvitedEvents', 'setUsersList'])
const userName = ref(localStorage.getItem('userName'))
const userEmail = ref(localStorage.getItem('userEmail'))

function openModalProfile () {
  isOpenModalProfile.value = !isOpenModalProfile.value
}

function aside () {
  Store.dispatch('setAsideCloseOpen')
}

function logout () {
  localStorage.setItem('accessToken', '')
  window.location.reload()
  router.push('/login')
}

getUsersId()

async function getUsersList () {
  try {
    const response = await axios.get(`${Store.state.server}/api/v1/users/list`, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    Store.commit('setUsersList', response.data)
  } catch (error) {
    console.error(error)
  }
}

async function getUsersId () {
  try {
    const response = await axios.get(`${Store.state.server}/api/v1/users/me`, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    localStorage.setItem('userEmail', response.data.email)
    localStorage.setItem('userName', response.data.username)
    localStorage.setItem('userId', response.data.id)
    userId.value = Number(localStorage.getItem('userId'))
    getEventsList()
    getUsersList()
  } catch (error) {
    console.error(error)
  }
}

async function getEventsList () {
  try {
    const response = await axios.get(`${Store.state.server}/api/v1/events/list?user_id=${userId.value}`, {
      headers: {
        Authorization: localStorage.getItem('accessToken')
      }
    })
    Store.commit('setEvents', [response.data.invited_events, response.data.my_events])
    Store.commit('setInvitedEvents', response.data.invited_events)
    Store.commit('setMyEvents', response.data.my_events)
  } catch (error) {
    console.error(error)
  }
}

function openModal () {
  showModal.value = !showModal.value
}
</script>

<style scoped>
.aside__p__notifications {
  font-size: 20px;
  color: #3c434f;
  padding: 15px;
}

.aside__p {
  font-size: 26px;
  padding: 20px;
  color: #3c434f;
}

.active {
  background-color: white;
  color: black;
}

.check {
  float: right;
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

* {
  padding: 0;
  margin: 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  height: 50px;
}

.mdi {
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 47px;
  transition: background-color 0.4s ease;
}

.mdi:hover {
  background-color: royalblue;
}

.navbar-brand {
  font-size: 1.5em;
  padding-left: 15px;
}

.navbar-buttons {
  display: flex;
}

.navbar-button-menu {
  background-color: black;
  text-decoration: none;
  color: white;
  width: 50px;
  height: 45px;
}

.navbar-button {
  background-color: black;
  text-decoration: none;
  color: white;
  width: 50px;
  height: 45px;
  border-left: gray solid 1px;
}

.router__link_logout {
  margin: 10px 0 10px 0;
}

.modal__data {
  display: flex;
  flex-direction: column;
}

.modal-backdrop {
    float: right;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 50px;
    width: 300px;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: row;
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
</style>
