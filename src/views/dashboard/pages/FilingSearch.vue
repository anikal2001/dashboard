<template>
  <v-container fluid>
    <v-card class="mx-5 pa-5" tile >
      <v-card-title style="font-size:30px;" class="mb-1">Filings</v-card-title>
      <form ref="form">
        <v-row align="center" justify="center">
          <v-col cols="12" md="2" class="px-0">
            <v-select
              class="px-5"
              v-model="type"
              :items="filing_items"
              :rules="[v => !!v || 'Item is required']"
              label="Type"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="8" class="px-0">
            <v-text-field
              outlined
              v-model="newTicker"
              label="Enter Ticker"
              :loading="loading"
              class="pa-5"
              single-line
              hide-details
            >
              <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
                <v-btn color="primary" class="mt-n5" @keyup.enter.prevent="get_filings()" elevation="1" :loading="loading" fab medium v-on:click="get_filings()">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </form>
   <v-alert
      v-model="alert"
      dismissible
      color="error"
      border="left"
      style="padding:20px;"
      elevation="2"
      colored-border
      icon="mdi-alert"
    >
      You have entered an invalid ticker
    </v-alert>
    <div>
          <div>
          <v-card-text>
            <template  v-for="item in items" >
              <v-row style="border-bottom:thin solid" v-bind:key="item" align="center">
                <v-col>
                  <a style="text-decoration:none;" target="_blank" :href="item.link">
                    <h3 class="font-weight-dark" style="padding-bottom:.5rem;" v-text="item.name"></h3>

                    <p class="font-weight-light" > Filing Type: {{item.type}}</p>
                    <p class="font-weight-light" > Filing Date: {{item.date}}</p>
                    
                  </a>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
          </div>
      </div>
      
    </v-card>
  </v-container>
</template>

<script>
import Axios from "axios";
import VueAnalytics from 'vue-analytics';

import * as Cookies from "js-cookie";
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
export default {
  name: "FilingSearch",
  data: () => ({
    newTicker: "",
    item: 1,
    items: [],
    alert: false,
    loading:false,
    filing_items: ["10-k", "10-q", "8-k", "all"],
    type: null
  }),
  methods: {
    get_filings() {
      this.$ga.page('/FilingsSearch');
      this.items.length = 0
      this.loading = true
      let link =
        base_link + "info/secSearch/" +
        this.newTicker.toUpperCase() +
        "/" +
        this.type +
        "/";
      Axios.get(link)
        .then(Response => {
          //var count = Object.keys(Response.data.filings).length;
          this.items = Response.data;
          console.log(this.items);

          //for (let i = 0; i < count; i++) {
          //  this.items.push({
          //    title: Response.data.filings[i].title,
          //    link: Response.data.filings[i].link
          //  });
          //}
          this.loading = false
        })
        .catch(error => {
          this.alert = true
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
  }
};
</script>

<style>
</style>