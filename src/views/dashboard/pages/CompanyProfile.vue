<template>
  <v-container fluid>
    <v-card class="mx-5 pa-5" tile >
      <v-card-title
        style="justify-content:center;font-size:48px"
        align="center"
        class="display-4"
      ><h4 style="font:source-sans-pro">Get Public Company Data</h4></v-card-title>
      <v-card-title
        style="justify-content:center;font-size:18px"
        align="center"
        class="display-4"
      ><p style="font:source-sans"> Gain instant access to key company stats, financials, analyst recommendations, and upcoming corporate events</p></v-card-title>
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
    style="height:90%;overflow-top:scroll;margin:25px 10px 0px 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if="test"
  >
   <template v-slot:heading>
       <div class="display-2 font-weight-light">Company Profile</div>
    </template>
    
    <div>
        <h2>{{this.company.companyName}}</h2> <br>
        ({{this.company.exchange}}: {{this.company.symbol}})<br>
        {{this.company.website}}<br>
        {{this.company.city}}, {{this.company.state}}, {{this.company.country}}<br>
        {{this.company.industry}}<br>
        {{this.company.description}}<br>
        
        CEO: {{this.company.CEO}}<br>
        Number of Employees: {{this.company.employees}}<br>
    </div>
  </base-material-card>
  </v-col>
  <v-col cols = '5' >  
     <v-card id="chart_div" v-if ='test' class="mx-0 pa-5" tile style="height:90%;overflow-top:scroll;margin:25px 10px 0px 0px" >
    
    <trading-vue  colorTitle="#000000" colorGrid='#f0f0f0' HLcolorText='#000000' colorText='#000000' colorBack='#FFFFFF' :width='525' :height='380'  :titleTxt='chartHeader' :data="this.$data"></trading-vue>
  
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
  style="max-height:100%;overflow-top:scroll;margin:0px 0px 5% 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if='test'>
  <template v-slot:heading>
      <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-chart-pie</v-icon>Analyst Recommendations
        </v-tab>
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-target</v-icon>Price Targets
        </v-tab>
      </v-tabs>
    </template>
    <v-tabs-items v-model="tabs" class="transparent">
      <v-tab-item v-for="n in 2" :key="n">
        <div v-if="n==1">
            <v-row>
            <div style="margin: 40px 0px 25px 25px; justify:center;">
               <h2> Recommendations <br> Distribution </h2>
              <div >
              Strong Buy: {{analyst_recommendations.ratingBuy}} analysts<br>
              Moderate Buy: {{analyst_recommendations.ratingOverweight}} analysts<br>
              Hold: {{analyst_recommendations.ratingHold}} analysts<br>
              Moderate Sell: {{analyst_recommendations.ratingUnderweight}} analysts<br>
              Strong Sell: {{analyst_recommendations.ratingSell}} analysts<br>
              </div>
              
            </div>
            <div>
              <div style="justify:center;margin: 40px 0px 25px 25px;" >
                <apexchart type="pie" width="300" :options="chartOptions" :series="series"></apexchart>
              </div>
              
            </div>
            </v-row>
        </div>
        <div v-if='n==2'>
          <v-row>
          <div  style="margin: 40px 25px 25px 25px;">
          <h2> Price Targets </h2>
            <div>
              Average Price Target: ${{price_target.priceTargetAverage}}<br>
              Highest Price Target: ${{price_target.priceTargetHigh}}<br>
              Lowest Price Target: ${{price_target.priceTargetLow}}<br>
              Number of Anlysts: {{price_target.numberOfAnalysts}}<br>
            </div>
          </div>
            <div style="justify:center;" >
                <apexchart type="rangeBar" width="300" :options="priceTargetChartOptions" :series="priceTargetSeries"></apexchart>
            </div>
          </v-row>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </base-material-card>

  <base-material-card
  style="overflow-top:scroll;margin:50px 0px 5% 0px"
    color="#08182b"
    class="px-5 py-3"
    v-if='test'>
  <template v-slot:heading>
      <v-tabs v-model="tabs2" background-color="transparent" slider-color="white">
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-newspaper</v-icon>News
        </v-tab>
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-archive</v-icon>Filings
        </v-tab>
         <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-calendar</v-icon>Upcoming Events
        </v-tab>
    
      </v-tabs>
    </template>
    <v-tabs-items v-model="tabs2" class="transparent">
      <v-tab-item v-for="n in 3" :key="n">
        <div style="overflow-y:scroll;max-height:360px" v-if='n==1'>
          <div>
          <v-card-text>
            <template  v-for="item in news">
              <v-row style="border-bottom:thin solid" :key="item" align="center">
                <v-col>
                  <a style="text-decoration:none;" target="_blank" :href="item.url">
                    <h3 class="font-weight-dark" style="padding-bottom:.5rem;" v-text="item.headline"></h3>
                    <p class="font-weight-light" v-text="item.summary"></p>
                  </a>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
          </div>
        </div>

        <div style="overflow-y:scroll;max-height:360px" v-if='n==2'>
          <div>
          <v-card-text>
            <template  v-for="item in filings" >
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
        <div v-if="n==3">
            <p>Next Earnings Date: {{key_stats.nextEarningsDate}}<br>
              Next Dividend Date: {{key_stats.nextDividendDate}}</p>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </base-material-card>
   </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
