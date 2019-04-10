<template>
  <v-navigation-drawer
    :clipped="drawer.clipped"
    :fixed="drawer.fixed"
    :permanent="drawer.permanent"
    :mini-variant="drawer.mini"
    v-model="drawer.open"
    hide-overlay
    stateless
    app
  >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click="toggleMiniDrawer"
            >
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="toggleMiniDrawer"
        :to="{ path: item.path }"
      >
        <v-list-tile-action>
          <!-- <v-icon>{{ item.icon }}</v-icon> -->
          <img class="navigation-image" :src="activeIcon(item)" alt="">
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title >{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data () {
    return {
      drawer: {
      // sets the open status of the drawer
        open: true,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: false,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: true,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: true
      },
      items: [
        {
          title: 'Dashboard',
          icon: 'dashboard',
          inactive: require('@/assets/img/dashboard-i.svg'),
          active: require('@/assets/img/dashboard-a.svg'),
          path: '/dashboard'
        },
        {
          title: 'User Management',
          icon: 'question_answer',
          inactive: require('@/assets/img/user-management-i.svg'),
          active: require('@/assets/img/user-management-a.svg'),
          path: '/user-management'
        },
        {
          title: 'Call Management',
          icon: '',
          inactive: require('@/assets/img/call-management-i.svg'),
          active: require('@/assets/img/call-management-a.svg'),
          path: '/call-management'
        }
      ],
      mini: true,
      right: null
    }
  },
  methods: {
    activeIcon (item) {
      if (this.$route.path !== item.path) {
        return item.inactive
      } else {
        return item.active
      }
    },
    // changes the drawer to permanent
    makeDrawerPermanent () {
      this.drawer.permanent = true
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false
      this.toolbar.clippedLeft = false
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer () {
      this.drawer.mini = !this.drawer.mini
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer () {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true
        this.toolbar.clippedLeft = true
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open
      }
    }
  }
}
</script>

<style lang="scss">
 .navigation-image {
   height: 23px;
 }
</style>
