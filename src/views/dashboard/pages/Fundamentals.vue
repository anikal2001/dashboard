<template>
  <div>
    <v-card class="px-5 py-10" style='margin:1vw;'>
      <p> Available Statements: {{statements}}</p>
      <v-container>
        <ticker v-if='statements> 0' @export="get_csv" @send_link="get_link"></ticker>
        
        <v-card-text v-if='statements == 0' style='text-align:center;font-size:25px'> <v-container>You have exceeded your statement exports. Contact admin@rcfta.ca to get more.</v-container> </v-card-text>
        
      </v-container>
    </v-card>
  </div>
</template>

<script>
const createCsvStringifier = require("csv-writer").createArrayCsvStringifier;
import Axios from "axios";
import firebase from "firebase";
import * as Cookies from "js-cookie";
import db from "./db.js";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
const uid = Cookies.get("uid");
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
      Ticker: null,
      statement_type: null,
      items: [],
      headers: [],
      statements:null,
      statementDocId:null, 
      url: "https://78.media.tumblr.com/tumblr_m39nv7PcCU1r326q7o1_500.png"
    };
  },
  methods: {
    get_link(value) {
      this.loading = true;
      this.link = value[0] + "/json/";
      this.csv_link = value[0] + "/csv/";
      this.Ticker = value[3]
      this.statement_type = value[2]
      this.items.length = 0;
      this.headers.length = 0;
      this.get_csv();
      db.collection('limits').doc(this.statementDocId).update({
        'statements':  firebase.firestore.FieldValue.increment(-1),
      });
      //Axios.get(this.link, config).then(Response => {
      //  this.populate_table(Response.data);
    //    console.log(this.link)
     // });
    },
    forceFileDownload(data) {
      const blob = new Blob([data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url); //or any other extension
      var filename = this.Ticker + "_" + this.statement_type+ ".csv";
      a.setAttribute("download", filename);
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
</script>

<style>
</style>