<template>
  <div class="main-div">
    <h2>Its My Elevators</h2>
    <div class="table">
      <div class="single-floor" :style="gridStyle" v-for="(floor,indexRow) in floorsArr">
        <div class="side-box" v-if="indexRow===0">Ground Floor</div>
        <div class="side-box" v-else>{{toOrdinalSuffix(`${indexRow}`) }}</div>
        <div class="box" v-for="(elevator,indexCul) in elevatorArr">
          <q-icon size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'call'" name="elevator"/>
          <q-icon color="red" size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'wait'"
                  name="elevator"/>
          <q-icon color="green" size="sm" v-if="indexRow===elevator.floor && elevator.elevatorStatus === 'arrived'"
                  name="elevator"/>
          <span v-else>{{ indexRow }}</span>
        </div>
        <div id="call" class="side-box">
          <q-btn v-if="floor.floorBtnStatus==='call'" no-caps color="green" @click="changeElevatorPosition(indexRow)">
            Call
          </q-btn>
          <q-btn disable v-if="floor.floorBtnStatus==='wait'" no-caps color="red">Waiting..</q-btn>
          <q-btn disable v-if="floor.floorBtnStatus==='arrived'" no-caps text-color="green">Arrived</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      floors: 10,
      elevators: 5,
      elevatorArr: [],
      floorsArr: [],
      callsQueue: [],
      gotFreeElevator: true
    }
  },
  computed: {
    gridStyle() {
      return {
        display: "grid",
        "grid-template-columns": `repeat(${this.elevators+2}, 1fr)`
      };
    }
  },
  watch: {
    gotFreeElevator: function () {
      console.log('callsQueue: ', this.callsQueue)
      if (this.callsQueue.length > 0) {
        if (this.gotFreeElevator) {
          this.changeElevatorPosition()
        }
      }
    }
  },
  methods: {
    toOrdinalSuffix(num) {
      const int = parseInt(num),
          digits = [int % 10, int % 100],
          ordinals = ['st', 'nd', 'rd', 'th'],
          oPattern = [1, 2, 3, 4],
          tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
      return oPattern.includes(digits[0]) && !tPattern.includes(digits[1])
          ? int + ordinals[digits[0] - 1]
          : int + ordinals[3];
    },
    checkFreeElevators() {
      const freeElevators = this.elevatorArr.filter((elevator) => {
        return elevator.elevatorStatus === 'call'
      });
      console.log('freeElevators',freeElevators)
      if (freeElevators.length === 0) {
        return false
      }
      return freeElevators
    },
    findClosestElevator() {
      const freeElevators = this.checkFreeElevators()
      if (!freeElevators) {
        return 'allBusy'
      }

      const currentCall = this.callsQueue.shift()
      console.log('currentCall',currentCall)
      let closestDifference = this.floorsArr.length
      let closestElevator = {}
      for (const elevator of freeElevators) {
        let difference = Math.abs(elevator.floor - currentCall)
        if (difference < closestDifference) {
          closestDifference = difference
          closestElevator = elevator
        }
      }
      return closestElevator
    },
    changeElevatorPosition(indexRow) {
      console.log(indexRow)
      //FIND CLOSEST ELEVATOR
      if(indexRow || indexRow === 0){
        this.callsQueue.push(indexRow)
      }else{
        indexRow = this.callsQueue[0]
      }

      const found = this.findClosestElevator()
      /////FOUND
      this.floorsArr[indexRow].floorBtnStatus = 'wait'
      this.gotFreeElevator = false
      if (found === 'allBusy') {
        this.gotFreeElevator = false
        return
      }
      found.elevatorStatus = 'wait'
      let elevatorPos = found.floor
      let position = elevatorPos
      for (let i = 0; i <= Math.abs(elevatorPos - indexRow); i++) {
        setTimeout(() => {
          found.floor = indexRow <= elevatorPos ? position-- : position++
          if (found.floor === indexRow) {
            this.floorsArr[indexRow].floorBtnStatus = 'arrived'
            found.elevatorStatus = 'arrived'
            found.floor = indexRow
            console.log('Elevators:', this.elevatorArr)
            const audio = new Audio('elevator-ding-sound.mp3')
            // audio.play().then(()=>{
            //   console.log('sound played!')}).catch((err)=>{
            //   console.log('error: ',err)})
            setTimeout(() => {
              this.floorsArr[indexRow].floorBtnStatus = 'call'
              found.elevatorStatus = 'call'
              this.gotFreeElevator = true
            }, 2000)
          }
        }, 1000 * i);

      }
    },
    createElevators() {
      for (let i = 0; i < this.elevators; i++) {
        this.elevatorArr.push({
          floor: 0,
          name: `elevator${i}`,
          elevatorStatus: 'call'
        })
      }
      console.log('elevatorrsss: ', this.elevatorArr)
    },
    createFloors() {
      for (let i = 0; i < this.floors; i++) {
        this.floorsArr.push({
          floorNum: i,
          floorBtnStatus: 'call'
        })
      }
      console.log('elevatorrsss: ', this.elevatorArr)
    }
  },
  created() {
    this.createElevators()
    this.createFloors()
  }

}
</script>

<style scoped lang="sass">
.main-div
  background-color: silver

.single-floor
  height: 50px
  //display: grid
  //grid-template-columns: 100px 100px 100px 100px 100px 100px 100px
  //grid-template-columns: repeat(7, 1fr)
  justify-content: center

.box
  border: 2px solid black
  background-color: white
  display: flex
  justify-content: center
  align-items: center

.side-box
  display: flex
  justify-content: center
  align-items: center

.table
  display: flex
  flex-direction: column-reverse
</style>