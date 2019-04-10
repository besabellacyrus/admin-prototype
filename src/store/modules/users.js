import { instance } from '@/Http'

const state = {
  users: [],
  uploadImagePath: '',
  imageLoading: false,
  isSaved: false,
  addUserDialog: false
}

const getters = {
  users (state) {
    return state.users
  },
  imagePath (state) {
    return state.uploadImagePath
  },
  isSaved (state) {
    return state.isSaved
  },
  addUserDialog (state) {
    return state.addUserDialog
  }
}

const actions = {
  getUsers ({ commit }) {
    instance.get('/web-user').then(users => {
      if (users.status === 200) {
        console.log({ userss: users.data })
        commit('ALL_USER', users.data)
      }
    })
      .catch(err => {
        console.log(err)
      })
  },
  addUser ({ commit }, payload) {
    instance.post('/web-user/registerv2', payload)
      .then(user => {
        console.log({ user })
        if (user.status === 201) {
          commit('ADD_USER', user.data)
          commit('OPEN_ADD_USER_DIALOG', false)
        }
      })
      .catch(error => {
        console.log({ error })
      })
  },
  uploadProfilePic ({ commit }, payload) {
    commit('IMAGE_LOADING', true)
    console.log({ payload })
    instance.post('/web-user/upload-image', payload, {
      headers: {
        'Content-Type': `multipart/form-data`
      }
    })
      .then(upload => {
        if (upload.status === 201) {
          commit('UPLOAD_IMAGE_PATH', upload.data.path)
          commit('IMAGE_LOADING', false)
        }
      })
      .catch(err => {
        console.log(err)
        commit('IMAGE_LOADING', false)
      })
  }
}

const mutations = {
  'ALL_USER' (state, payload) {
    state.users = payload
  },
  'ADD_USER' (state, payload) {
    state.users.push(payload)
  },
  'UPLOAD_IMAGE_PATH' (state, path) {
    state.uploadImagePath = path
  },
  'IMAGE_LOADING' (state, loading) {
    state.imageLoading = loading
  },
  'IS_SAVED' (state, saved) {
    state.isSaved = saved
  },
  'OPEN_ADD_USER_DIALOG' (state, open) {
    state.addUserDialog = open
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
