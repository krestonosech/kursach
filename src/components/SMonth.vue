<template>
  <div class="month__name" v-if="this.$store.state.month">
    <h1 class="h1">{{ monthName }} {{ this.$store.state.monther.year }}</h1>
    <router-link to="/" @click="prev" :class="{ disabled: this.$store.state.monther.number < 1 }"><span class="mdi mdi-arrow-left"></span></router-link>
    <router-link to="/" @click="next" :class="{ disabled: this.$store.state.monther.number > 12 }"><span class="mdi mdi-arrow-right"></span></router-link>
  </div>
  <table v-if="this.$store.state.month">
    <thead>
      <tr>
        <th v-for="day in week" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in 5" :key="row">
        <td v-for="col in 7" :key="col">
          <div :class="!this.$store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
            <div class="current__date">{{ getDate(row, col) }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
    data() {
    const week = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
    return {
      week,
      monthName: "",
      year: 2024,
      currentDate: new Date(),
      currentView: 'month'
    }
  },
  methods: {
    getDate(row, col) {
      const firstDayOfMonth = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      const dayOfWeek = firstDayOfMonth.getDay();
      const daysInMonth = new Date(this.$store.state.monther.year, this.$store.state.monther.number, 0).getDate();
      const currentDate = new Date();
      const currentDay = (row - 1) * 7 + col - dayOfWeek + 0;

      if (currentDay > 0 && currentDay <= daysInMonth) {
        return currentDay;
      } else {
        return '';
      }
    },
    next() {
      this.$store.dispatch('setMontherNumberPlus');
      this.$router.push('/main');
    },
    prev() {
      this.$store.dispatch('setMontherNumberMinus');
      this.$router.push('/main');
    },
    getMonth() {
      if (this.$store.state.monther.number === 0) {
        return this.monthName = "Дальше бога нет, только лягушка"
      }
      if (this.$store.state.monther.number === 1) {
        return this.monthName = "Январь"
      }
      if (this.$store.state.monther.number === 2) {
        return this.monthName = "Февраль"
      }
      if (this.$store.state.monther.number === 3) {
        return this.monthName = "Март"
      }
      if (this.$store.state.monther.number === 4) {
        return this.monthName = "Апрель"
      }
      if (this.$store.state.monther.number === 5) {
        return this.monthName = "Май"
      }
      if (this.$store.state.monther.number === 6) {
        return this.monthName = "Июнь"
      }
      if (this.$store.state.monther.number === 7) {
        return this.monthName = "Июль"
      }
      if (this.$store.state.monther.number === 8) {
        return this.monthName = "Август"
      }
      if (this.$store.state.monther.number === 9) {
        return this.monthName = "Сентябрь"
      }
      if (this.$store.state.monther.number === 10) {
        return this.monthName = "Октябрь"
      }
      if (this.$store.state.monther.number === 11) {
        return this.monthName = "Ноябрь"
      }
      if (this.$store.state.monther.number === 12) {
        return this.monthName = "Декабрь"
      }
      if (this.$store.state.monther.number === 13) {
        return this.monthName = "Дальше бога нет, только лягушка"
      }
    },
    getYear() {
      if (this.$store.state.monther.year === 2024) {
        return this.year = 2024
      }
    }
  },
  created() {
    this.getMonth();
  },
  watch: {
    '$store.state.monther.number': function() {
      this.getMonth();
    }
  },
  computed: {

  }
}
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