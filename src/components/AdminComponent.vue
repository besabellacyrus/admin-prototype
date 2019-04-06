<template>
  <div>
    <MainSideNavigation />
    <v-content>
      <v-container>
        <slot></slot>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import MainSideNavigation from '@/components/MainSideNavigation'

export default {
  components: {
    MainSideNavigation
  }
}
</script>
