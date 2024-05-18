<template>
  <div>
    <s-navbar/>
    <s-calendar :class="{'dark__theme': this.$store.state.darkTheme}"/>
  </div>
</template>

<script setup lang="ts">
import SNavbar from '@/components/SNavbar.vue'
import SCalendar from '@/components/SCalendar.vue'

</script>

<style scoped>
.dark__theme {
  background-color: #0f172a;
}
</style>
