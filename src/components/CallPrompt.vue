<template>
  <div class="outer-container">
    <div class="call-prompt" v-bind:class="[issues.length > 6 ? 'populated-style' : 'initial-style']">
      <div v-for="item in issues" :key="item._id" class="call-prompt-container">
        <img :src="issueTypeImage(item.issue_type)" alt="">
        <div class="caller-name">{{ item.user.first_name | titlecase }} {{ item.user.last_name | titlecase }}</div>
        <div class="caller-number">{{ item.user.mobile_number }}</div>
        <div class="assess-btn">
          <button @click="callAssess(item)">Assess</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { myMixin } from '@/mixins01'

export default {
  mixins: [myMixin],
  props: ['assess'],
  mounted () {
    this.$store.dispatch('emergency/getIssues')
  },
  computed: {
    ...mapGetters({
      issues: 'emergency/issues'
    })
  },
  data () {
    return {

    }
  },
  methods: {
    callAssess (id) {
      this.assess(id)
    }
  }
}
</script>
<style lang="scss">
.initial-style {
  position: fixed;
  bottom: 0;
}
.populated-style {
  position: initial;
  height: 672px;
}
.outer-container {
  height: 700px;
  position: absolute;
  overflow-x: hidden;
}
.call-prompt {
  overflow: auto;
  position: fixed;
  bottom: 0;
  width: 452px;
  &-container {
    background-color: #fff;
    height: 7em;
    margin-left: 2em;
    padding: 2em;
    width: 400px;
    border-radius: 14px;
    margin-bottom: 1em;
    & img {
      float: left;
      height: 49px;
      margin-right: 2em;
    }
    & .caller-name {
      font-size: 16px;
      font-weight: bold;
    }
    & .caller-number {

    }
    & .assess-btn {
      position: relative;

      & button {
        color: #fff;
        background-color: #3ab54a;
        padding: 0.6em;
        width: 100px;
        border-radius: 5px;
        outline: none;
        font-weight: bold;
        position: absolute;
        right: 0;
        top: -42px;
      }

    }
  }
}
</style>
