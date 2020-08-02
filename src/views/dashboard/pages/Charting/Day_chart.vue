<template>
  <div style="background-color:white;">
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
import DownloadButton from "./DownloadButton.vue";
import Printable from './Printable.js'
import Axios from "axios";
import * as Cookies from "js-cookie";
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import LineChart from "./Equity.vue";
export default {
  name: "DayChart",
  components: { LineChart, DownloadButton },
  data() {
    return {
      equity: [],
      labels: [],
      loaded: false,
      package: "",
      packageName: "",
      dailyPng: null
    };
  },
  created() {
    Axios.get(base_link + "info/charting/1D/1Min/", config).then(
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
      let hours = new_date.getHours();
      let minutes = new_date.getMinutes().toString();
      if (minutes.length <= 1) {
        minutes = `0${new_date.getMinutes()}`;
      }
      new_date = `${hours}:${minutes}`;
      return new_date;
    },
    setDailyPng(payload) {
      this.dailyPng = payload;
    }
  }
};
</script>

<style>
</style>