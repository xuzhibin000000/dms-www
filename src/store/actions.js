// import * as types from '@/store/mutation-types'

export default {
  SET_PAGE_SIZE: ({commit}, pageSize) => {
    commit('SET_PAGE_SIZE', pageSize)
  },
  setMenu({commit}, obj) {
    commit('setMenu', obj)
  },
  setUserType({commit}, obj) {
    commit('setUserType', obj)
  },
  setUserName({commit}, obj) {
    commit('setUserName', obj)
  }
}
