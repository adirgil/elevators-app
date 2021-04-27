<template>
<!--  <Home />-->
  <router-view></router-view>
</template>

<script>
import Home from "./views/Home";

export default {
  name: 'LayoutDefault',

  components: {
    Home,
  },

  data () {
    return {
    }
  }
}
</script>

<style>
</style>
