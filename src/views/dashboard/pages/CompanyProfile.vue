<template>
  <v-container fluid>
    <v-card style=;margin-left:8px;margin-right:8px; class="pa-5" tile>
      <div v-if="!test">
        <v-card-title
          style="justify-content:center;font-size:48px"
          align="center"
          class="display-4"
        >
          <h4 style="font:source-sans-pro">Get Public Company Data</h4>
        </v-card-title>
        <v-card-title
          style="justify-content:center;font-size:18px"
          align="center"
          class="display-3"
        >
          <p style="font:source-sans">
            Gain instant access to key company stats, financials,
            <br />analyst recommendations, and upcoming corporate events
          </p>
        </v-card-title>
      </div>
      <form ref="form">
        <v-row align="center" justify="center">
          <v-col cols="12" md="10" class="px-0">
            <v-text-field
              outlined
              v-model="newTicker"
              label="Enter Ticker"
              @keydown.enter.prevent="get_filings()"
              :loading="loading"
              class="pa-5"
              single-line
              hide-details
            >
              <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:append-outer>
                <v-btn
                  color="primary"
                  class="mt-n5"
                  elevation="1"
                  :loading="loading"
                  fab
                  medium
                  v-on:click="get_filings()"
                >
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
    >You have entered an invalid ticker</v-alert>
    <v-row>
      <v-col cols="7" >
        <base-material-card
          style="overflow-top:scroll;margin:25px 0px 25px 0px; height:40rem;"
          color="#08182b"
          icon="fas fa-building"
          title="Company Profile"
          class="mx-2 pa-5"
          v-if="test"
        >
        
          
            <v-row style='margin-left:15px;'>
            <span style='float:left; margin-top:15px'>
              <img style='vertical-align:middle;' :src='logo'></img>
            </span>
            <span style='vertical-align:middle;float:left'>
            
            <v-card-title
              style="padding-bottom:20px;font-size:2.10rem;"
            >{{this.company.companyName}}</v-card-title>
            <v-card-subtitle style="margin-left:2px;">
              
              {{this.company.exchange}}: {{this.company.symbol}}
              <br />
              {{this.company.website}}
              <br />
              {{this.company.city}}, {{this.company.state}}, {{this.company.country}}
              <br />
              {{this.company.industry}}
              <br />
              CEO: {{this.company.CEO}}
            </v-card-subtitle>
            </span>
            </span>
            </v-row>
            
            <v-card-subtitle>Number of Employees: {{this.company.employees}}</v-card-subtitle>
            <v-card-text>{{this.company.description}}</v-card-text>
            <v-card-subtitle><b>Peer Group: {{this.peers}}</b></v-card-subtitle>
            
          
        </base-material-card>
      </v-col>
      <v-col cols="5">
        <base-material-card color="#08182b" icon="fa-file-invoice" title="Financial Statements" v-if="test" style="height:16rem;margin:25px 8px 1rem 0px;">
          <p style='margin-left:5px;'>Available Statements: {{statements}}</p>
        <v-card-text v-if='statements == 0' style='text-align:center;font-size:20px'> <v-container>You have exceeded your statement exports. Contact admin@rcfta.ca to get more.</v-container> </v-card-text>
          <v-row v-if='statements>0' style="display:flex;flex-direction:column;">
            <v-text-field
              v-model="numPeriods"
              height="20px"
              :rules="annualRules"
              style="border-radius:3px;justify-content:center;width:90%; margin: 0px 0px 0px 20px;"
              label="Number of Years"
              required
            />
          </v-row>
          <v-container v-if='statements>0'  style="display:flex;justify-content:space-around;">
            <v-btn
              :disabled="numPeriods < 1 || numPeriods > 4"
              color="primary"
              small
              @click="get_link('cash', Ticker)"
            >Statement of Cash Flows</v-btn>
            <v-btn
              :disabled="numPeriods < 1 || numPeriods > 4 "
              color="primary"
              small
              @click="get_link('income', Ticker)"
            >Income Statement</v-btn>
            <v-btn
              :disabled="numPeriods < 1 || numPeriods > 4"
              color="primary"
              small
              @click="get_link('balance', Ticker)"
            >Balance Sheet</v-btn>
          </v-container>
        </base-material-card>
        <v-card v-if="test" style="height:23rem;margin-right:8px;">
          <div style="height:100%">
            <apexchart
              width="100%"
              height="100%"
              type="line"
              :options="priceChartOptions"
              :series="priceChartSeries"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8" xl="7">
        <base-material-card
          style="min-height:62rem;overflow-top:scroll;margin:10px 0px 5% 0px"
          color="#08182b"
          
          v-if="test"
        >
          <template v-slot:heading>
            <v-tabs v-model="tabs3" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-chart-pie</v-icon>Key Stats
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-calculator</v-icon>Multiples
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-wallet</v-icon>Capital Stucture
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-target</v-icon>Analyst Recommendations
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs3" class="transparent">
            <v-tab-item v-for="w in 4">
              <div v-if="w==1">
                <div style='justify-content: center;align-items:center;width:100%;'>
                  <v-container>
                <v-btn
          v-if="w==1"
          style="color: white;width:9rem"
          small
          dark
          color="rgb(17, 25, 69)"
           @click='statsTable=0'
        >All Stats</v-btn>
        <v-btn
          v-if="w==1"
          style="margin:10px;width:9rem"
          small
          dark
          color="rgb(17, 25, 69)"
          @click='statsTable=1'
        >Basic</v-btn>
        <v-btn
          v-if="w==1"
          small
          style="color: white;width:9rem"
          color="rgb(17, 25, 69)"
           @click='statsTable=2'
        >Financials</v-btn>
        <v-btn
          v-if="w==1"
          style="color: white;margin:10px;width:9rem"
          small
          dark
          color="rgb(17, 25, 69)"
           @click='statsTable=4'
        >Dividends & Earnings</v-btn>
        <v-btn
          v-if="w==1"
          style="margin-right:10px;color: white;width:9rem"
          small
          dark
          color="rgb(17, 25, 69)"
           @click='statsTable=3'
        >Corporate Events</v-btn>
        <v-btn
          v-if="w==1"
          small
          style='color: white;width:9rem'
          color="rgb(17, 25, 69)"
           @click='statsTable=5'
        >Price & Volume</v-btn>
        </v-container>
        </div>
        
                <v-card-title>
                  <v-text-field
                    v-model="keyStatsSearch"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                v-if='statsTable==0'
                  :loading="loading"
                  :headers="headers"
                  :dense='true'
                  :items="items"
                  :items-per-page="15"
                  :hide-default-footer="false"
                  :search="keyStatsSearch"
                ></v-data-table>
                
                <v-data-table
                v-if='statsTable==1'
                  :loading="loading"
                  :headers="headers"
                  :items="basicStats"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                  :search="keyStatsSearch"
                  :dense='true'
                ></v-data-table>
                
                <v-data-table
                v-if='statsTable==2'
                  :loading="loading"
                  :headers="headers"
                  :items="financialStats"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                  :search="keyStatsSearch"
                  :dense='true'
                ></v-data-table v-if='statsTable==3'>
                
                <v-data-table
                v-if='statsTable==3'
                  :loading="loading"
                  :headers="headers"
                  :items="eventsStats"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                  :search="keyStatsSearch"
                  :dense='true'
                ></v-data-table>
                
               
                <v-data-table
                v-if='statsTable==4'
                  :loading="loading"
                  :headers="headers"
                  :items="dividendStats"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                  :search="keyStatsSearch"
                  :dense='true'
                ></v-data-table>
               
                
                <v-data-table
                v-if='statsTable==5'
                  :loading="loading"
                  :headers="headers"
                  :items="priceStats"
                  :dense='true'
                  hide-default-footer
                  disable-pagination
                  :search="keyStatsSearch"
                
                ></v-data-table>

              </div>
              <v-container>
                <div v-if="w==2">
                  <v-card-title>
                    <v-text-field
                      v-model="keyStatsSearch"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :loading="loading"
                    :headers="headers"
                    :items="multiples"
                    :disable-pagination="true"
                    :hide-default-footer="true"
                    :search="keyStatsSearch"
                  ></v-data-table>
                </div>
              </v-container>

              <div v-if="w==3">
                <v-card-title>
                  <v-text-field
                    v-model="keyStatsSearch"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  :loading="loading"
                  :headers="headers"
                  :items="capitalStats"
                  :disable-pagination="true"
                  :hide-default-footer="true"
                  :search="keyStatsSearch"
                ></v-data-table>
              </div>
              <div v-if="w==4">
                
                <v-row style='justify-content:center'>
              <v-col xl="3" md='4'>
                <h2 style='margin-left:5px;'>Recommendations Distribution</h2>
                <div
                  style="display:flex;margin: 0px 0px 25px 5px;flex-direction: row;justify-content: left;align-items: left;"
                >
                  <div>
                    Strong Buy: {{analyst_recommendations.ratingBuy}} analysts
                    <br />
                    Moderate Buy: {{analyst_recommendations.ratingOverweight}} analysts
                    <br />
                    Hold: {{analyst_recommendations.ratingHold}} analysts
                    <br />
                    Moderate Sell: {{analyst_recommendations.ratingUnderweight}} analysts
                    <br />
                    Strong Sell: {{analyst_recommendations.ratingSell}} analysts
                    <br />
                  </div>

                  
                </div>
                <div >
                  <div style='margin-left:0px;'>
                    <h2 style="align-items: center;">Price Targets</h2>
                    Average Price Target: ${{price_target.priceTargetAverage}}
                    <br />
                    Highest Price Target: ${{price_target.priceTargetHigh}}
                    <br />
                    Lowest Price Target: ${{price_target.priceTargetLow}}
                    <br />
                    Number of Analysts: {{price_target.numberOfAnalysts}}
                    <br />
                  </div>
                </div>
              </v-col>
              <v-col md="7" xl='5' style="display:flex;margin: 0px 0px 25px 10px;flex-direction: row;justify-content: left;align-items: left;">
                
                    <div style="justify-content:left;margin: 5px 0px 25px 5px;width:90%;max-height:600px ">
                    <apexchart type="pie" width="100%" height='110%':options="chartOptions" :series="series"></apexchart>
                  </div>
              </v-col>
            </v-row>
         
              </div>
              
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
      <v-col xl="5" md="4">
        

        <base-material-card
          style="overflow-top:scroll;margin:10px 8px 5% 0px;height:62rem"
          color="#08182b"
          v-if="test"
        >
          <template v-slot:heading>
            <v-tabs v-model="tabs2" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-newspaper</v-icon>News
              </v-tab>
              <v-tab>
                <v-icon class="mr-2">mdi-archive</v-icon>Filings
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs2" class="transparent" >
            <v-tab-item v-for="n in 3" :key="n" style='height:100%;'>
              <div style="overflow-y:scroll;max-height:55rem" v-if="n==1">
                <div>
                  <v-card-text>
                    <template v-for="item in news">
                      <v-row style="border-bottom:thin solid" :key="item" align="center">
                        <v-col>
                          <a style="text-decoration:none;" target="_blank" :href="item.url">
                            <h3
                              class="font-weight-dark"
                              style="padding-bottom:.5rem;"
                              v-text="item.headline"
                            ></h3>
                            <p class="font-weight-light" v-text="item.summary"></p>
                          </a>
                        </v-col>
                      </v-row>
                    </template>
                  </v-card-text>
                </div>
              </div>
              <div style="overflow-y:scroll;max-height:55rem" v-if="n==2">
                <div>
                  <v-card-text>
                   <v-card-text>
                    <template v-for="item in filings">
                      <v-row style="border-bottom:thin solid" v-bind:key="item" align="center">
                        <v-col>
                          <a style="text-decoration:none;" target="_blank" :href="item.link">
                            <h3
                              class="font-weight-dark"
                              style="padding-bottom:.5rem;"
                              v-text="item.name"
                            ></h3>

                            <p class="font-weight-light">Filing Type: {{item.type}}</p>
                            <p class="font-weight-light">Filing Date: {{item.date}}</p>
                          </a>
                        </v-col>
                      </v-row>
                    </template>
                  </v-card-text>
                  </v-card-text>
                </div>
              </div>
              
              <div style="overflow-y:scroll;max-height45rem;" v-if="n==2">
             
                  
               
              
              </div>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
