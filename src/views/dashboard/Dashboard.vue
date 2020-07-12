<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <AccountUpdate></AccountUpdate>
      <v-row>
        <v-col cols="12" md="8" class="mt-6">
          <Portfolio></Portfolio>
        </v-col>
        <v-col cols="12" md="4" class="mt-6">
          <order-form></order-form>

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
import Portfolio from "./components/core/Portfolio.vue";
import AccountUpdate from "./components/core/AccountUpdate.vue";
import OrderForm from "./components/core/Order Form.vue";
import { Balloon } from 'vue-balloon';
import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);
export default {
  name: "Dashboard",
  components: {
    Watchlist,
    NewsBar,
    Portfolio,
    AccountUpdate,
    OrderForm,
    Balloon,
  },
  data() {
    return {
      user: null,
      videoID: "5qap5aO4i9A",
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      var backup = false; 

      if (user) {
        this.user = user;
        let uid = this.user.uid;
        db.collection("backups")
        .doc (this.user.uid)
          .get()
          .then(doc => {
            console.log('Bashaar is the best');
            Cookies.set('alpaca_key', doc.data().terminal_key);
            Cookies.set('link', 'https://tranquil-beyond-74281.herokuapp.com/');
            console.log(doc.data().terminal_key);
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      }
    });
  },
};
</script>
