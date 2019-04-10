<template>
  <div>
    <GmapMap
      ref="mapRef"
      :center="mapCenter"
      :zoom="14"
      :options="mapOptions"
      map-type-id="roadmap"
      style="width: 100vw; height: 100vh"
    >
    <!-- Markers -->
      <GmapMarker
        :icon="m.position.icon"
        :key="index"
        v-for="(m, index) in mapMap"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m,index)"
      />
      <!-- InfoWindows -->
        <gmap-info-window
          :options="infoOptions"
          :position="infoWindowPos"
          :opened="infoWinOpen"
          @closeclick="infoWinOpen=false"
        >
          <div v-html="infoContent"></div>
        </gmap-info-window>
    </GmapMap>
    <div v-if="issueList">
      <CallPrompt :assess="callAssess" />
    </div>
    <div v-else class="issue-summary-container">
      <IssueSummary :issue="issueObject" />
    </div>
  </div>
</template>

<script>
import { lguLocation } from '../config'
import { mapGetters } from 'vuex'
import CallPrompt from '@/components/CallPrompt'
import IssueSummary from '@/components/IssueSummary'

export default {
  components: {
    CallPrompt,
    IssueSummary
  },
  data () {
    return {
      markers: [],
      infoContent: '',
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      center: { lat: 14.4166681, lng: 121.0336598 },
      mapOptions: {
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUi: false
      },
      issueList: true,
      issueObject: {}
    }
  },
  mounted () {
    // this.$refs.mapRef.$mapPromise.then(map => {
    //   // map.panTo({ lat: this.userPosition.lat, lng: this.userPosition.lng })
    //   map.panTo({ lat: 14.4166681, lng: 121.0336598 })
    // })
  },
  computed: {
    ...mapGetters({
      responders: 'responders/getResponders'
    }),
    lguLocation () {
      return lguLocation
    },
    mapCenter () {
      return this.center
    },
    mapMap () {
      let markers = []
      this.responders.forEach(m => {
        if (m.is_online) {
          markers.push(m)
        }
      })
      return markers
    }
  },
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position
      this.infoContent = this.getInfoWindowContent(marker)
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    getInfoWindowContent: function (marker) {
      return `<div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${marker.position.icon.url}" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">${marker.name}</p>
              <p>Vehicle Code: ${marker.vehicle_code}</p>
            </div>
          </div>
        </div>
        <div class="select-btn">
          <button class="succes">SELECT</button>
        </div>
      </div>`
    },
    callAssess (issue) {
      console.log({ callIssue: issue })
      const marker = { lat: parseFloat(issue.lat), lng: parseFloat(issue.lng) }
      this.markers.push({ position: marker })
      // this.places.push(this.currentPlace)
      this.center = marker

      this.issueList = false
      this.issueObject = issue
    }
  }
}
</script>
<style lang="scss">
.card {
  width: 299px;
  & img {
    height: 44px;
    float: left;
    margin-top: 1em;
    margin-right: 1em;
  }
  .select-btn {
    & button {
      background-color: #3ab54a;
      position: absolute;
      top: 25px;
      right: 11px;
      padding: 1em;
      color: #fff;
      border-radius: 21px;
      outline: none;
    }
  }
}
</style>
