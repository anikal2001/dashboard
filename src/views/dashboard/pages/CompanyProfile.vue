<template>
  <v-container fluid>
    <v-card class="mx-5 pa-5" tile >
      <v-card-title
        style="justify-content:center;font-size:48px"
        align="center"
        class="display-4"
      ><h1 style="font:source-sans-pro">Get Public Company Data</h1></v-card-title>
      <v-card-title
        style="justify-content:center;font-size:48px"
        align="center"
        class="display-4"
      ><h4 style="font:source-sans-pro"> Gain instant access to key company stats, financials, analyst recommendations, and upcoming corporate events</h4></v-card-title>
      <form ref="form">
        <v-row align="center" justify="center">
          
          <v-col cols="12" md="10" class="px-0">
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
                <v-btn color="primary" class="mt-n5" elevation="1" :loading="loading" fab medium v-on:click="get_filings()">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </form>
    </v-card>
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
    <v-row>
    <v-col cols = '7'>  
     <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:25px 5px 0px 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if="test"
  >
   <template v-slot:heading>
       <div class="display-2 font-weight-light">Company Profile</div>
    </template>
    
    </div>
        <p> {{this.company.companyName}} ({{this.company.exchange}}: {{this.company.symbol}}) </p>
        
        {{this.company.website}}<br>
        {{this.company.city}}, {{this.company.state}}, {{this.company.country}}<br>
        {{this.company.industry}}<br>
        {{this.company.description}}<br>
        
        CEO: {{this.company.CEO}}<br>
        Number of Employees: {{this.company.employees}}<br>
        

  </base-material-card>
  </v-col>
  <v-col cols = '5' >  
     <v-card v-if ='test'class="mx-5 pa-5" tile >
       <div style="max-width:80%;" >
    <trading-vue  :data="this.$data"></trading-vue>
    </div>
    </v-card>
    
  
  </v-col>
  </v-row>
      <v-row> 
        <v-col cols='7'>
      <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:0 10px 50px 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if="test"
  >
   <template v-slot:heading>
      <div class="display-2 font-weight-light">Key Stats</div>
    </template>
    <v-data-table

          :loading="loading"
          :headers="headers"
          :items="items"
        ></v-data-table>
  <h1> Financial Statements </h1>
  
  <fundamentals></fundamentals>
  </base-material-card>

  </v-col>
  <v-col cols='5'>
 
     <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:0px 0px 0px 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if="test"
  >
   <template v-slot:heading>
      <div class="display-2 font-weight-light">Analyst Recommendations</div>
    </template>
    <v-row>
    <div>
    <div >
       <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
    </div>
    <div >
    Strong Buy: {{this.analyst_recommendations.ratingBuy}} analysts<br>
    Moderate Buy: {{this.analyst_recommendations.ratingOverweight}} analysts<br>
    Hold: {{this.analyst_recommendations.ratingHold}} analysts<br>
    Moderate Sell: {{this.analyst_recommendations.ratingUnderweight}} analysts<br>
    Strong Sell: {{this.analyst_recommendations.ratingSell}} analysts<br>
    </div>
    </div>
    <div >
    <h2> Price Targets </h2>

    Average Price Target: ${{this.price_target.priceTargetAverage}}<br>
    Highest Price Target: ${{this.price_target.priceTargetHigh}}<br>
    Lowest Price Target: ${{this.price_target.priceTargetLow}}<br>
    Number of Anlysts: ${{this.price_target.numberOfAnalysts}}<br>
    </div>
    </v-row>
  </base-material-card>
    
  <base-material-card
    style="max-height:100%;overflow-top:scroll;margin:50px 0px 5% 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if="test"
  >

   <template v-slot:heading>
      <div class="display-2 font-weight-light">Upcoming Corporate Events</div>
    </template>
    Next Earnings Date: {{this.key_stats.nextEarningsDate}}<br>
    Next Dividend Date: {{this.key_stats.nextDividendDate}}<br>
  </base-material-card>
   </v-col>
    </v-row>
    </v-card>

    
  </v-container>
</template>

