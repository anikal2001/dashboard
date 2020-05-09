<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-alert color="red" dismissible  v-if="error" type="error">{{error}}</v-alert>
          <v-card class="elevation-12">
            <v-toolbar dark color="rgb(17, 25, 69)">
              <v-toolbar-title>RCFTA Portal Login</v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  prepend-icon="person"
                  name="login"
                  label="Email"
                  type="text"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
                <v-btn
                  style="color: white; font-size: 1.2rem;"
                  large
                  color="rgb(17, 25, 69)"
                  @click="login"
                >Login</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Firebase from 'firebase'
import db from '../../../../db.js'
import * as Cookies from 'js-cookie'
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      error: null
    };
  },
  methods:{
    login: function(){
      const info ={
        email: this.email,
        password: this.password,
        error: this.error
      }
      Firebase.auth().signInWithEmailAndPassword(info.email, info.password)
      .then(
        () => {
          this.$router.push('/')
          this.$store.commit('login')
          Cookies.set('authenticated', 'true', { expires: 1 })
        }, 
        error => {
          this.error = error.message
        }
      )
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
