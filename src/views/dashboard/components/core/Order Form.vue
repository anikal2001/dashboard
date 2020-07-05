<template>
<div>
  <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:0px 50px 0px 0px; margin-bottom: 10px;"
    color="#08182b"
    class="px-5 py-3"
  >
    <template v-slot:heading>
      <div class="display-2 font-weight-light">Trade</div>
    </template>
    <div style="max-height:100%;">
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="ticker" label="Ticker" required></v-text-field>
          <v-row>
            <v-col class="pt-0">
              <v-text-field
                v-model="Quantity"
                :rules="quantityRules"
                label="Quantity"
                required="required"
              ></v-text-field>
            </v-col>
            <v-col class="pt-0">
              <v-select
                v-model="position"
                :items="position_items"
                :rules="[v => !!v || 'Item is required']"
                label="Position Type"
                required
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="pt-0">
              <v-select
                v-model="order"
                :items="order_items"
                :rules="[v => !!v || 'Item is required']"
                label="Order Type"
              ></v-select>
            </v-col>
            <v-col class="pt-0">
              <v-select
                v-model="tof"
                :items="tof_items"
                :rules="[v => !!v || 'Item is required']"
                label="Time in Force"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="pt-0" v-if="order== 'Stop Limit' || order== 'Limit'">
              <v-text-field v-model="limitPrice" :rules="floatRules" label="Limit Price" required></v-text-field>
            </v-col>
            <v-col class="pt-0" v-if="order== 'Stop Limit' || order== 'Stop'">
              <v-text-field v-model="stopPrice" :rules="floatRules" label="Stop Price" required></v-text-field>
            </v-col>
          </v-row>

          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="Ordering()"
          >Order</v-btn>
        </v-form>
      </v-container>
    </div>
  </base-material-card>
  <base-material-card
  color="primary"
  title="Launchpad"
  style="max-height:100%;overflow-top:scroll;margin:50px 50px 0px 0px"
    class="px-5 py-3">
      <v-container>
    <v-row >
      <template v-for="n in button_list">
        <v-col :key="n">
          <v-btn small
            @click="$router.push(n.link)"
            width="160px"
          > <i style="padding-right:5px;" :class="n.icon"></i>
            {{n.title}}
          </v-btn>
        </v-col>
      </template>
    </v-row>
  </v-container>

  </base-material-card>

</div> 
</template>

<script>
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import Axios from "axios";
export default {
  name: "OrderForm",
  data() {
    return {
      button_list: [
        {
          'title':'Charting',
          'link': 'components/charting',
          'icon': 'fas fa-chart-line'
        }, 
        {
        'title':'Transaction History',
        'link': 'tables/transactions',
        'icon': "fas fa-money-check-alt"
        }, 
        {
          'title':'Filings Search',
          'link': 'components/filings',
          'icon': "fas fa-archive"
          }, 
        {
          'title':'Statement Wizard',
          'link':'components/fundamentals',
          'icon': "fas fa-file-invoice"
          },
          {
          'title':'Algo-Trading',
          'link': 'pages/trading',
          'icon': "fas fa-code"
          },
          {
          'title':'Knowledge Base',
          'link': 'pages/trading',
          'icon': "fas fa-book"
          }
        ],

      valid: true,
      quantityRules: [
        v => v > 0 || "Quantity must be greater than 0",
        v => Number.isInteger(Number(v)) || "Quantity must be an integer"
      ],
      floatRules: [
        v => v > 0 || "Quantity must be greater than 0",
        v => v.indexOf(".") != -1 || "The number must be a decimal value"
      ],
      ticker: "",
      position: null,
      order: null,
      tof: null,
      Quantity: null,
      limitPrice: null,
      stopPrice: null,
      order_items: ["Market", "Limit", "Stop", "Stop Limit"],
      tof_items: ["DAY", "GTC", "OPG", "CLS", "IOC", "FOK"],
      position_items: ["Buy", "Sell"],
      loading: false
    };
  },
  methods: {
    order_stock(link) {
      Axios.get(link, config)
        .then(Response => {
          this.loading = false;
          this.$refs.form.reset();
        })
        .catch(error => {
          this.loading = false;
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
    Ordering() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let link = `https://rcsandbox.ca/info/order/${this.ticker.toUpperCase()}/${this.Quantity}/${this.position.toLowerCase()}/`
        if (this.order == "Stop Limit") {
          link =
            link +
            "stoplimit/" +
            this.tof.toLowerCase() +
            "/" +
            this.limitPrice +
            "/" +
            this.stopPrice +
            "/";
        } else if (this.order == "Limit") {
          link =
            link +
            this.order.toLowerCase() +
            "/" +
            this.tof.toLowerCase() +
            "/" +
            this.limitPrice +
            "/0.0/";
        } else if (this.order == "Stop") {
          link =
            link +
            this.order.toLowerCase() +
            "/" +
            this.tof.toLowerCase() +
            "/0.0/" +
            this.stopPrice +
            "/";
        } else {
          link =
            link +
            this.order.toLowerCase() +
            "/" +
            this.tof.toLowerCase() +
            "/0.0/0.0/";
        }
        this.order_stock(link);
      }
    }
  }
};
</script>

<style>
</style>