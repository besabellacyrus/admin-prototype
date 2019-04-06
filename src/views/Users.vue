<template>
  <AdminComponent>
    <v-layout justify-end="true">
      <div class="page-title text-xs-center pb-3">
        <img :src="require('@/assets/img/user-management-a.svg')" alt="">
        <h3>User Management</h3>
      </div>
    </v-layout>
    <v-layout>
      <v-flex>
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
    </v-layout>
    <AddUserModal ref="addUserRef" />
  </AdminComponent>
</template>
<script>
import AdminComponent from '@/components/AdminComponent'
import UserTable from '@/components/UserTable'
import AddUserModal from '@/components/AddUserModal'

export default {
  components: {
    AdminComponent,
    AddUserModal,
    UserTable
  },
  data () {
    return {

    }
  },
  methods: {
    openAddUserModal () {
      // console.log({ refs: this.$refs.addUserRef })
      this.$refs.addUserRef.dialog = true
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
