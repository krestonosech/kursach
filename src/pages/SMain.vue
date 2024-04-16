<template>
    <s-navbar/>
    <s-calendar :class="{'dark__theme': this.$store.state.darkTheme}"/>
</template>

<script>
import SNavbar from '@/components/SNavbar.vue'
import SCalendar from '@/components/SCalendar.vue'

export default {
    components: {
        SNavbar, SCalendar,
    }
}
</script>

<style scoped>
.dark__theme {
  background-color: #0f172a;
}
</style>