<template>
  <div>
    <q-icon size="xl" name="elevator"/>
    <q-btn no-caps @click="$router.push('/home')">Default Building App</q-btn>
    <div>
      <span>Create Custom Building:</span>
      <q-input outlined type="number" v-model="floorsCustomNum" label="Floors" />
      <q-input outlined type="number" v-model="elevatorsCustomNum" label="Elevators" />
      <q-btn no-caps @click="goToCustomApp">Go To Custom App</q-btn>
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

<style scoped>

</style>