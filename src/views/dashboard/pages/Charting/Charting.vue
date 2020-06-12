<template>
  <v-container>
    <base-material-card title="Stock Chart" color="#08182b" class="pa-20 my-10">
      <div class="tradingview-widget-container">
        <div id="tradingview_9cbb1"></div>
      </div>
    </base-material-card>

    <base-material-card color="#08182b" class="pa-20 my-10">
      <template v-slot:heading>
        <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
          <v-tab class="mr-3">
            Daily
          </v-tab>
          <v-tab class="mr-3">
           Monthly
          </v-tab>
          <v-tab class="mr-3">
           Yearly
          </v-tab>
        </v-tabs>
      </template>
      <v-tabs-items v-model="tabs" class="transparent">
        <v-tab-item v-for="n in 3" :key="n">
          <div>
            <v-card-text>
              <EquityGraph v-if="n == 3"></EquityGraph>
              <month-chart v-if="n == 2"></month-chart>
              <day-chart v-if="n == 1"></day-chart>
            </v-card-text>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </base-material-card>
  </v-container>
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
      width: 1000,
      height: 500,
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
};
</script>

<style>
</style>