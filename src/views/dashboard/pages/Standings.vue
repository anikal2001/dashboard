<template>
  <div class="bgimg">
    <div class="middle">
    </div>
    <div class="text-center" v-if='loading' style='z-index:20;'>
                <v-progress-circular value='20' color="#08182b" :indeterminate='true'></v-progress-circular>
                <p>Loading...</p>
    </div>
    <v-data-table
    v-if='!loading'
    :headers="headers"
    :items="items"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
const base_link = Cookies.get("link");
let config = {
  headers: {
    Authorization: token
  }
};
export default {
  name: "ComingSoon",
  data(){
      return{
        items: [],
        loading:true, 
        headers: [
          {
            text: 'Rank',
            sortable: false,
            value: 'rank',
          },
          { text: 'Portfolio Equity', value: 'equity', sortable: true },
          { text: 'Sharpe', value: 'sharpe', sortable:true },
        ],
      }
  },
  mounted(){
    
    Axios.get(base_link+ 'info/standings', config).then(Response => { 
        this.items = Response.data
         this.loading = false;
      });
     
  }
};

</script>

<style>
body,
html {
  height: 100%;
  margin: 0;
}

.bgimg {
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
  color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 25px;
}

.topleft {
  position: absolute;
  top: 0;
  left: 16px;
}

.bottomleft {
  position: absolute;
  bottom: 0;
  left: 16px;
}

.middle {
  position: absolute;
  top: 20%;
  left: 20%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: black;
}

hr {
  margin: auto;
  width: 40%;
}
</style>