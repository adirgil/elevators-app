const state = {
    floors: 10,
    elevators: 5
}

const mutations = {
    setFloors: ((state, floorNum) => state.floors = floorNum),
    setElevators: ((state, ElevatorsNum) => state.elevators = ElevatorsNum),
}

const getters = {}

const actions = {}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}