import TradingVue from 'trading-vue-js';
import fundamentals from "../components/core/StatementExtractor.vue";
import VueApexCharts from 'vue-apexcharts';
import * as Cookies from "js-cookie";
import Axios from "axios";
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
    chartHeader: "",
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
    tabs:4,
    tabs2:4,
    key_stats: null, 
    analyst_recommendations:null,
    price_target: null, 
    stuff: null,
    barRange: [],
    newTicker:null,
    news: null,
    filings: null,
    cleanedNames: {
        "companyName": "Company Name",
        "marketcap": 'Market Capitalization',
        "week52high": '52 Week High',
        "week52low": '52 Week Low',
        "week52change": '52 Week Change',
        "sharesOutstanding": 'Outstanding Shares',
        "float": 'Float',
        "avg10Volume": 'Average 10 Day Volume',
        "avg30Volume": 'Average 30 Day Volume',
        "day200MovingAvg": '200 Day Moving Average',
        "day50MovingAvg": '50 Day Moving Average',
        "employees": 'Employees',
        "ttmEPS": 'TTM EPS',
        "ttmDividendRate": 'TTM Dividend Rate',
        "dividendYield": 'Dividend Yield',
        "nextDividendDate": 'Next Dividend Date',
        "exDividendDate": 'Ex-Dividend Date',
        "nextEarningsDate": 'Next Earnings Date',
        "peRatio": 'PE Ratio',
        "beta": 'Beta',
        "maxChangePercent": 'Max Change Percentage',
        "year5ChangePercent": '5 Year Holding Period Return',
        "year2ChangePercent": '2 Year Holding Period Return',
        "year1ChangePercent": '1 Year Holding Period Return',
        "ytdChangePercent": 'Year to Date Return',
        "month6ChangePercent": '6 Month Holding Period Return',
        "month3ChangePercent": '3 Month Holding Period Return',
        "month1ChangePercent": '1 Month Holding Period Return',
        "day30ChangePercent": '30 Day Holding Period Return',
        "day5ChangePercent": '5 Day Holding Period Return',
      },
    priceTargetSeries: [{
              data: [{
                x: '52-Week Trading Range',
                y: [1, 5]
              }, {
                x: 'Current Analyst Forecast',
                y: [4, 6]
              },]
          }],
          priceTargetChartOptions: {
            chart: {
              type: 'rangeBar',
              decimalsInFloat: 2,
            },
            plotOptions: {
              bar: {
                decimalsInFloat: 2,
                horizontal: true
              }
            },
            dataLabels: {
              enabled: true,
              decimalsInFloat: 2,
            }
          },

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
          this.filings = Response.data.filings;
          this.news = Response.data.news;
          this.loading = false;
          this.test = true;
          var temp = {};
          for (var x in this.key_stats){
            if (x == 'marketcap' || x == 'sharesOutstanding' || x == 'ttmEPS' || x == 'dividendYield' || x == 'peRatio' || x=='beta' || x=='week52high' || x=='week52low' || x=='float' || x=='sharesOutstanding'
            || x=='week52Change'){
            temp = {'name': this.cleanedNames[x] , "val": this.key_stats[x]};
            console.log(x);
            this.items.push(temp);
            }
          }
          temp = {'name': '52 Week Trading Range' , "val": this.key_stats['week52low']+ " - " + this.key_stats['week52high']};
          this.items.push(temp);
          this.ohlcv = Response.data.charting_yearly;        
          this.series = [this.analyst_recommendations.ratingSell, this.analyst_recommendations.ratingUnderweight, this.analyst_recommendations.ratingHold, this.analyst_recommendations.ratingOverweight, this.analyst_recommendations.ratingBuy,];
          var tradingRange =[Number(this.key_stats['week52low']).toFixed(2),  Number(this.key_stats['week52high']).toFixed(2)];
          var forecast = 
          this.priceTargetSeries=[{
              data: [{
                x: '52-Week Trading Range',
                y: [Number(this.key_stats['week52low']).toFixed(2),  Number(this.key_stats['week52high']).toFixed(2)]
              }, {
                x: 'Current Analyst Forecast',
                y: [this.price_target.priceTargetLow, this.price_target.priceTargetHigh]
              },]
          }];
          //var count = Object.keys(Response.data.filings).length;
          //for (let i = 0; i < count; i++) {
           // this.items.push({
           //   title: Response.data.filings[i].title,
           //   link: Response.data.filings[i].lin
              
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
    normal_names(key) {
      key = key.replace(/([A-Z])/g, " $1").trim();
      key = key.substring(0, 1).toUpperCase() + key.substring(1);
      return key;
    },
    mounted() {
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
