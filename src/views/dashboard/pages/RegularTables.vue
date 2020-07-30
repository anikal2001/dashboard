<template>
  <v-container fluid tag="section">
    <base-material-card
      color="#08182b"
      icon="mdi-clipboard-plus"
      title="Open Orders"
      class="scroll px-5 py-3"
      style='margin-top:20px;'
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">Stock</th>
            <th class="primary--text">Quantity</th>
            <th class="primary--text">Side</th>
            <th class="primary--text">Order Type</th>
            <th class="primary--text">Time in Force</th>
            <th class="primary--text">Limit Price</th>
            <th class="primary--text">Stop Price</th>
            <th class="primary--text">Date Created</th>
            <th class="text-right primary--text"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(task,i) in open_orders[0]" :key="i">
            <td>{{task.symbol}}</td>
            <td>{{task.qty}}</td>
            <td>{{task.side}}</td>
            <td>{{task.type}}</td>
            <td>{{task.time_in_force}}</td>
            <td>{{task.limit_price}}</td>
            <td>{{task.stop_price}}</td>
            <td>{{Date_conversion(task.created_at)}}</td>
            <td class="text-right">
              <v-icon medium @click="deleteItem(task.id, i)">mdi-close</v-icon>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />

    <base-material-card
      color="#08182b"
      icon="mdi-clipboard-text"
      title="Transaction History"
      class="px-5 py-6"
      style='margin-top:10px;'
    >
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">Stock</th>
            <th class="primary--text">Price</th>
            <th class="primary--text">Quantity</th>
            <th class="primary--text">Side</th>
            <th class="primary--text text-right">Date</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(task,i) in transaction_history[0]" :key="i">
            <td>{{task.symbol}}</td>
            <td>{{task.price}}</td>
            <td>{{task.qty}}</td>
            <td>{{task.side}}</td>
            <td class="text-right">{{Date_conversion(task.transaction_time)}}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>
<script>
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import Axios from "axios";
export default {
  name: "Transaction_History",
  data() {
    return {
      transaction_history: null,
      open_orders: null
    };
  },
  created() {
    this.transaction_history = [];
    this.open_orders = [];
    this.get_values(this.transaction_history, this.open_orders);
  },
  methods: {
    get_values(transaction, orders) {
      Axios.get(base_link + "info/activity/", config)
        .then(function(Response) {
          console.log(Response.data);
          transaction.push(Response.data.transaction_history);
          orders.push(Response.data.open_orders);
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
    Date_conversion(date) {
      let new_date = new Date(date);
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye }
      ] = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "numeric",
        day: "2-digit"
      }).formatToParts(new_date);
      let ret_date = mo + "-" + da + "-" + ye;
      return ret_date;
    },
    deleteItem(id, index) {
      let link = base_link + "info/cancelOrder/" + id + "/";
      Axios.get(link, config)
        .then(response => {
          this.open_orders.splice(index, 1);
          console.log(this.open_orders);
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
    }
  }
};
</script>
