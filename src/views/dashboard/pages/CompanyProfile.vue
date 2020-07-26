<template>
  <v-container fluid>
    <v-card style=;margin-left:8px; class="pa-5" tile>
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
      <v-col cols="7">
        <base-material-card
          style="height:90%;overflow-top:scroll;margin:25px 10px 25px 0px"
          color="#08182b"
          title="Company Profile"
          class="mx-2 pa-5"
          v-if="test"
        >
        
          <v-card flat style="height:inherit">
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
            <v-card-subtitle>Peer Group: {{this.peers}}</v-card-subtitle>
            
          </v-card>
        </base-material-card>
      </v-col>
      <v-col cols="5">
        <v-card v-if="test" style="height:95%">
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
      <v-col cols="7">
        <base-material-card
          style="max-height:100%;overflow-top:scroll;margin:0px 0px 5% 0px"
          color="#08182b"
          class="mx-2 pa-5"
          v-if="test"
        >
          <template v-slot:heading>
            <v-tabs v-model="tabs3" background-color="transparent" slider-color="white">
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-chart-pie</v-icon>Key Stats
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-target</v-icon>Multiples
              </v-tab>
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-wallet</v-icon>Capital Stucture
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs3" class="transparent">
            <v-tab-item v-for="w in 3">
              <div v-if="w==1">
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
                  :items="items"
                  :disable-pagination="true"
                  :hide-default-footer="true"
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
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
      <v-col cols="5">
        <v-card v-if="test" style="margin: 0px 0px 25px 0px;">
          <v-row style="display:flex;flex-direction:column;">
            <v-card-title class="mx-2 display-2">Financial Statements</v-card-title>
            <v-text-field
              v-model="numPeriods"
              filled
              outlined
              :rules="annualRules"
              style="border-radius:3px; width:90%; margin: 20px 0px 0px 20px;"
              label="Number of Periods"
              required
            />
          </v-row>
          <v-container style="display:flex;justify-content:space-around;">
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
        </v-card>

        <base-material-card
          style="overflow-top:scroll;margin:50px 0px 5% 0px"
          color="#08182b"
          class
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
              <v-tab class="mr-3">
                <v-icon class="mr-2">mdi-calendar</v-icon>Upcoming Events
              </v-tab>
            </v-tabs>
          </template>
          <v-tabs-items v-model="tabs2" class="transparent">
            <v-tab-item v-for="n in 3" :key="n">
              <div style="overflow-y:scroll;max-height:360px" v-if="n==1">
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

              <div style="overflow-y:scroll;max-height:360px" v-if="n==2">
                <div>
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
                </div>
              </div>
              <div v-if="n==3">
                <p>
                  <b>Next Earnings Date:</b>
                  {{key_stats.nextEarningsDate}}
                  <br />
                  <b>Next Dividend Date:</b>
                  {{key_stats.nextDividendDate}}
                </p>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </base-material-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <base-material-card
          style="max-height:100%;overflow-top:scroll;margin:0px 0px 5% 0px"
          color="#08182b"
          class="mx-2 pa-5"
          v-if="test"
          icon="mdi-glasses"
          title="Analyst Recommendations"
        >
        <v-row>
          <v-col cols='6'>
        <h2>Recommendations Distribution</h2>
          </v-col>
          <v-col cols='6'>
        <h2 style="align-items: center;">Price Targets</h2>
          </v-col>
        </v-row>
          <div style="margin-left:0vw;width:100%;">
            <v-row>
              <v-col cols="6" style="border-right: 1px solid gray;">
                <div
                  style="display:flex;margin: 0px 0px 25px 10px;flex-direction: row;justify-content: center;align-items: center;"
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

                  <div style="justify:center;margin: 40px 0px 25px 25px;width:25vw; ">
                    <apexchart type="pie" width="100%" :options="chartOptions" :series="series"></apexchart>
                  </div>
                </div>
              </v-col>
              <v-col cols="5" style="display:flex;margin: 0px 0px 25px 10px;flex-direction: row;justify-content: center;align-items: center;">
                <div >
                  <div>
                    Average Price Target: ${{price_target.priceTargetAverage}}
                    <br />
                    Highest Price Target: ${{price_target.priceTargetHigh}}
                    <br />
                    Lowest Price Target: ${{price_target.priceTargetLow}}
                    <br />
                    Number of Anlysts: {{price_target.numberOfAnalysts}}
                    <br />
                  </div>
                </div>
                <div>
                  <apexchart
                    type="rangeBar"
                    width="350"
                    :options="priceTargetChartOptions"
                    :series="priceTargetSeries"
                  ></apexchart>
                </div>
              </v-col>
            </v-row>
          </div>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TradingVue from "trading-vue-js";
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
import fundamentals from "../components/core/StatementExtractor.vue";
import VueApexCharts from "vue-apexcharts";
import * as Cookies from "js-cookie";
import Axios from "axios";
import { hello } from "./CSV-writing.js";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
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
    chartingTime: [],
    chartingVals: [],
    multiples: [],
    capitalStats: [],
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
        width: 600
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
              position: "bottom"
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
    tabs2: 4,
    tabs3: 3,
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
      maxChangePercent: "Max Change Percentage",
      year5ChangePercent: "5 Year Holding Period Return",
      year2ChangePercent: "2 Year Holding Period Return",
      year1ChangePercent: "1 Year Holding Period Return",
      ytdChangePercent: "Year to Date Return",
      month6ChangePercent: "6 Month Holding Period Return",
      month3ChangePercent: "3 Month Holding Period Return",
      month1ChangePercent: "1 Month Holding Period Return",
      day30ChangePercent: "30 Day Holding Period Return",
      day5ChangePercent: "5 Day Holding Period Return",
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
      currentDebt: "Current Debt"
    },
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
        this.multiples = [];
        this.capitalStats = [];
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
        for (var x in this.key_stats) {
          if (
            x == "marketcap" ||
            x == "sharesOutstanding" ||
            x == "ttmEPS" ||
            x == "dividendYield" ||
            x == "peRatio" ||
            x == "beta" ||
            x == "week52high" ||
            x == "week52low" ||
            x == "float" ||
            x == "sharesOutstanding" ||
            x == "week52Change"
          ) {
            temp = { name: this.cleanedNames[x], val: this.key_stats[x] };
            console.log(x);
            this.items.push(temp);
            }
            
            else if (x == 'enterpriseValueToRevenue' || x == 'priceToSales' || x == 'priceToBook' || x == 'forwardPERatio' || x=='beta'
            || x=='pegRatio'|| x=='peHigh'|| x=='peLow'){
            temp = {'name':  this.cleanedNames[x] , "val": this.key_stats[x]};
            console.log(x);
            this.multiples.push(temp);
          }

          if (
            x == "totalCash" ||
            x == "currentDebt" ||
            x == "marketcap" ||
            x == "debtToEquity" ||
            x == "beta"
          ) {
            temp = { name: this.cleanedNames[x], val: this.key_stats[x] };
            console.log(x);
            this.capitalStats.push(temp);
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
            categories: this.chartingTime
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
