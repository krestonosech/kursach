<template>
    <div class="calendar">
        <!-- <div class="months" v-for="calendar in $store.state.months" :key="calendar">
          <div v-for="month in calendar.months" :key="month">
          {{ month }}
          </div>
          <div v-for="month in calendar.week" :key="month">
          {{ month }}
          </div>
        </div> -->
          <VCalendar 
          class="VCalendar" 
          :is-dark="this.$store.state.darkTheme" 
          transparent borderless/>
<!--         <p class="newMeet">Создать</p> -->
        <div class="month">
          <ul class="table__settings">
            <router-link to="/main" 
            class="router-link"
            @click="day"
            >
              <li 
              class="table__settings__li" 
              :class="{ 'activee': this.$store.state.day }"
              >День</li>
            </router-link>
            <router-link to="/main" 
            class="router-link"
            @click="fullWeek"
            >
              <li class="table__settings__li" 
              :class="{ 'activee': this.$store.state.fullWeek }"
              >Неделя</li>
            </router-link>
            <router-link to="/main" 
            class="router-link"
            @click="month"
            >
              <li class="table__settings__li" 
              :class="{ 'activee': this.$store.state.month }"
              >Месяц</li>
            </router-link>
          </ul>
          <SDay/>
          <SFullWeek/>
          <Smonth/>
        </div>
        <div class="aside__main-part">
          <aside v-if="this.$store.state.asideOpenClose" class="aside__dark" :class="{'aside': !this.$store.state.darkTheme}"> 
            <p class="aside__dark__p" :class="{'aside__p': !this.$store.state.darkTheme}">Уведомления</p>
            <p class="aside__p__notifications__dark" :class="{'aside__p__notifications': !this.$store.state.darkTheme}">Напоминания</p>
          </aside>
          <s-modal v-if="showModal" @close="showModal = false" />
        </div>
    </div>
    
</template>

<script>
import Smonth from './SMonth.vue'
import SFullWeek from './SFullWeek.vue'
import SDay from './SDay.vue'

export default {
  components: {
    Smonth, SFullWeek, SDay,
  },
  data() {
    const week = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
    return {
      week,
      currentView: 'month'
    }
  },
  methods: {
    day() {
        this.$store.dispatch('setDay');
        this.currentView = 'day';
        window.location.reload();
    },

    workingWeek() {
        this.$store.dispatch('setWorkingWeek');
        this.currentView = 'workingWeek';
        window.location.reload();
    },

    fullWeek() {
        this.$store.dispatch('setFullWeek');
        this.currentView = 'fullWeek';
        window.location.reload();
    },

    month() {
        this.$store.dispatch('setMonth');
        this.currentView = 'month';
        window.location.reload();
    },
  }
}
</script>

<script setup>
import { ref } from 'vue';
const isDark = ref(false);
</script>

<style scoped>
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