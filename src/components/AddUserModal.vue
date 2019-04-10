<template>
  <v-layout row justify-center>
    <v-dialog v-model="addUserDialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" v-model="valid">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <div class="text-sm-center">
                  <v-avatar
                    :size="150"
                    color="grey lighten-4"
                    @click="pickFile"
                  >
                    <img :src="defaultImage" alt="avatar">
                    <input type="file" style="display: none" ref="image" id="profile-image" name="file" accept="image/*" @change="onFilePicked">
                  </v-avatar>
                  <span class="icon-add-photo" v-show="!imageUrl" @click="pickFile">
                    <v-icon>add_a_photo</v-icon>
                  </span>
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
              <v-flex xs6>
                <v-autocomplete
                  :items="genderItems"
                  label="Gender"
                  v-model="gender"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-text-field label="Mobile Number*" v-model="mobile_number" :rules="mobileNumRules" type="text" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm12>
                <v-text-field label="Address" v-model="address" type="text"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" @click="close">Close</v-btn>
          <v-btn color="success" @click="saveUser">Save</v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapGetters } from 'vuex'
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
      address: '',
      gender: 'Male',
      roles: ['Agent'],
      mobile_number: '',
      roleItems: [
        'Agent',
        'Dispatcher',
        'Responder',
        'Editor'
      ],
      genderItems: [
        'Male',
        'Female'
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
        v => !!v || 'Password is required'
      ],
      mobileNumRules: [
        v => !!v || 'Mobile Number is required'
      ],
      imageName: '',
      imageUrl: '',
      imageFile: ''
    }
  },
  computed: {
    defaultImage () {
      return this.imageUrl || require('@/assets/img/default-user-img.png')
    },
    ...mapGetters({
      imagePath: 'users/imagePath',
      addUserDialog: 'users/addUserDialog'
    })
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  methods: {
    pickFile () {
      this.$refs.image.click()
    },
    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
          this.prepareImageFile(files[0])
        })
      } else {
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    prepareImageFile (img) {
      console.log({ img })
      try {
        const fd = new FormData()
        fd.append('profile_pic', img)
        this.$store.dispatch('users/uploadProfilePic', fd)
      } catch (error) {
        console.log({ error })
      }
    },
    saveUser () {
      if (this.$refs.form.validate()) {
        const payload = {
          first_name: this.first_name,
          middle_name: this.middle_name,
          last_name: this.last_name,
          email: this.email,
          gender: this.gender,
          password: this.password,
          roles: this.roles,
          address: this.address,
          mobile_number: this.mobile_number,
          profile_pic: this.imagePath
        }
        this.$store.dispatch('users/addUser', payload)
      }
    },
    save (date) {
      this.$refs.menu.save(date)
    },
    close () {
      document.querySelector('#profile-image').value = ''
      this.imageUrl = ''
      this.imageFile = ''
      // this.addUserDialog = false
      this.$store.commit('users/OPEN_ADD_USER_DIALOG', false)
    }
  }
}
</script>
<style lang="scss">
.icon-add-photo {
  position: absolute;
  right: 48%;
  top: 15%;
}
</style>
