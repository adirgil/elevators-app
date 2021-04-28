<template>
  <div class="main-entry" >
    <h2><q-icon size="xl" name="elevator"/>Elevators App<q-icon size="xl" name="elevator"/></h2>
    <div class="mid-div">
      <q-btn color="primary" no-caps @click="$router.push('/home')">Default Building App (10 floors - 5 elevators)</q-btn>
      <div class="custom-div">
        <span>Create Custom Building:</span>
        <q-input outlined type="number" v-model="floorsCustomNum" label="Floors" />
        <q-input outlined type="number" v-model="elevatorsCustomNum" label="Elevators" />
        <q-btn color="deep-orange" no-caps @click="goToCustomApp">Create Custom App</q-btn>
      </div>
    </div>

  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
  name: "Entry",
  data(){
    return {
      floorsCustomNum: 0,
      elevatorsCustomNum: 0
    }
  },
  methods:{
    ...mapMutations('store', ['setFloors', 'setElevators']),
    goToCustomApp(){
      this.setFloors(this.floorsCustomNum)
      this.setElevators(this.elevatorsCustomNum)
      this.$router.push('/home')
    }
  },
  created() {
    //reset the state for default app
    this.setFloors(10)
    this.setElevators(5)
  }

}
</script>

<style lang="sass" scoped>
.main-entry
  display: grid
  justify-content: center
.custom-div
  margin-top: 5%
.mid-div
  grid-template-columns: 1fr 1fr
</style>