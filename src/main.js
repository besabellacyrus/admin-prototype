import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from '@/store'
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapApiKey } from './config'
import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'

Vue.config.productionTip = false

Vue.filter('titlecase', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
})

const serverUrl = process.env.VUE_APP_SERVER_API
const SocketInstance = socketio.connect(`${serverUrl}/emergency`, {
  query: {
    cms_id: 'lgu_cms'
  }
})

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketInstance,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

Vue.use(VueGoogleMaps, {
  load: {
    key: mapApiKey,
    libraries: 'places' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  }

  /// / If you intend to programmatically custom event listener code
  /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  /// / you might need to turn this on.
  // autobindAllEvents: false,

  /// / If you want to manually install components, e.g.
  /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  /// / Vue.component('GmapMarker', GmapMarker)
  /// / then disable the following:
  // installComponents: true,
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
