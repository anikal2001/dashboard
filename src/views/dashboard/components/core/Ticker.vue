<template>
  <div class="ticker-form">
    <v-card flat width="100%" height="50%">
      <v-card-title
        style="justify-content:center"
        align="center"
        class="display-4"
      >Get Financial Statement Data</v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fluid>
          <v-row align-content="center" justify="center">
            <v-col class="d-flex" cols="12" sm="3" xl='2'>
              <v-select
                v-model="statement"
                :items="income_items"
                label="Statement Type"
                :rules="[v => !!v || 'Item is required']"
                filled
                outlined
                required
                style="border-radius:3px;"
              />
            </v-col>
            <v-col class="d-flex" cols="12" md="2">
              <v-text-field
                v-model="Ticker"
                :rules="nameRules"
                filled
                outlined
                style="border-radius:3px;"
                label="Ticker"
                required
              />
            </v-col>

            <v-col class="d-flex" cols="12" md="2">
              <v-select
                v-model="period"
                :items="period_items"
                :rules="[v => !!v || 'Item is required']"
                label="Period"
                filled
                outlined
                required
                style="border-radius:3px;"
              />
            </v-col>
            <v-col v-if="period === null" class="d-flex" cols="12" md="2">
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

            <v-col v-if="period ==='Annual'" class="d-flex" cols="12" md="2">
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

            <v-col v-if="period ==='Quarter'" class="d-flex" cols="12" md="2">
              <v-text-field
                v-model="numPeriods"
                filled
                outlined
                :rules="quarterRules"
                style="border-radius:3px;"
                label="Number of Periods"
                required
              />
            </v-col>
            <v-col class="d-flex" cols="12" md="1">
              <v-btn
                :disabled="!valid"
                color="#08182b"
                class="white--text"
                large
                @click="Ordering()"
              >Get</v-btn>
            </v-col>
            
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get("alpaca_key");
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
var token = "Token " + alpaca_key;
let config = {
  headers: {
    Authorization: token
  }
};
export default {
  name: "Ticker",
  data: () => ({
    valid: true,
    show: false,
    period_items: ["Annual", "Quarter"],
    income_items: ["Statement of Cash Flows", "Income Statement", "Balance Sheet"],
    Ticker: "",
    statement: null,
    period: 'Annual',
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
          this.period.toLowerCase() +
          "/" +
          this.numPeriods
      } else if (this.statement === "Income Statement") {
        type = "income";
        link =
          link +
          "income/" +
          this.Ticker +
          "/" +
          this.period.toLowerCase() +
          "/" +
          this.numPeriods
      } else {
        type = "balance";
        link =
          link +
          "balance/" +
          this.Ticker +
          "/" +
          this.period.toLowerCase() +
          "/" +
          this.numPeriods
      }
      this.$emit("send_link", [link, type, this.statement, this.Ticker]);
    }
  }
};
/**<v-col v-if="false" class="d-flex" cols="12" md="2">
              <v-btn
                :disabled="!valid"
                color="#08182b"
                class="white--text"
                large
                @click="$emit('export')"
              >Export CSV</v-btn>
            </v-col> */
</script>
<style scoped>
.ticker-form {
  display: flex;
  justify-content: center;
  width: 100%;
  align-content: center;
}
#title {
  color: white;
  padding: 0;
  justify-content: flex-end;
  align-items: baseline;
}
</style>
