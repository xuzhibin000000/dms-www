import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import store from './store'
import user from './modules/user/store'
import data from './modules/data/store'
import buttonRMS from './modules/buttonRMS/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    store,
    user,
    data,
    buttonRMS
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
