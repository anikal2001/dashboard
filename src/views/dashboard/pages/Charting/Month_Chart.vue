<template>
  <div>
    <DownloadButton :name="'daily-graph'" :link="dailyPng" />
    <line-chart
      style="height:500px;"
      chart-id="line-daily"
      v-if="loaded"
      :chart-data="equity"
      :chart-labels="labels"
      @generate="setDailyPng"
    />
  </div>
</template>

<script>
import Axios from "axios";
import DownloadButton from "./DownloadButton.vue";
import Printable from './Printable.js'
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import LineChart from "./Equity.vue";
export default {
  name: "MonthChart",
  components: { LineChart, DownloadButton },
  data() {
    return {
      equity: [],
      labels: [],
      loaded: false
    };
  },
  created() {
    Axios.get("https://rcsandbox.ca/info/charting/1M/1D/", config).then(
      response => {
        var count = Object.keys(response.data).length;
        for (let i = 0; i < count; i++) {
          this.equity.push(response.data[i].value);
          let date = this.Date_conversion(response.data[i].timestamp);
          this.labels.push(date);
        }
        this.loaded = true;
      }
    );
  },
  methods: {
    Date_conversion(date) {
      let new_date = new Date(0);
      new_date.setUTCSeconds(date);
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
    }
  }
};
</script>

<style>
</style>