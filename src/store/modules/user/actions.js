export default {
  setUserName({commit}, username) {
    commit('setUserName', username)
  },
  setUserType({commit}, usertype) {
    commit('setUserType', usertype)
  },
  setCustomNumber({commit}, customNumber) {
    commit('setCustomNumber', customNumber)
  }
}
