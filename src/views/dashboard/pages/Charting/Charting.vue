<template>
  <v-container>
    <base-material-card title="Research Any Stock" color="#08182b" class="pa-20 my-10">
    <div class="tradingview-widget-container">
      <div id="tradingview_9cbb1"></div>
    </div>
    </base-material-card>
    <base-material-card title="Yearly Equity Graph" color="#08182b" class="pa-20 my-10">
      <EquityGraph></EquityGraph>
      </base-material-card>
    <base-material-card title="Monthly Equity Graph" color="#08182b" class="pa-20 my-10">
      <month-chart></month-chart>
    </base-material-card>
     <base-material-card title="Daily Equity Graph" color="#08182b" class="pa-20 my-10">
      <day-chart></day-chart>
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