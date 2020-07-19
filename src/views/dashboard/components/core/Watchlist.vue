<template>
  <base-material-card  icon="mdi-glasses"
  title="Watchlist" color="#08182b" class="px-5 py-3" style="height:600px;">
    <v-form ref="form">
      <v-text-field v-model="newTicker" label="Add New Ticker" single-line hide-details>
        <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
          <v-btn class="mt-n2" elevation="1" fab medium v-on:click="addtowatchlist()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-form>

    <v-card-text style="padding-top:0px;">
      <v-data-table
        @page-count="pageCount = $event"
        :loading="loading"
        :items-per-page="6"
        :page.sync="page"
        hide-default-footer
        :headers="headers"
        :items="items"
      >
        <template v-slot:item.change="{ item }">
          <v-chip :color="getColor(item.change)" dark>{{ item.change }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon medium @click="deleteItem(item)">mdi-close</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <div>
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </base-material-card>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = Cookies.get("link");

var token = 'Token ' + alpaca_key
let config = {
  headers: {
    Authorization: token
  }
};

export default {
  name: "Watchlist",
  data() {
    return {
      newTicker: "",
      page: 1,
      pageCount: 0,
      headers: [
        {
          sortable: false,
          text: "Ticker",
          value: "ticker",
          color: "black"
        },
        {
          sortable: false,
          text: "Price",
          value: "price",
          color: "black"
        },
        {
          sortable: false,
          text: "% Change",
          value: "change",
          align: "right",
          color: "black"
        },
        { 
          text: "", 
          align: "right", 
          value: "actions", 
          sortable: false 
          }
      ],
      items: null,
      componentKey: 0,
      loading: false,
    };
  },
  created() {
    this.items = [];
    this.getwatchlist(this.items);
  },
  methods: {
    getwatchlist(vm) {
      this.loading= true
      Axios.get(base_link + "info/getWatchlist/", config)
        .then((Response) => {
          this.loading = false
          var count = Object.keys(Response.data).length;
          for (let i = 0; i < count; i++) {
            vm.push({
              ticker: Response.data[i].ticker,
              price: Response.data[i].price,
              change: Response.data[i].priceChange
            });
          }
        })
        .catch(error => {
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
    },
    addtowatchlist() {
      let link =
        base_link + "info/addToWatchlist/" + this.newTicker + "/";
      Axios.get(link, config)
        .then(response => {
          this.items.push({
            ticker: response.data.values.ticker,
            price: response.data.values.price,
            change: response.data.values.priceChange
          });
          this.$refs.form.reset();
        })
        .catch(error => {
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
    },
    deleteItem(item) {
      const index = this.items.indexOf(item);
      let link =
        base_link + "info/removeFromWatchlist/" +
        this.items[index].ticker +
        "/";
      Axios.get(link, config).then(function(Response) {
        console.log(Response.data);
      });
      confirm("Are you sure you want to delete this ticker?") &&
        this.items.splice(index, 1);
    },
    getColor(item) {
      item = item.toString();
      if (item.charAt(0) == "-") return "red";
      else return "green";
    }
  }
};
</script>

<style>
</style>