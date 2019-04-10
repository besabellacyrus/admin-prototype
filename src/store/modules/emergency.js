import { instance } from '@/Http'

const state = {
  all: []
}

const getters = {
  issues (state) {
    return state.all
  }
}

const actions = {
  // SOCKET
  SOCKET_urgent_emergency_call ({ commit }, payload) {
    console.log({ urgent_emergency_call: payload })
    if (payload.status === 201) {
      commit('ADD_ISSUE', payload.data)
    }
  },

  // REST
  getIssues ({ commit }) {
    instance.get('/issues').then(issues => {
      console.log({ issues })
      if (issues && issues.status === 200) {
        commit('SET_ISSUES', issues.data)
      }
    }).catch(err => {
      console.log({ issuesError: err })
    })
  }
}

const mutations = {
  'SET_ISSUES' (state, data) {
    state.all = data
  },

  'ADD_ISSUE' (state, data) {
    state.all.push(data)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
