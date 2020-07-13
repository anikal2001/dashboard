<template>
    <base-material-card
      icon="mdi-chart-areaspline"
      title="My Portfolio"
      color="#08182b"
      class=" scroll px-5 py-3"
      style="height:100%;margin-left:15px;"
    >
    <div style="overflow-y:auto;max-height:520px;">
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Symbol
            </th>
            <th class="primary--text">
              Quantity
            </th>
            <th class="primary--text">
              VWAP
            </th>
            <th class="primary--text">
              Current Price
            </th>
            <th class="primary--text">
              Market Value
            </th>
            <th class="text-right primary--text">
              Total Profit
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(task,i) in portfolio_values[0]" :key='i' >
            <td>{{task.symbol}} </td>
            <td>{{task.qty}} </td>
            <td>{{task.entryPrice}}</td>
            <td>{{task.currentPrice}}</td>
            <td>${{formatNumber(task.marketValue)}}</td>
            <td class="text-right">
              <v-chip :color="getColor(task.returnPercent)" dark>
              {{task.returnPercent}}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      </div>
    </base-material-card>
</template>

<script>
import Axios from 'axios'
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get('alpaca_key')
const base_link = Cookies.get("link");
var token = 'Token ' + alpaca_key
let config = {
  headers: {
    Authorization: token
  }
};
export default {
    name: 'Portfolio',
    data(){
        return{
          portfolio_values: null,
    }
    },
    created(){
      this.portfolio_values = []
      this.get_values(this.portfolio_values);
      setInterval(() => {
       console.log('portfolio updated') ;
       this.get_values(this.portfolio_values);
      }, 30000);
      
    },
    methods:{
      get_values(values){
        Axios.get(base_link + 'info/pos/', config)
        .then((Response)=>{
          values.push(Response.data)
        })
        .catch( (error)=> {
          if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
        });
      },
      getColor(item) {
        item = item.toString();
        if (item.charAt(0) == "-") return "red";
        else return "green";
    },
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      }
    }

}
</script>

<style>

</style>