<script>
import TradingVue from 'trading-vue-js';
import fundamentals from "../components/core/StatementExtractor.vue";
import VueApexCharts from 'vue-apexcharts';
import * as Cookies from "js-cookie";
import Axios from "axios";
import ticker from "../components/core/Ticker.vue";
import { hello } from "./CSV-writing.js";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
export default {
  
  name: "CompanyProfile",
  components: { 
  TradingVue,
  ticker,
  fundamentals,
  'apexchart': VueApexCharts}, 

  
  data: () => ({
     styles: {
        width: "80%",
        height: "500px",
      },
    series: [],
          chartOptions: {
            chart: {
              width: 380,
              type: 'pie',
             
            },
            labels: ['Strong Sell', 'Moderate Sell', 'Hold', 'Moderate Buy', 'Strong Buy'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                  
                },
                 colors: ['#bb0500', '#dc6568', '#9C27B0', '#66b186' ,'#007d34'],
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
    test: false,
    ohlcv: [],
    valid: true,
    show: false,
    period_items: ["Annual", "Quarter"],
    income_items: ["Cash Flows", "Income Statement", "Balance Sheet"],
    Ticker: "",
    statement: null,
    period: null,
    numPeriods: null,
    alert: false,
    nameRules: [v => !!v || "Ticker is required"],
    annualRules: [
      v => v > 0 || "Quantity must be greater than 0",
      v => v <= 4 || "Quantity must be less than equal to 4",
      v => Number.isInteger(Number(v)) || "Quantity must be an integer"
    ],
    quarterRules: [
      v => v > 0 || "Quantity must be greater than 0",
      v => v <= 12 || "Quantity must be less than equal to 12",
      v => Number.isInteger(Number(v)) || "Quantity must be an integer"
    ],
    item: 1,
    headers: [{'text':"", 'value': "name"}, {'text':"", 'value': "val"}],
    items: [],
    alert: false,
    loading:false,
    filing_items: ["10-k", "10-q", "8-k", "all"],
    type: null,
    company: null,
    logo: null,
    key_stats: null, 
    analyst_recommendations:null,
    price_target: null, 
    stuff: null,
    newTicker:null,
  }),
  methods: {
    get_filings() {
      this.items.length = 0
      this.loading = true
      let link =
        "https://rcsandbox.ca/info/company-profile/" +
        this.newTicker.toUpperCase() ;
      Axios.get(link, config)
        .then(Response => {
          //stuff = Object;
          console.log(Response);
          
          this.company = Response.data.company;
          this.key_stats = Response.data.stats;
          this.analyst_recommendations = Response.data.analyst_recommendations;
          this.price_target = Response.data.price_target;
          this.loading = false;
          this.test = true;
          var temp = {};
          for (var x in this.key_stats){
            if (x == 'marketcap' || x == 'sharesOutstanding' || x == 'ttmEPS' || x == 'ttmDividendRate' || x == 'peRatio' || x=='beta'){
            temp = {'name': x, "val": this.key_stats[x]};
            console.log(x);
            this.items.push(temp);
            }
          }
          this.ohlcv = Response.data.charting_yearly;
        
          this.series = [this.analyst_recommendations.ratingSell, this.analyst_recommendations.ratingUnderweight, this.analyst_recommendations.ratingHold, this.analyst_recommendations.ratingOverweight, this.analyst_recommendations.ratingBuy,]
          //var count = Object.keys(Response.data.filings).length;
          //for (let i = 0; i < count; i++) {
           // this.items.push({
           //   title: Response.data.filings[i].title,
           //   link: Response.data.filings[i].link
              
           // });
          }
          
        )} 
        
    },
    get_link(value) {
      this.loading = true;
      this.link = value[0];
      this.items.length = 0;
      this.headers.length = 0;
      Axios.get(this.link, config).then(Response => {
        //this.populate_table(Response.data);
      });
    },
    mounted() {
    new TradingView.widget({
      width: 600,
      height: 400,
      symbol: "NASDAQ:AAPL",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      range: "ytd",
      allow_symbol_change: true,
      container_id: "tradingview_9cbb1"
    });
  }
}

/*
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
            console.log("BOI")
            console.log(error)
          }
          console.log(error.config);
        });
*/

</script>

<style>
</style>
