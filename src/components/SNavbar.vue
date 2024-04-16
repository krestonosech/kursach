<template>
  <div class="navbar">
    <router-link to="/login" class="navbar-button-menu">
      <span class="mdi mdi-menu"></span>
    </router-link>
    <div class="navbar-brand">Календарь</div>
    <div class="navbar-buttons">
      <router-link to="/" @click="aside()" 
      :class="{ 'active': this.$store.state.asideOpenClose }"
      class="navbar-button"
      >
        <span class="mdi mdi-bell"></span>
      </router-link>
      <router-link to="/" @click="openModal" class="navbar-button">
        <span class="mdi mdi-cog"></span>
      </router-link>
      <router-link to="/login" class="navbar-button">
        <span class="mdi mdi-help-circle"></span>
      </router-link>
      <router-link to="/login" class="navbar-button">
        <img class="mdi" src="../assets/norm-Photoroom.png" width="50" height="45">
      </router-link>
    </div>
  </div>
  <div class="aside__main-part">
    <s-modal v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import SModal from '@/components/SModal.vue'

export default {
  name: 'SNavbar',
  components: {
    SModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    aside() {
      this.$store.dispatch('setAsideCloseOpen');
    },
    openModal() {
      this.showModal = !this.showModal;
    }
  }
};
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
</style>