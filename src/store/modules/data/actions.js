export default {
  setData({commit}, obj) {
    commit('setData', obj)
  },
  removeData({commit}, key) {
    commit('removeData', key)
  }
}
