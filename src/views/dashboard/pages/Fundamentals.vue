<template>
  <div>
    <base-material-card title="Fundamentals" color="#08182b" class="px-5 py-10">
      <v-container>
        <ticker @send_link="get_link"></ticker>
        <v-data-table
          v-if="items.length > 0"
          :loading="loading"
          :headers="headers"
          :items="items"
        ></v-data-table>
      </v-container>
    </base-material-card>
  </div>
</template>

<script>
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
export default {
  name: "Fundamentals",
  components: {
    ticker
  },
  data() {
    return {
      link: null,
      loading: false,
      items: [],
      headers: []
    };
  },
  methods: {
    get_link(value) {
      this.loading = true;
      this.link = value[0];
      this.items.length = 0;
      this.headers.length = 0;
      Axios.get(this.link, config).then(Response => {
        this.populate_table(Response.data);
      });
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
      key = key.replace(/([A-Z])/g, ' $1').trim()
      key = key.substring(0, 1).toUpperCase() + key.substring(1)
      return key
    }
  }
};
</script>

<style>
</style>