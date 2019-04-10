<template>
  <div class="issue-summary">
    <div class="summary-content">
      <v-layout>
        <v-flex xs3>
          <div class="issue-header"><h1>Issue Summary</h1></div>
        </v-flex>
        <v-flex xs3>
          <div class="caller-images">
            <div class="caller-profile-pic">
              <v-avatar
                :size="100"
                color="grey lighten-4"
              >
                <img :src="issue.user.profile_pic" alt="">
              </v-avatar>
            </div>
            <div class="caller-issue-type">
              <img :src="issueTypeImage(issue.issue_type)" alt="">
            </div>
          </div>
        </v-flex>
        <v-flex xs6>
          <v-layout>
            <v-flex xs3>
              <h3>Name:</h3>
              <p>Juan Dela Cruz</p>
              <h3>Mobile Number</h3>
              <p>097438838383</p>
            </v-flex>
            <v-flex xs2>
              <h3>Age</h3>
              <p>32</p>
            </v-flex>
            <v-flex xs2>
              <h3>Gender</h3>
              <p>Male</p>
            </v-flex>
            <v-flex xs5>
              <h3>Address</h3>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos, officiis?</p>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { myMixin } from '@/mixins01'

export default {
  mixins: [myMixin],
  props: ['issue']
}
</script>
<style lang="scss">
.issue-summary {
  position: absolute;
  top: 0;
  height: 150px;
  background-color: #fff;
  width: 90%;
  margin-left: 3em;
  .summary-content {
    padding: 1em;
    & .issue-header {
      padding: 1em;
      & h1 {
        font-size: 3em;
        line-height: 1;
        text-align: center;
      }
    }
  }
}
.caller-images {
  margin-left: 1em;
  .caller-issue-type {
    & img {
      height: 41px;
      position: absolute;
      top: 54px;
      padding-left: 1em;
    }
  }
  .caller-profile-pic {
    float: left;
  }
}

</style>
