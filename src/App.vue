<template>
<!--  <Home />-->
  <div id="q-app">
    <router-view></router-view>
  </div>

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
