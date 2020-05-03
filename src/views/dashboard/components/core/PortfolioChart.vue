<template>
<base-material-card
          color="#08182b"
          class="px-5 py-3"
          style="max-height:520px;"
        >
            <v-text-field
      :label="$t('search')"
      v-model="newTicker"
      color="secondary"
      hide-details
      style="max-width: auto;"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
          v-on:click="addtowatchlist(newTicker)"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Watchlist
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
            />
          </v-card-text>
          </base-material-card>
</template>

<script>
import Axios from 'axios'
let config = {
  headers: {
    "Authorization": "Token 417f59ad885874647d9cc51c5a1834f30d955162",
  }
}

export default {
    name:'PortfolioChart',
    data(){
        return{
          newTicker: '',

            headers: [
          {
            sortable: false,
            text: 'Ticker',
            value: 'ticker',
          },
          {
            sortable: false,
            text: 'Price',
            value: 'price',
          },
          {
            sortable: false,
            text: '% Change',
            value: 'change',
            align: 'right',
          },
        ],
        items: null
        }
    },
  created(){
    this.items = []
    this.getwatchlist(this.items)

    },
  methods:{
    getwatchlist(vm){
      Axios.get('https://rcsandbox.ca/info/getWatchlist/', config)
      .then(function (Response){
        var count = Object.keys(Response.data).length;
        for( let i = 0; i < count; i++){
          vm.push({'ticker':Response.data[i].ticker,'price':Response.data[i].price, 'change':Response.data[i].priceChange})
          } 
        })
        .catch( (error)=> {
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
        });
    },
    addtowatchlist(ticker){
      let link = 'https://rcsandbox.ca/info/addToWatchlist/' + ticker
      Axios.get(link, config)
      .then(function (Response){
        console.log(Response)
        })
        .catch( (error)=> {
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
                    console.log('Error', error.message);
                }
                console.log(error.config);
        });

    }

  }
  

  }
</script>

<style>

</style>