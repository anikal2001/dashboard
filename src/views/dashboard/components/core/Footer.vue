<template>
  <v-footer id="dashboard-core-footer">
    <v-container>
      <v-row align="center" no-gutters>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Get API Keys</v-btn>
          </template>

          <v-card>
            <v-card-title color="primary" dark primary-title><h1>Your Keys</h1></v-card-title>

            <v-card-text> 
              <h4>API Key</h4>
              <p>{{api_key}}</p>
              <h4>Secret Key</h4>
              <p>{{secret_key}}</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2020, made with
            <v-icon size="18">mdi-heart</v-icon>by
            <a>RCFTA</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import Axios from 'axios';
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get('alpaca_key')
var token = 'Token ' + alpaca_key
let config = {
  headers: {
    Authorization: token
  }
};

export default {
  name: "DashboardCoreFooter",
  data() {
    return {
      api_key: null,
      dialog: false,
      secret_key: null,
    };
  },
  created() {
    Axios.get('https://rcsandbox.ca/info/accountInfo/', config)
    .then((response)=>{
      this.secret_key = response.data.alpaca_secret_key
      this.api_key= response.data.alpaca_api_key
    })
  }
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
