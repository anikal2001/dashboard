<template>
  <div>
    <div>
    </div>
    <div class="text-center" v-if='loading' style='z-index:20;'>
                <v-progress-circular color="#08182b" :indeterminate='true'></v-progress-circular>
                <p>Loading...</p>
    </div>
    <div  v-if='!loading' style='margin-left:5vw;margin-right:5vw;'>
     
                    <v-text-field
                      v-model="team"
                      append-icon="mdi-magnify"
                      label="Team Name"
                      single-line
                      hide-details
                    ></v-text-field>
            
    <v-data-table
    
    :headers="headers"
    :items="items"
    :disable-pagination='true'
    :hide-default-footer='true'
    :search="team"
    style='font-size:16px;'
  ></v-data-table>
  </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
var token = "Token " + alpaca_key;
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
let config = {
  headers: {
    Authorization: token
  }
};
export default {
  name: "ComingSoon",
  data(){
      return{
        team:"",
        items: [],
        loading:true, 
        headers: [
          {
            text: 'Rank',
            sortable: false,
            value: 'rank',
          },
          {
            text: 'Name',
            sortable: false,
            value: 'name',
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