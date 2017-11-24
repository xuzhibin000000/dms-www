import getters from './getters'

const state = {
  userName: '',
  userType: '',
  customNumber: ''
}

const mutations = {
  setUserName(state, userName) {
    state.userName = userName
  },
  setUserType(state, userType) {
    state.userType = userType
  },
  setCustomNumber(state, customNumber) {
    state.customNumber = customNumber
  }
}

export default {
  state,
  mutations,
  getters
}
