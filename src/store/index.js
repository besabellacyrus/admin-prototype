import Vue from 'vue'
import Vuex from 'vuex'
import users from '@/store/modules/users'
import responders from '@/store/modules/responders'
import auth from '@/store/modules/auth'
import emergency from '@/store/modules/emergency'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    users,
    emergency,
    responders
  },
  strict: debug
})
