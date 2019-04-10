export const myMixin = {
  data () {
    return {
      title: 'Mixins are cool',
      copyright: 'All rights reserved. Product of super awesome people'
    }
  },
  created: function () {
    // this.greetings()
  },
  methods: {
    greetings: function () {
      // console.log('Howdy my good fellow!')
    },
    issueTypeImage: function (type) {
      let icon
      switch (type) {
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
      return icon
    }
  }
}
