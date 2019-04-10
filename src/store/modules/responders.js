const sampleResponders = [
  {
    _id: '111111',
    first_name: 'Juan',
    last_name: 'Carlos',
    responder: {
      vehicle_type: 'fire',
      vehicle_code: '2919991',
      vehicle_status: 'available',
      vehicle_id: '1',
      is_online: true,
      lat: '14.4223121',
      lng: '120.9723189'
    }
  }
]

const state = {
  all: sampleResponders
}

const getters = {

  getResponders (state) {
    const responders = state.all.map(m => {
      console.log({ m })
      let icon
      switch (m.responder.vehicle_type) {
        case 'fire':
          icon = require('@/assets/icons/png/fire.png')
          break
        case 'k9':
          icon = require('@/assets/icons/png/k9.png')
          break
        case 'police':
          icon = require('@/assets/icons/png/police.png')
          break
        case 'environmental':
          icon = require('@/assets/icons/png/environmental.png')
          break
        default:
          icon = require('@/assets/icons/png/ambulance.png')
          break
      }
      const mapIcon = {
        url: icon,
        size: { width: 45, height: 45, f: 'px', b: 'px' },
        scaledSize: { width: 45, height: 45, f: 'px', b: 'px' }
      }
      // console.log({ lat: m.lat, lng: m.lng })
      return {
        position: { lat: parseFloat(m.responder.lat), lng: parseFloat(m.responder.lng), icon: mapIcon },
        name: m.first_name + ' ' + m.last_name,
        vehicle_status: m.responder.vehicle_status,
        vehicle_code: m.responder.vehicle_code,
        vehicle_id: m.responder._id,
        vehicle_type: m.responder.vehicle_type,
        is_online: m.responder.is_online,
        user_id: m._id
      }
    })
    return responders
  }
}

const actions = {

}

const mutations = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
