<template>
  <div class="ticker-form">
<<<<<<< HEAD
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fluid>
          <v-row align-content="center" justify="center">
            <v-col class="d-flex" cols="12" sm="2">
              <v-select
                v-model="statement"
                :items="income_items"
                label="Income Statement"
=======
      <v-form ref="form" v-model="valid" style="width:100%;" lazy-validation>
        
          <v-row align-content="center" justify='center'  >
            <v-col class="d-flex" cols="12" sm="3">
              <v-select
                v-model="statement"
                :items="income_items"
                label="Statement"
>>>>>>> evenNewerBranch
                :rules="[v => !!v || 'Item is required']"
                filled
                outlined
                required
                style="border-radius:3px;"
              />
            </v-col>
<<<<<<< HEAD
            <v-col class="d-flex" cols="12" md="2">
=======
            <v-col class="d-flex" cols="12" md="3">
>>>>>>> evenNewerBranch
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

<<<<<<< HEAD
            <v-col class="d-flex" cols="12" sm="2">
=======
            <v-col class="d-flex" cols="12" sm="3">
>>>>>>> evenNewerBranch
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

<<<<<<< HEAD
            <v-col v-if="period ==='Annual'" class="d-flex" cols="12" md="2">
=======
            <v-col v-if="period ==='Annual'" class="d-flex" cols="12" md="3">
>>>>>>> evenNewerBranch
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

<<<<<<< HEAD
            <v-col v-if="period ==='Quarter'" class="d-flex" cols="12" md="2">
=======
            <v-col v-if="period ==='Quarter'" class="d-flex" cols="12" md="3">
>>>>>>> evenNewerBranch
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
<<<<<<< HEAD
            <v-col class="d-flex" cols="12" md="2">
=======
            
          </v-row>
        <v-row>
        <div class="d-flex" cols="12" md="2" style='margin-righ:0px;' justify='right'>
>>>>>>> evenNewerBranch
              <v-btn
                :disabled="!valid"
                color="#08182b"
                class="white--text"
                large
                @click="Ordering()"
<<<<<<< HEAD
              >Export</v-btn>
            </v-col>
          </v-row>
        </v-container>
=======
                justify='right'
              >Export</v-btn>
            </div>
        </v-row>
>>>>>>> evenNewerBranch
      </v-form>
  </div>
</template>

<script>
import Axios from "axios";
const config = {
  headers: {
    Authorization: "Token 417f59ad885874647d9cc51c5a1834f30d955162"
  }
};
export default {
  name: "Ticker",
  data: () => ({
    valid: true,
    show: false,
    period_items: ["Annual", "Quarter"],
    income_items: ["Cash Flows", "Income Statement", "Balance Sheet"],
    Ticker: "",
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
    Ordering(event) {
      this.$refs.form.validate();
      let type = null;
      this.show = true
      let link = "https://rcsandbox.ca/info/financials/";
      if (this.statement === "Cash Flows") {
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
<<<<<<< HEAD
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
=======
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
>>>>>>> evenNewerBranch
}
</style>
