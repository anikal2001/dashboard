<template>
  <div class="ticker-form">
      <v-form ref="form" v-model="valid" style="width:100%;" lazy-validation>
        
          <v-row align-content="center" justify='center'  >
            <v-col class="d-flex" cols="12" sm="3">
              <v-btn
              style=""
              medium
              dark
              v-on:click='getIncomeStatement'
              color="rgb(17, 25, 69)">Income Statement</v-btn>
            </v-col>
            <v-col class="d-flex" cols="12" md="3">
              <v-btn
              style=""
              medium
              dark
              v-on:click='getBalanceSheet'
              color="rgb(17, 25, 69)">Balance Sheet</v-btn>
            </v-col>

            <v-col class="d-flex" cols="12" md="3">
            <v-btn
              style=""
              medium
              dark
              v-on:click='getCashFlow'
              color="rgb(17, 25, 69)">Statement of Cash Flows</v-btn>
            </v-col>


            <v-col class="d-flex" cols="12" md="3">
              <v-text-field
                v-model="numPeriods"
                filled
                outlined
                :rules="annualRules"
                style="border-radius:3px;"
                label="Number of Periods"
                required
              />
            </v-col>

            </v-col>
            
          </v-row>
        <v-row>
        <div class="d-flex" cols="12" md="2" style='margin-righ:0px;' justify='right'>
              <v-btn
                :disabled="!valid"
                color="#08182b"
                class="white--text"
                large
                @click="Ordering()"
                justify='right'
              >Export</v-btn>
            </div>
        </v-row>
      </v-form>
  </div>
</template>

<script>
import Axios from "axios";
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
const config = {
  headers: {
    Authorization: "Token 417f59ad885874647d9cc51c5a1834f30d955162"
  }
};
export default {
  name: "Ticker",
  props:{
    Ticker:String,
  },
  data: () => ({
    valid: true,
    show: false,
    period_items: ["Annual", "Quarter"],
    income_items: ["Statement of Cash Flows", "Income Statement", "Balance Sheet"],
   // Ticker: "",
    statement: null,
    period: null,
    numPeriods: null,
    alert: false,
    nameRules: [v => !!v || "Ticker is required"],
    annualRules: [
      v => v > 0 || "Quantity must be greater than 0",
      v => v <= 4 || "Quantity must be less than equal to 4",
      v => Number.isInteger(Number(v)) || "Quantity must be an integer"
    ],
    quarterRules: [
      v => v > 0 || "Quantity must be greater than 0",
      v => v <= 12 || "Quantity must be less than equal to 12",
      v => Number.isInteger(Number(v)) || "Quantity must be an integer"
    ]
  }),
  methods: {
    getCashFlow()
    {
      this.statement = "Statement of Cash Flows";
      this.Ordering();
    },
    getBalanceSheet(){
      this.statement = "Balance Sheet";
      this.Ordering();
    },
    getIncomeStatement(){
      this.statement = "Income Statement";
      this.Ordering();
    },
    Ordering(event) {
      this.$refs.form.validate();
      let type = null;
      this.show = true
      let link = base_link + "info/financials/";
      if (this.statement === "Statement of Cash Flows") {
        type = "cash";
        link =
          link +
          "cash/" +
          this.Ticker +
          "/" +
          this.period +
          "/" +
          this.numPeriods
      } else if (this.statement === "Income Statement") {
        type = "income";
        link =
          link +
          "income/" +
          this.Ticker +
          "/" +
          this.period +
          "/" +
          this.numPeriods
      } else {
        type = "balance";
        link =
          link +
          "balance/" +
          this.Ticker +
          "/" +
          this.period +
          "/" +
          this.numPeriods
      }
      this.$emit("send_link", [link, type]);
    }
  }
};
</script>
<style scoped>
.ticker-form {
 /* display: flex;
  justify-content: center;
  width: 100%;
  align-content: center;*/
}
#title {
  /*color: white;
  padding: 0;
  justify-content: flex-end;
  align-items: baseline;*/
}
</style>
