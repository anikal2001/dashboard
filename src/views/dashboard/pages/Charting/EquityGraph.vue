<template>
<div>
  <DownloadButton :name="'daily-graph'" :link="dailyPng" />
      <line-chart
        chart-id="line-daily"
        style="height:500px;"
        v-if="loaded"
        :chart-data="equity_year"
        :chart-labels="labels_year"
        @generate="setDailyPng"
      />
    </div>
</template>

<script>
import DownloadButton from "./DownloadButton.vue";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import LineChart from "./Equity.vue";
import Axios from "axios";

export default {
  name: "EquityGraph",
  components: { LineChart, DownloadButton },
  data: () => ({
    loaded: false,
    labels_year: [],
    equity_year: [],
    labels_day: [],
    equity_day: [],
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  created() {
    this.loaded = false;
    this.Year_equity();
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
    },
    Year_equity() {
      Axios.get("https://rcsandbox.ca/info/charting/1A/1D/", config).then(
        response => {
          var count = Object.keys(response.data).length;
          for (let i = 0; i < count; i++) {
            this.equity_year.push(response.data[i].value);
            let date = this.Date_conversion(response.data[i].timestamp);
            this.labels_year.push(date);
          }
          this.loaded = true;
        }
      );
    }
  }
};
</script>