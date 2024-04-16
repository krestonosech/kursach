<script>
  export default {
    name: 'SModal',

    methods: {
      refreshPage() {
        window.location.reload();
        this.$emit('close');
      },
      otherFunction() {
        this.$emit('close');
      },
      darkTheme() {
        this.$store.dispatch('setDarkTheme');
        this.$emit('close');
      },
      handleOutsideClick(event) {
        const modal = event.target.closest('.modal');
        if (!modal) {
            this.close();
        }
      },
    },
  };
</script>

<template>
  <div class="modal-backdrop" @click="handleOutsideClick">
    <div class="modal">
      <router-link to="/" class="router-link" @click="refreshPage">Обновить</router-link>
      <router-link to="/" class="router-link" @click="darkTheme" v-if="!this.$store.state.darkTheme">Темная тема</router-link>
      <router-link to="/" class="router-link" @click="darkTheme" v-if="this.$store.state.darkTheme">Светлая тема</router-link>
      <router-link to="/" class="router-link" @click="otherFunction">[eq]</router-link>
      <router-link to="/" class="router-link" @click="otherFunction">[eq]</router-link>
      <router-link to="/" class="router-link" @click="otherFunction">[eq]</router-link>
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
    right: 100px;
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