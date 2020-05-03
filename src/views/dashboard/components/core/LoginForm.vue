<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col>
          <v-card class="elevation-12">
            <v-toolbar
              dark
              color="rgb(17, 25, 69)"
            >
              <v-toolbar-title>RCFTA Portal Login</v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom />
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSubmit">
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
              <router-link to="/Dashboard">
                <v-btn
                  style="color: white; font-size: 1.2rem;"
                  large
                  color="rgb(17, 25, 69)"
                  @click="Submit"
                >
                  Login
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
  import { onSubmit } from '../../../../services/Submit.service'
  export default {
    name: 'LoginForm',
    data () {
      return {
        email: '',
        password: '',
        snackbar: false,
      }
    },
    methods: {
      Submit () {
        if (this.email) { onSubmit(this.email, this.password) }
      },
    },
  }
</script>
<style scoped>
a {  text-decoration: none;}
  *{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
 }
</style>
