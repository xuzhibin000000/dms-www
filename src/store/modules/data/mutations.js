import getters from './getters'

const state = {
  database: {
    name: 'name',
    shipmentOutStoreData: {},
    scatteredShipCustomerNumber: '',
    schedualOrderMainDate: {}
  }
}

const mutations = {
  setData(state, obj) {
    state.database[obj.key] = obj.value
  },
  removeData(state, key) {
    delete state.database[key]
  }
}

export default {
  state,
  mutations,
  getters
}
