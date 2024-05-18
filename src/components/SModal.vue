<script setup lang="ts">
import { defineEmits } from 'vue'
import { store } from '../store/index'

const Store = store
const emit = defineEmits(['input', 'open', 'close'])

function refreshPage () {
  window.location.reload()
  emit('close')
}

function otherFunction () {
  emit('close')
}

function darkTheme () {
  Store.dispatch('setDarkTheme')
  emit('close')
}

function handleOutsideClick (event: any) {
  const modal = event.target.closest('.modal')
  if (!modal) {
    close()
  }
}
</script>

<template>
  <div class="modal-backdrop" @click="handleOutsideClick">
    <div class="modal">
      <router-link to="/" class="router-link" @click="refreshPage">Обновить</router-link>
      <router-link to="" class="router-link" @click="darkTheme" v-if="!Store.state.darkTheme">Темная тема</router-link>
      <router-link to="" class="router-link" @click="darkTheme" v-if="Store.state.darkTheme">Светлая тема</router-link>
    </div>
  </div>
</template>

<style scoped>
   .router-link {
    text-decoration: none;
    color: black;
    font-size: 18px;
    padding: 10px;
    padding-left: 20px;
   }

   .router-link:hover {
    background-color: gainsboro;
   }

  .modal-backdrop {
    float: right;
    position: fixed;
    right: 200px;
    bottom: 0;
    top: 50px;
    width: 200px;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
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

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