import Vue from 'vue';
import TradingVue from "trading-vue-js";
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
import fundamentals from "../components/core/StatementExtractor.vue";
import VueApexCharts from "vue-apexcharts";
import * as Cookies from "js-cookie";
import Axios from "axios";
import db from "./db.js";
import { hello } from "./CSV-writing.js";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
const uid = Cookies.get("uid");
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
    apexchart: VueApexCharts
  },

  data: () => ({
    statements:null,
    statementDocId:null,
    statsTable:0,
    statsStyle:"min-height:60rem;overflow-top:scroll;margin:10px 0px 5% 0px",
    newsOuterStyle:"overflow-top:scroll;margin:10px 0px 5% 0px;height:52rem",
    newsInner: "overflow-y:scroll;max-height:53rem",
    size:"55",
    chartingTime: [],
    chartingVals: [],
    multiples: [],
    capitalStats: [],
    basicStats:[],
    financialStats:[],
    priceStats:[],
    dividendStats:[],
    eventsStats:[],
    keyStatsSearch: "",
    styles: {
      width: "80%",
      height: "500px"
    },
    series: [],
    chartOptions: {
      // ['#45b6fe', '#3792cb', '#296d98', '#1c4966' ,'#0e2433'],
      colors: ["#0e2433", "#1c4966", "#296d98", "#3792cb", "#45b6fe"],
      chart: {
        width: 60
      },
      labels: [
        "Strong Sell",
        "Moderate Sell",
        "Hold",
        "Moderate Buy",
        "Strong Buy"
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400
            },

            legend: {
              position: "top"
            }
          }
        }
      ]
    },
    test: false,
    peers: "",
    chartHeader: "",
    ohlcv: [],
    valid: true,
    show: false,
    lol: "lol",
    period_items: ["Annual", "Quarter"],
    income_items: ["Cash Flows", "Income Statement", "Balance Sheet"],
    annualRules: [
      v => v > 0 || "Quantity must be greater than 0",
      v => v <= 4 || "Quantity must be less than equal to 4",
      v => Number.isInteger(Number(v)) || "Quantity must be an integer"
    ],
    Ticker: "",
    statement: null,
    period: null,
    numPeriods: "",
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
    headers: [
      { text: "", value: "name" },
      { text: "", value: "val" }
    ],
    items: [],
    alert: false,
    loading: false,
    filing_items: ["10-k", "10-q", "8-k", "all"],
    type: null,
    company: null,
    logo: null,
    tabs: 4,
    tabs2: 1,
    tabs3: 0,
    key_stats: null,
    analyst_recommendations: null,
    price_target: null,
    stuff: null,
    barRange: [],
    newTicker: null,
    news: null,
    filings: null,
    cleanedNames: {
      companyName: "Company Name",
      marketcap: "Market Capitalization",
      week52high: "52 Week High",
      week52low: "52 Week Low",
      week52change: "52 Week Change",
      sharesOutstanding: "Outstanding Shares",
      float: "Float",
      avg10Volume: "Average 10 Day Volume",
      avg30Volume: "Average 30 Day Volume",
      day200MovingAvg: "200 Day Moving Average",
      day50MovingAvg: "50 Day Moving Average",
      employees: "Employees",
      ttmEPS: "TTM EPS",
      ttmDividendRate: "TTM Dividend Rate",
      dividendYield: "Dividend Yield",
      nextDividendDate: "Next Dividend Date",
      exDividendDate: "Ex-Dividend Date",
      nextEarningsDate: "Next Earnings Date",
      peRatio: "PE Ratio",
      beta: "Beta",
      maxChangePercent: "Max Change Percentage"+ (" (%)"),
      year5ChangePercent: "5 Year Holding Period Return"+ (" (%)"),
      year2ChangePercent: "2 Year Holding Period Return"+ (" (%)"),
      year1ChangePercent: "1 Year Holding Period Return"+ (" (%)"),
      ytdChangePercent: "Year to Date Return",
      month6ChangePercent: "6 Month Holding Period Return"+ (" (%)"),
      month3ChangePercent: "3 Month Holding Period Return"+ (" (%)"),
      month1ChangePercent: "1 Month Holding Period Return"+ (" (%)"),
      day30ChangePercent: "30 Day Holding Period Return"+ (" (%)"),
      day5ChangePercent: "5 Day Holding Period Return"+ (" (%)"),
      debtToEquity: "Debt to Equity",
      enterpriseValueToRevenue: "Enterprise Value to Revenue",
      priceToSales: "Price to Sales",
      priceToBook: "Price to Book",
      forwardPERatio: "Forward PE Ratio",
      pegRatio: "PEG Ratio",
      peHigh: "PE High",
      peLow: "PE Low",
      putCallRatio: "Put Call Ratio",
      "EV/EBITDA": "EV/EBITDA",
      "MarketCap/Revenue": "Matket Capitalization to Revenue",
      marketcap: "Market Capitalization",
      beta: "Beta",
      totalCash: "Total Cash",
      currentDebt: "Current Debt",
      revenue:"Revenue",
revenuePerShare:"Revenue Per Share",
revenuePerEmployee:"Revenue Per Employee",
grossProfit:"Gross Profit",
EBITDA:"EBITDA",
profitMargin:"Profit Margin",
    },
    keyStatsOrder: {marketcap:"Market Capitlization ",		
week52high:"52 Week High",		
week52low:"52 Week Low",		
week52change:"52 Week Change",		
sharesOutstanding:"Shares Outstanding",		
avg30Volume:"Average 30 Day Volume",		
avg10Volume:"Average 10 Day Volume",		
float:"float ",		
ttmEPS:"TTM EPS",		
ttmDividendRate:"TTM Dividend Rate",		
dividendYield:"Dividend Yield",		
nextDividendDate:"Next Divident Date",		
exDividendDate:"Ex Dividend Date",		
nextEarningsDate:"Next Earnings Date",		
peRatio:"PE Ratio",		
beta:"beta",		
day200MovingAvg:"200 Day Moving Average",		
day50MovingAvg:"50 Day Moving Average",		
maxChangePercent:"Max Change Percentage",		
year5ChangePercent:"5 Year Change Percentage",		
year2ChangePercent:"2 Year Change Percentage",		
year1ChangePercent:"1 Year Change Percentage",		
ytdChangePercent:"YTD Change Percentage",		
month6ChangePercent:"6 Month Change Percentage",		
month3ChangePercent:"3 Month Change Percentage",		
month1ChangePercent:"1 Month Change Percentage",		
day30ChangePercent:"30 Day Change Percentage",		
day5ChangePercent:"5 Day Change Percentage"},
    priceTargetSeries: [
      {
        data: [
          {
            x: "52-Week Trading Range",
            y: [1, 5]
          },
          {
            x: "Current Analyst Forecast",
            y: [4, 6]
          }
        ]
      }
    ],
    priceTargetChartOptions: {
      fill: {
        colors: ["#1c4966"]
      },

      chart: {
        type: "rangeBar",
        decimalsInFloat: 2
      },
      plotOptions: {
        bar: {
          decimalsInFloat: 2,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        decimalsInFloat: 2
      }
    },

    priceChartOptions: {
      chart: {},
      dataLabels: {
        enabled: false,
      }
    },
    priceChartSeries: [
      {
        name: "Closing Price",
        data: [1, 2, 3]
      }
    ]
  }),
  watch:{
    tabs2: function(val) {
      var size = 52;
      console.log('HIIII');
      if(val == 3){
        //Capital Stats
        size = 30;
      }
      else if (val == 4){
        size = 25
      }
    this.statsStyle="height:" + size + "rem;overflow-top:scroll;margin:10px 0px 5% 0px";
    this.newsOuterStyle="overflow-top:scroll;margin:10px 0px 5% 0px;height:" + size  +"rem";
    this.newsInner= "overflow-y:scroll;max-height:" + (size - 7)  +"rem";
    }
  },
  methods: {
    get_filings() {
      this.alert = false;
      this.items.length = 0;
      this.loading = true;
      console.log(config);
      let link =
        base_link + "info/company-profile/" + this.newTicker.toUpperCase();
      Axios.get(link, config).then(Response => {
        //stuff = Object;
        console.log(Response);
        this.items = [];
        this.items.length = 27; 
        this.multiples = [];
        this.capitalStats = [];
        this.peers=[];
        this.company = Response.data.company;
        this.key_stats = Response.data.stats;
        this.analyst_recommendations = Response.data.analyst_recommendations;
        this.price_target = Response.data.price_target;
        this.filings = Response.data.filings;
        this.news = Response.data.news;
        this.logo = Response.data.logo.url;
        for (var i = 0; i < Response.data.peers.length; i++) {
          this.peers = this.peers + Response.data.peers[i] + " ";
        }
        this.peers;
        this.loading = false;
        this.test = true;
        var temp = {};
        this.financialStats = [{name:this.cleanedNames["revenue"] , val: this.key_stats["revenue"]},
{name:this.cleanedNames["revenuePerShare"] , val: this.key_stats["revenuePerShare"]},
{name:this.cleanedNames["revenuePerEmployee"] , val: this.key_stats["revenuePerEmployee"]},
{name:this.cleanedNames["grossProfit"] , val: this.key_stats["grossProfit"]},
{name:this.cleanedNames["EBITDA"] , val: this.key_stats["EBITDA"]},
{name:this.cleanedNames["profitMargin"] , val: this.key_stats["profitMargin"]}];
        this.basicStats = [{name:this.cleanedNames["currentPrice"] , val: this.key_stats["currentPrice"]},
{name:this.cleanedNames["marketcap"] , val: this.key_stats["marketcap"]},
{name:this.cleanedNames["sharesOutstanding"] , val: this.key_stats["sharesOutstanding"]},
{name:this.cleanedNames["float"] , val: this.key_stats["float"]},
{name:this.cleanedNames["beta"] , val: this.key_stats["beta"]},
{name:this.cleanedNames["peRatio"] , val: this.key_stats["peRatio"]},
{name:this.cleanedNames["putCallRatio"] , val: this.key_stats["putCallRatio"]},];

this.priceStats = [{name:this.cleanedNames["week52high"] , val: this.key_stats["week52high"]},
{name:this.cleanedNames["week52low"] , val: this.key_stats["week52low"]},
{name:this.cleanedNames["week52change"] , val: this.key_stats["week52change"]*100},
{name:this.cleanedNames["maxChangePercent"] , val: this.key_stats["maxChangePercent"]*100},
{name:this.cleanedNames["year5ChangePercent"], val: this.key_stats["year5ChangePercent"]*100},
{name:this.cleanedNames["year1ChangePercent"], val: this.key_stats["year1ChangePercent"]*100},
{name:this.cleanedNames["ytdChangePercent"] , val: this.key_stats["ytdChangePercent"]*100},
{name:this.cleanedNames["month6ChangePercent"] , val: this.key_stats["month6ChangePercent"]*100},
{name:this.cleanedNames["month1ChangePercent"], val: this.key_stats["month1ChangePercent"]*100},
{name:this.cleanedNames["day5ChangePercent"] , val: this.key_stats["day5ChangePercent"]*100},
{name:this.cleanedNames["avg30Volume"] , val: this.key_stats["avg30Volume"]},
{name:this.cleanedNames["avg10Volume"] , val: this.key_stats["avg10Volume"]},];

this.dividendStats = [{name:this.cleanedNames["ttmEPS"] , val: this.key_stats["ttmEPS"]},
{name:this.cleanedNames["ttmDividendRate"] , val: this.key_stats["ttmDividendRate"]},
{name:this.cleanedNames["dividendYield"] , val: this.key_stats["dividendYield"]}];
this.eventsStats = [{name:this.cleanedNames["nextDividendDate"] , val: this.key_stats["nextDividendDate"]},
{name:this.cleanedNames["exDividendDate"] , val: this.key_stats["exDividendDate"]},
{name:this.cleanedNames["nextEarningsDate"] , val: this.key_stats["nextEarningsDate"]},
{name:"52 Week High Date" , val: this.key_stats["week52highDate"]},
{name:"52 Week Low Date", val: this.key_stats["week52lowDate"]}];

this.items = [{name:this.cleanedNames["marketcap"] ,val: this.key_stats["marketcap"]},
{name:this.cleanedNames["week52high"] ,val: this.key_stats["week52high"]},
{name:this.cleanedNames["week52low"] ,val: this.key_stats["week52low"]},
{name:this.cleanedNames["week52change"] ,val: this.key_stats["week52change"]},
{name:this.cleanedNames["sharesOutstanding"] ,val: this.key_stats["sharesOutstanding"]},
{name:this.cleanedNames["avg30Volume"] ,val: this.key_stats["avg30Volume"]},
{name:this.cleanedNames["avg10Volume"] ,val: this.key_stats["avg10Volume"]},
{name:this.cleanedNames["float"] ,val: this.key_stats["float"]},
{name:this.cleanedNames["ttmEPS"] ,val: this.key_stats["ttmEPS"]},
{name:this.cleanedNames["ttmDividendRate"] ,val: this.key_stats["ttmDividendRate"]},
{name:this.cleanedNames["dividendYield"] ,val: this.key_stats["dividendYield"]},
{name:this.cleanedNames["nextDividendDate"] ,val: this.key_stats["nextDividendDate"]},
{name:this.cleanedNames["exDividendDate"] ,val: this.key_stats["exDividendDate"]},
{name:this.cleanedNames["nextEarningsDate"] ,val: this.key_stats["nextEarningsDate"]},
{name:this.cleanedNames["peRatio"] ,val: this.key_stats["peRatio"]},
{name:this.cleanedNames["beta"] ,val: this.key_stats["beta"]},
{name:this.cleanedNames["day200MovingAvg"] ,val: this.key_stats["day200MovingAvg"]},
{name:this.cleanedNames["day50MovingAvg"] ,val: this.key_stats["day50MovingAvg"]},
{name:this.cleanedNames["maxChangePercent"] ,val: this.key_stats["maxChangePercent"]},
{name:this.cleanedNames["year5ChangePercent"] ,val: this.key_stats["year5ChangePercent"]},
{name:this.cleanedNames["year2ChangePercent"] ,val: this.key_stats["year2ChangePercent"]},
{name:this.cleanedNames["year1ChangePercent"] ,val: this.key_stats["year1ChangePercent"]},
{name:this.cleanedNames["ytdChangePercent"] ,val: this.key_stats["ytdChangePercent"]},
{name:this.cleanedNames["month6ChangePercent"] ,val: this.key_stats["month6ChangePercent"]},
{name:this.cleanedNames["month3ChangePercent"] ,val: this.key_stats["month3ChangePercent"]},
{name:this.cleanedNames["month1ChangePercent"] ,val: this.key_stats["month1ChangePercent"]},]
;
this.capitalStats = [{ name: this.cleanedNames["totalCash"], val: this.key_stats["totalCash"] },
{ name: this.cleanedNames['currentDebt'], val: this.key_stats['currentDebt'] },
{ name: this.cleanedNames["marketcap" ], val: this.key_stats["marketcap" ] },
{ name: this.cleanedNames['sharesOutstanding'], val: this.key_stats['sharesOutstanding'] },
{ name: this.cleanedNames["beta"], val: this.key_stats["beta"] },
{ name: this.cleanedNames['debtToEquity'], val: this.key_stats['debtToEquity'] }
  
]

        for (var x in this.key_stats) 
            {            
            if (x == 'enterpriseValueToRevenue' || x == 'priceToSales' || x == 'priceToBook' || x == 'forwardPERatio' || x=='beta'
            || x=='pegRatio'|| x=='peHigh'|| x=='peLow'){
            temp = {'name':  this.cleanedNames[x] , "val": this.key_stats[x]};
            console.log(x);
            this.multiples.push(temp);
          }

        }

        temp = {
          name: "EV/EBITDA",
          val:
            parseFloat(this.key_stats["enterpriseValue"]) /
            parseFloat(this.key_stats["EBITDA"])
        };
        this.multiples.push(temp);
        temp = {
          name: "MarketCap/Revenue",
          val:
            parseFloat(this.key_stats["marketcap"]) /
            parseFloat(this.key_stats["totalRevenue"])
        };
        this.multiples.push(temp);

        temp = {
          name: "52 Week Trading Range",
          val:
            this.key_stats["week52low"] + " - " + this.key_stats["week52high"]
        };
        this.items.push(temp);
        this.chartingVals = Response.data.charting_yearly_vals;
        this.chartingTime = Response.data.charting_yearly_time;

        this.priceChartOptions = {
          chart: {},
          xaxis: {
            categories: this.chartingTime,
            labels:{
              show:false,
            }
          }
        };

        (this.priceChartSeries = [
          {
            name: "Closing Prices",
            data: this.chartingVals
          }
        ]),
          //this.ohlcv = Response.data.charting_yearly;
          (this.series = [
            this.analyst_recommendations.ratingSell,
            this.analyst_recommendations.ratingUnderweight,
            this.analyst_recommendations.ratingHold,
            this.analyst_recommendations.ratingOverweight,
            this.analyst_recommendations.ratingBuy
          ]);
        var tradingRange = [
          Number(this.key_stats["week52low"]).toFixed(2),
          Number(this.key_stats["week52high"]).toFixed(2)
        ];
        var forecast = (this.priceTargetSeries = [
          {
            data: [
              {
                x: "52-Week Trading Range",
                y: [
                  Number(this.key_stats["week52low"]).toFixed(2),
                  Number(this.key_stats["week52high"]).toFixed(2)
                ]
              },
              {
                x: "Current Analyst Forecast",
                y: [
                  this.price_target.priceTargetLow,
                  this.price_target.priceTargetHigh
                ]
              }
            ]
          }
        ]);
        //var count = Object.keys(Response.data.filings).length;
        //for (let i = 0; i < count; i++) {
        // this.items.push({
        //   title: Response.data.filings[i].title,
        //   link: Response.data.filings[i].lin

        // });

        //var count = Object.keys(Response.data.filings).length;
        //for (let i = 0; i < count; i++) {
        // this.items.push({
        //   title: Response.data.filings[i].title,
        //   link: Response.data.filings[i].lin

        // });
      }).catch(error => {
          this.alert = true
          this.loading=false
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
        
    },
    get_link(value, ticker) {
      let link =
        base_link +
        "info/financials/" +
        value +
        "/" +
        this.newTicker +
        "/Annual/" +
        this.numPeriods +
        "/csv/";
      db.collection('limits').doc(this.statementDocId).update({
        'statements':  firebase.firestore.FieldValue.increment(-1),
      });
      this.get_csv(link, value);
    },
    forceFileDownload(data, type) {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url); //or any other extension
      var filename = this.newTicker + "_" + type + ".csv";
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    async get_csv(link, type) {
      const data = await this.get_csv_data(link);
      const csvStringifier = createCsvStringifier({ header: data[1] });
      var values =
        csvStringifier.getHeaderString() +
        csvStringifier.stringifyRecords(data[0]);
      this.forceFileDownload(values, type);
    },
    async get_csv_data(link) {
      var csv_data = [];
      const response = await Axios.get(link, config);
      for (var i in response.data) {
        csv_data.push(response.data[i]);
      }
      var headers = [""];
      for (var i = 1; i < csv_data.length - 1; i++) {
        headers.push(csv_data[0][i]);
      }
      return [csv_data, headers];
    }
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
   mounted(){
    var temp;
    db.collection("limits").where('id', 'array-contains', uid )
    .onSnapshot((response) => {
        console.log("Current data: ", response.docs[0].data());
        this.statements = response.docs[0].data().statements;
        this.statementDocId = response.docs[0].id;
    });
  }
};

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
