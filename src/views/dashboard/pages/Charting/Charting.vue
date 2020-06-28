<template>
  
    <base-material-card color="#08182b" class="pa-0 my-10">
      <template v-slot:heading>
        <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
          <v-tab class="mr-3">
            Security Charting
          </v-tab>
          <v-tab class="mr-3">
            Portfolio: IntraDay
          </v-tab>
          <v-tab class="mr-3">
           Portfolio: 1 Month
          </v-tab>
          <v-tab class="mr-3">
           Portfolio: 1 Year
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tabs" class="transparent">
        <v-tab-item v-for="n in 4" :key="n">
          <div>
            <v-card-text>
          <v-row v-if='n==1' style='height:95vh;'>
          <v-col cols="8" >
          <div style='height:100%;'>
          <div style='height:100%;width:100%;' id="tradingview_9cbb1"></div>
          </div>
          </v-col>
        <v-col cols="4">
           <div style='height:33.33%;' >
          <div style='height:100%;width:100%;' id="tradingview_9cbb"></div>
          </div>
           <div style='height:33.33%;' >
          <div  style='height:100%;width:100%;' id="tradingview_9cb"></div>
          </div>
           <div  style='height:33.33%;'>
          <div style='height:100%;width:100%;' id="tradingview_9c"></div>
          </div>
        </v-col>
      </v-row>
              <EquityGraph v-if="n == 4"></EquityGraph>
              <month-chart v-if="n == 3"></month-chart>
              <day-chart v-if="n == 2"></day-chart>
            </v-card-text>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>

</template>

<script>
import EquityGraph from "./EquityGraph.vue";
import MonthChart from "./Month_Chart.vue";
import DayChart from "./Day_chart.vue";
export default {
  name: "Charting",
  components: {
    EquityGraph,
    MonthChart,
    DayChart
  },
  data(){
    return{
      tabs: 0,
    }
  },
  mounted() {
    new TradingView.widget({
      autosize: true,
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
    new TradingView.widget({
      autosize: true,
      symbol: "US500",
      interval:1,
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      hide_top_toolbar: true,
      enable_publishing: false,
      range: "ytd",
      allow_symbol_change: true,
      container_id: "tradingview_9cbb"
    });
    new TradingView.widget({
      autosize: true,
      symbol: "US30",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      interval: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      hide_top_toolbar: true,
      enable_publishing: false,
      range: "ytd",
      allow_symbol_change: true,
      container_id: "tradingview_9cb"
    });
    new TradingView.widget({
      autosize: true,
      symbol: "US100",
      timezone: "Etc/UTC",
      theme: "light",
      interval: "1",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      hide_top_toolbar: true,
      enable_publishing: false,
      range: "ytd",
      allow_symbol_change: true,
      container_id: "tradingview_9c"
    });

  }
};
</script>

<style>
</style>