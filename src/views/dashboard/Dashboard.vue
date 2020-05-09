<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <AccountUpdate></AccountUpdate>
      <v-row>
        <v-col cols="12" md="8" class="mt-6">
          <ChartBar></ChartBar>
        </v-col>
        <v-col cols="12" md="4" class="mt-6">
          <TradeCard></TradeCard>
        </v-col>
      </v-row>
      <v-col cols="12" md="6" class="mt-6">
        <Watchlist></Watchlist>
      </v-col>
      <v-col cols="12" md="6" class="mt-6">
        <news-bar></news-bar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import firebase from "firebase";
import db from "../../db.js";
import * as Cookies from "js-cookie";
import Watchlist from "./components/core/Watchlist.vue";
import NewsBar from "./components/core/NewsBar.vue";
import ChartBar from "./components/core/ChartBar.vue";
import AccountUpdate from "./components/core/AccountUpdate.vue";
import TradeCard from "./components/core/Trade Card.vue";
export default {
  name: "Dashboard",
  components: {
    Watchlist,
    NewsBar,
    ChartBar,
    AccountUpdate,
    TradeCard
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        let uid = this.user.uid;
        db.collection("user-info")
          .doc(this.user.uid)
          .get()
          .then(doc => {
            Cookies.set('alpaca_key', doc.data().terminal_key)
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      }
    });
  }
};
</script>
