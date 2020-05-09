<template>
  <v-row md="6" style="margin: 20px 20px 20px 20px">
    <v-col cols="12" sm="6" lg="3">
      <base-material-stats-card
        color="#08182b"
        icon="mdi-chart-line"
        title="Cash"
        v-bind:value="acc_details[0]"
      />
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <base-material-stats-card
        color="#08182b"
        icon="mdi-chart-pie"
        title="Equity"
        v-bind:value="acc_details[1]"
      />
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <base-material-stats-card
        color="#08182b"
        icon="mdi-cash-multiple"
        title="Buying Power"
        v-bind:value="acc_details[2]"
      />
    </v-col>

    <v-col cols="12" sm="6" lg="3">
      <base-material-stats-card
        v-bind:color="color"
        v-bind:icon="icon"
        title="Profit & Loss"
        v-bind:value="acc_details[3]"
        sub-title="12%"
      />
    </v-col>
  </v-row>
</template>

<script>
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get('alpaca_key')
var token = 'Token ' + alpaca_key
console.log(token)
let config = {
  headers: {
    Authorization: token
  }
};
export default {
  name: "AccountUpdate",
  data() {
    return {
      acc_details: null,
      color: "white",
      icon: "mdi"
    };
  },
  mounted() {
    this.$nextTick(function() {
      var vm = this;
      this.acc_details = [];
      this.material_chart(this.acc_details, vm);
    });
  },
  methods: {
    complete(index) {
      this.list[index] = !this.list[index];
    },
    material_chart(details, vm) {
      let link = "https://rcsandbox.ca/info/accountUpdate/";
      Axios.get(link, config)
        .then((Response) =>{
          for (var key in Response.data) {
            if (Response.data.hasOwnProperty(key)) {
              details.push(Response.data[key]);
            }
          }
          for (let i = 0; i < 3; i++) {
            details[i] = Number.parseFloat(details[i]).toFixed(2);
            details[i] = this.formatNumber(details[i])
            details[i] = "$" + details[i];
          }
          details[3] = details[3].toString();
          details[3] = '%' +  details[3] 
          if (details[3].charAt(1) == "-") {
            vm.color = "red";
            vm.icon = "mdi-arrow-down-bold";
          } else {
            vm.color = "green";
            vm.icon = "mdi-arrow-up-bold";
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
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
  }
};
</script>

<style>
</style>