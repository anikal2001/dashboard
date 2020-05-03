<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <ChartBar></ChartBar>
    </v-row>
      <v-row>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="#08182b"
          icon="mdi-chart-line"
          title="Portfolio Value"
          value="$50,000"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="#08182b"
          icon="mdi-chart-pie"
          title="Equity"
          value="$75,521"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="#08182b"
          icon="mdi-cash-multiple"
          title="Buying Power"
          value="$ 34,245"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="red"
          icon="mdi-arrow-down-bold"
          title="Profit & Loss"
          value="-$184"
          sub-title ='12%'
        />
      </v-col>
      <ticker></ticker>
      <v-col
        cols="12"
        md="6"
        class="mt-6"
      >
      <portfolio-chart></portfolio-chart>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class = 'mt-6'
      >
      <news-bar></news-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'
let config = {
  headers: {
    "Authorization": "Token 417f59ad885874647d9cc51c5a1834f30d955162",
  }
}
import Ticker from './components/core/Ticker.vue'
import PortfolioChart from './components/core/PortfolioChart.vue'
import NewsBar from './components/core/NewsBar.vue'
import ChartBar from './components/core/ChartBar.vue'
  export default {
    name: 'Dashboard',
    components:{
      Ticker,
      PortfolioChart,
      NewsBar,
      ChartBar
    },
    data () {
      return {
        acc_details: null
        }

    },
    created(){
      this.acc_details = []
      this.material_chart(this.acc_details)
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
      material_chart(details){
      let link = 'https://rcsandbox.ca/info/accountUpdate/'
      Axios.get(link, config)
      .then(function (Response){
        this.details.push(Response.data)
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

    }
    },
  }
</script>
