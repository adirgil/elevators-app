<template>
  <div class="box">
    <q-icon size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'call'" name="elevator"/>
    <q-icon color="red" size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'wait'"
            name="elevator"/>
    <q-icon color="green" size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'arrived'"
            name="elevator"/>
    <span v-if="elevator.destination === indexRow">{{ floor.timeForElevator }}</span>
  </div>
</template>

<script>
export default {
  name: "SingleElevator",
  props:['elevator', 'indexRow','floor']
}
</script>

<style scoped>

</style>