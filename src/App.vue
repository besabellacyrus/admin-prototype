<template>
  <v-app>
    <MainSideNavigation v-show="hasSideNav"/>
    <v-content>
      <transition mode="out-in" name="slide-fade">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import MainSideNavigation from '@/components/MainSideNavigation'

export default {
  name: 'App',
  components: {
    MainSideNavigation
  },
  data () {
    return {
      //
    }
  },
  computed: {
    hasSideNav () {
      return (this.$route.path !== '/login' && this.$route.path !== '/')
    }
  }
}
</script>
<style lang="scss">
html {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  color: #505050;
}
.v-icon {
  font-size: 20px;
}
.slide-fade {
  &-enter, &-leave-to {
    opacity: 0
  }
  &-enter-active, &-leave-active {
    transition: 0.3s ease;
  }
}
</style>
