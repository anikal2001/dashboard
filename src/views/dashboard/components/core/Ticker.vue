<template>
<div class="ticker-form" >
<v-card color="#08182b"  width="100%">
  <v-form v-model="valid" >
    <v-container >
      <v-row align-content="center" justify="center">
        <v-col class="d-flex" style = "padding-right:0px; justify-content:center;" cols="12">
        <v-card-title id="title" class="display-4">Trade</v-card-title>
        </v-col>
        <v-col
          class="d-flex"
          cols="12"
          md="2"
        >
          <v-text-field
            v-model="Ticker"
            :rules="nameRules"
            background-color="white"
            filled
            style="border-radius:3px;"
            label="Ticker"
            required
          ></v-text-field>
        </v-col>

        <v-col
          class="d-flex"
          cols="12"
          md="1"
        >
          <v-text-field
            v-model="Quantity"
            :rules="quantityRules"
            filled
            style="border-radius:3px;"
            background-color="white"
            label="Quantity"
            required
          ></v-text-field>
        </v-col>

        <v-col class="d-flex" cols="12" sm="2">
        <v-select
           background-color="white"
          :items="items"
          label="Position Type"
          filled
          style="border-radius:3px;"
        ></v-select>
      </v-col>

        <v-col class="d-flex" cols="12" sm="2">
        <v-select
           background-color="white"
          :items="order"
          v-model="order_items"
          label="Order Type"
          filled
          style="border-radius:3px;"
        ></v-select>
      </v-col>
      <v-col
          class="d-flex"
          cols="12"
          md="2"
          v-if="order_items== 'Stop Limit' || order_items== 'Stop' "
        >
          <v-text-field
            class="text-field"
            v-model="Ticker"
            background-color="white"
            filled
            style="border-radius:3px;"
            label="Limit Price"
            required
          ></v-text-field>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        md="2"
        v-if="order_items== 'Stop Limit' || order_items== 'Stop' "
      >
        <v-text-field
          v-model="Ticker"
          background-color="white"
          v-show="order_items== 'Stop Limit' || order_items== 'Stop' "
          filled
          style="border-radius:3px;"
          label="Stop Price"
          required
        ></v-text-field>
      </v-col>


      <v-col class="d-flex" cols="12" md="2">
        <v-select
           background-color="white"
          :items="tof"
          label="Time in Force"
          filled
          style="border-radius:3px;"
        ></v-select>
      </v-col>
      <v-col class ="d-flex" cols="12" md="2">
        <v-btn large >Submit</v-btn>
      </v-col>
      </v-row>
    </v-container>
  </v-form>
</v-card>
</div>
</template>


<script>
  export default {
    name: 'Ticker',
    data: () => ({
      items: ['Buy', 'Sell'],
      tof: [ 'DAY', 'GTC', 'OPG', 'CLS', 'IOC', 'FOK'],
      order: ['Market', 'Limit', 'Stop', 'Stop Limit'],
      order_items:  ['Market', 'Limit', 'Stop', 'Stop Limit'],
      valid: false,
      selected: null,
      Ticker: '',
      nameRules: [
        v => !!v || 'Ticker is required',
      ],
      Quantity: 0,
      quantityRules: [
        v => v > 0 || 'Quantity must be greater than 0',
        v => Number.isInteger(!v.data) || 'Quantity must be an integer'
      ],
    }),
    methods:{
      order_stock(vm){
        Axios.get('https://rcsandbox.ca/info/filings/',)
            .then(function (Response){
                var count = Object.keys(Response.data).length;
                for( let i = 0; i < count; i++){
                    vm.push({'Summary':Response.data[i].title,'Link':Response.data[i].link})
                }
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
      Ordering(ticker, qty, side, OT, tof, limitprice, stopPrice){
        link = 'https://rcsandbox.ca/info/order/{ticker}/{qty}/{side}/{orderType}/{tof}/{limitPrice}/{stopPrice}/ '
      }
    }
  }
</script>
<style scoped>
.ticker-form{
  display: flex;
  justify-content: center;
  width:100%;
  align-content: center;
}
#title{
  color: white;
  padding: 0;
  justify-content: flex-end;
  align-items: baseline;
}
</style>