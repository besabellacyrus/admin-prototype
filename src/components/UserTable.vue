<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.first_name | titlecase}}</td>
      <td class="text-xs-left">{{ props.item.last_name | titlecase }}</td>
      <td class="text-xs-left">{{ props.item.email }}</td>
      <td class="text-xs-left">{{ props.item.roles | titlecase }}</td>
      <td class="text-xs-left">{{ props.item.gender | titlecase }}</td>
      <td>
        <v-btn @click="edit">Edit</v-btn>
      </td>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      headers: [
        {
          text: 'First Name',
          align: 'left',
          sortable: false,
          value: 'first_name'
        },
        { text: 'Last Name', value: 'last_name' },
        { text: 'Email', value: 'email' },
        { text: 'Roles', value: 'roles' },
        { text: 'Gender', value: 'gender' },
        { text: 'Actions', value: 'actions' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },
  mounted () {
    this.$store.dispatch('users/getUsers')
  },
  methods: {
    edit () {
      console.log('edit')
    }
  }
}
</script>
