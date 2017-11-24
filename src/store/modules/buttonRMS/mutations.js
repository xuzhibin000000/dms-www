import getters from './getters'

const state = {
  RMSLIST: []
}

const mutations = {
  setRMSLIST(state, list) {
    state.RMSLIST = list
  },
  clearRMSLIST(state) {
    state.RMSLIST = []
  }
}

export default {
  state,
  mutations,
  getters
}
