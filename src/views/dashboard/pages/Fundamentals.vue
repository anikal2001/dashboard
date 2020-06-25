<template>
  <div>
    <v-card class="px-5 py-10">
      <v-container>
        <ticker @export="get_csv" @send_link="get_link"></ticker>
        <v-data-table v-if="items.length > 0" :loading="loading" :headers="headers" :items="items"></v-data-table>
      </v-container>
    </v-card>
  </div>
</template>

<script>
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
import ticker from "../components/core/Ticker.vue";
import { hello } from "./CSV-writing.js";
export default {
  name: "Fundamentals",
  components: {
    ticker
  },
  data() {
    return {
      link: null,
      loading: false,
      csv_link: null,
      items: [],
      headers: [],
      url: "https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png"
    };
  },
  methods: {
    get_link(value) {
      this.loading = true;
      this.link = value[0] + "/json/";
      this.csv_link = value[0] + "/csv/";
      this.items.length = 0;
      this.headers.length = 0;
      Axios.get(this.link, config).then(Response => {
        this.populate_table(Response.data);
      });
    },
    forceFileDownload(data) {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url); //or any other extension
      a.setAttribute("download", "download.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    async get_csv() {
      const data = await this.get_csv_data();
      var header_list = [];
      for (var i in this.headers){
        header_list.push(this.headers[i]['text'])
      }
      const csvStringifier = createCsvStringifier({ header: header_list });
      var values = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(data);
      this.forceFileDownload(values)
    },
    async get_csv_data() {
      var csv_data = [];
      const response = await Axios.get(this.csv_link, config);
      for (var i in response.data) {
        csv_data.push(response.data[i]);
      }
      return csv_data;
    },
    populate_table(items) {
      this.headers.push({
        text: "",
        value: "name"
      });
      for (var i = 0; i < items.reportDate.length; i++) {
        this.headers.push({
          text: items.reportDate[i],
          value: items.reportDate[i],
          sortable: true
        });
      }
      var new_obj = {};
      for (var key in items) {
        var new_key = this.normal_names(key);
        new_obj = {
          name: new_key
        };
        for (var j = 0; j < items.reportDate.length; j++) {
          new_obj[items.reportDate[j]] = items[key][j];
        }
        this.items.push(new_obj);
      }
      this.loading = false;
    },
    normal_names(key) {
      key = key.replace(/([A-Z])/g, " $1").trim();
      key = key.substring(0, 1).toUpperCase() + key.substring(1);
      return key;
    }
  }
};
</script>

<style>
</style>