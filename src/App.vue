<template>
  <router-view class="MySansSerif" :class="{'dark__theme': this.$store.state.darkTheme}"></router-view>
</template>

<script>

export default {

}
</script>

<style>
.MySansSerif {
  font-family: 'Raleway', sans-serif;
}
* {
  margin: 0;
  padding: 0;
}
.dark__theme {
  background-color: black;
}
</style>
