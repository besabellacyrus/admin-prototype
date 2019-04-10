<template>
  <v-container>
    <v-layout justify-end="true">
      <div class="page-title text-xs-center pb-3">
        <img :src="require('@/assets/img/user-management-a.svg')" alt="">
        <h3>User Management</h3>
      </div>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-toolbar card prominent>
            <v-toolbar-title class="body-2 grey--text"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn class="success" @click="openAddUserModal">
              Add
            </v-btn>
          </v-toolbar>
          <UserTable />
        </v-card>
      </v-flex>
      <v-flex xs12>
        <div class="pt-4" v-show="isEdit">
          <EditUser />
        </div>
      </v-flex>
    </v-layout>
    <AddUserModal ref="addUserRef" />
  </v-container>
</template>
<script>
import UserTable from '@/components/UserTable'
import AddUserModal from '@/components/AddUserModal'
import EditUser from '@/components/EditUser'

export default {
  components: {
    AddUserModal,
    UserTable,
    EditUser
  },
  data () {
    return {
      isEdit: false
    }
  },
  methods: {
    openAddUserModal () {
      // console.log({ refs: this.$refs.addUserRef })
      // this.$refs.addUserRef.dialog = true
      this.$store.commit('users/OPEN_ADD_USER_DIALOG', true)
    },
    openEdit () {
      this.isEdit = true
    }
  }
}
</script>
<style lang="scss">
.page-title {
  & img {
    height: 40px;
  }
}
</style>
