<template>
<div>
  <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:0px 15px 0px 0px;min-height:28rem "
    color="#08182b"
    class="px-5 py-3"
    icon="mdi-flare"
    title="Trade"
  >
    
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
         <v-snackbar
          v-model="snackbar"
          :top="true"
          :right="true"
    >
      <p style='font-size:16px;'>{{message}}</p>

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
          :bottom="true"
          :left="true"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      </v-container>
    </div>
  </base-material-card>

</div> 
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
  name: "OrderForm",
  props:{
    p_width: Number,
  },
  data() {
    return {
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
      this.message =this.order + " " + this.position + " order for " + this.Quantity + " shares of " + this.ticker.toUpperCase() +" has been submitted!";
      Axios.get(link, config)
        .then(Response => {
          this.loading = false;
          this.$refs.form.reset();
          this.snackbar = true;
        })
        .catch(error => {
          this.loading = false;
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            this.message="Insufficient Buying Power or Invalid Ticker!";
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
          this.snackbar = true;
        });
    },
    Ordering() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let link = base_link + `info/order/${this.ticker.toUpperCase()}/${this.Quantity}/${this.position.toLowerCase()}/`
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