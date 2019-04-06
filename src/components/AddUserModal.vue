<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid">
        <v-card-title>
          <span class="headline">Add User</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <div class="text-sm-center">
                  <v-avatar
                    :tile="tile"
                    :size="150"
                    color="grey lighten-4"
                  >
                    <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                  </v-avatar>
                </div>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="First Name*" v-model="first_name" :rules="fnameRules" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Middle Name" v-model="middle_name"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Last Name*"
                  v-model="last_name"
                  :rules="lnameRules"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" v-model="email" :rules="emailRules" type="email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" v-model="password" :rules="passwordRules" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Birthday date"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="roleItems"
                  label="Role(s)*"
                  v-model="roles"
                  multiple
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field label="Address" type="text"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveUser">Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      date: null,
      menu: false,
      valid: false,
      first_name: '',
      last_name: '',
      middle_name: '',
      email: '',
      password: '',
      roles: [{ text: 'Agent', value: 'agent' }],
      roleItems: [
        { text: 'Agent', value: 'agent' },
        { text: 'Dispatcher', value: 'dispatcher' },
        { text: 'Responder', value: 'responder' },
        { text: 'Editor', value: 'editor' }
      ],
      fnameRules: [
        v => !!v || 'First Name is required'
      ],
      lnameRules: [
        v => !!v || 'Last Name is required'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Last Name is required'
      ]
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    saveUser () {
      if (this.$refs.form.validate()) {
        console.log('valid')
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    }
  }
}
</script>
