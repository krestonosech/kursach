<template>
  <div class="month__name" v-if="this.$store.state.fullWeek">
    <h1 class="h1"> 
      {{ this.start.getDate() }} - {{ this.end.getDate() }}, 
      {{ this.monthName }}</h1>
    <router-link to="/" 
    @click="prevMonth" 
    :class="{ disabled: this.$store.state.monther.number-1 < 1 }">
      <span class="mdi mdi-arrow-collapse-left"></span>
    </router-link>
    <router-link to="/" 
    @click="prev" 
    :class="{ disabled: weekNumber === 1 }">
      <span class="mdi mdi-arrow-left"></span>
    </router-link>
    <router-link to="/" 
    @click="next" 
    :class="{ disabled: weekNumber === 5 }">
      <span class="mdi mdi-arrow-right"></span>
    </router-link>
    <router-link to="/" 
    @click="nextMonth" 
    :class="{ disabled: this.$store.state.monther.number-1 > 12 }">
      <span class="mdi mdi-arrow-collapse-right"></span>
    </router-link>
  </div>
<table v-if="this.$store.state.fullWeek">
    <thead>
      <tr>
        <th v-for="day in week" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in 1" :key="row">
      <td v-for="col in 7" :key="col">
        <div :class="!this.$store.state.asideOpenClose ? 'day' : 'day__with__notifications'">
          <div> <!-- :class="!this.$store.state.asideOpenClose ? 'str__in__day' : 'str__in__day__with__notifications'" v-for="row in 6" :key="row" -->
            <div class="current__date">{{ getDate(row, col) }}</div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    data() {
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    const week = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
    const month = (this.$store.state.monther.number-1)
    return {
      week,
      currentView: 'month',
      currentDate: new Date(),
      weekNumber: 1,
      start: null,
      end: null,
      DAYS_IN_WEEK: 7,
      firstDaiInMonth: new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1),
      lastDaiInMonth: new Date(this.$store.state.monther.year, this.$store.state.monther.number, 0),
      monthName: months[month],
    }
  },
  methods: {
    getDate(row, col) {
    const currentDay = (row - 1) * 7 + col - this.start.getDay() + this.start.getDate() - 1;
    if (currentDay >= this.start.getDate() && currentDay <= this.end.getDate()) {
      return currentDay;
    } else {
      return '';
      }
    },
    nextMonth() {
      this.$store.dispatch('setMontherNumberPlus');
      window.location.reload();
    },
    prevMonth() {
      this.$store.dispatch('setMontherNumberMinus');
      window.location.reload();
    },
    next() {
      this.weekNumber++;

      if (this.weekNumber === 5) {
        const firstDayOfNextWeek = new Date(this.start.getFullYear(), this.start.getMonth(), this.end.getDate() + 1);
        this.start = firstDayOfNextWeek;
        this.end = this.lastDaiInMonth;
      } else {
        const firstDayOfNextWeek = new Date(this.start.getFullYear(), this.start.getMonth(), this.end.getDate() + 1);
        this.start = firstDayOfNextWeek;
        this.end = new Date(firstDayOfNextWeek.getFullYear(), firstDayOfNextWeek.getMonth(), firstDayOfNextWeek.getDate() + 6);
      }
    },
    prev() {
      this.weekNumber--;

      // Вычисляем начало предыдущей недели
      const firstDayOfPreviousWeek = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate() - this.DAYS_IN_WEEK);
      if (this.weekNumber === 1) {
        this.start = this.firstDaiInMonth;
        this.end = new Date(firstDayOfPreviousWeek.getFullYear(), firstDayOfPreviousWeek.getMonth(), firstDayOfPreviousWeek.getDate() + this.DAYS_IN_WEEK - 1);
      } else {
        this.start = firstDayOfPreviousWeek;
        this.end = new Date(firstDayOfPreviousWeek.getFullYear(), firstDayOfPreviousWeek.getMonth(), firstDayOfPreviousWeek.getDate() + this.DAYS_IN_WEEK - 1);
      }
    }
  },
  created() {
    const firstDayOfMonth = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(this.$store.state.monther.year, this.$store.state.monther.number, 0).getDate();

    // Calculate the start and end dates of the first week
    this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
    this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 7);

    // Calculate the start and end dates of the second week
    if (dayOfWeek === 1 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 6);
    }
    if (dayOfWeek === 1 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 7);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 13);
    }
    if (dayOfWeek === 2 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 5);
    }
    if (dayOfWeek === 2 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 6);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 12);
    }
    if (dayOfWeek === 3 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 4);
    }
    if (dayOfWeek === 3 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 5);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 11);
    }
    if (dayOfWeek === 4 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 3);
    }
    if (dayOfWeek === 4 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 4);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 10);
    }
    if (dayOfWeek === 5 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 2);
    }
    if (dayOfWeek === 5 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 3);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 9);
    }
    if (dayOfWeek === 6 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
    }
    if (dayOfWeek === 6 && this.weekNumber === 2) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 2);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 8);
    }
    if (dayOfWeek === 7 && this.weekNumber === 1) {
      this.start = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 1);
      this.end = new Date(this.$store.state.monther.year, this.$store.state.monther.number - 1, 7);
    }
  }
}
</script>

<style scoped>
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
.calendar {
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