<template>

  <v-container id="dashboard" fluid tag="section">
  
    <v-row>
      <AccountUpdate></AccountUpdate>
      <v-row>
        <v-col style="height:90%" cols="12" md="8" class="mt-6">
          <Portfolio></Portfolio>
        </v-col>
        <v-col style="height:80%" cols="12" md="4" class="mt-6">
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
    <div id='mydiv'></div>
    <new-page></new-page>
  </v-container>
</template>
<!-- Customerly Integration Code -->

<script>
import postscribe from 'postscribe';
import Axios from "axios";
import firebase from "firebase";
import db from "../../db.js";
import * as Cookies from "js-cookie";
import Watchlist from "./components/core/Watchlist.vue";
import NewsBar from "./components/core/NewsBar.vue";
import Portfolio from "./components/core/Portfolio.vue";
import AccountUpdate from "./components/core/AccountUpdate.vue";
import OrderForm from "./components/core/Order Form.vue";
import NewPage from "./pages/NewPage.vue"
import { Balloon } from 'vue-balloon';
import Vue from 'vue';
import VueYouTubeEmbed from 'vue-youtube-embed';
Vue.use(VueYouTubeEmbed);
//
export default {
  name: "Dashboard",
  components: {
    Watchlist,
    NewsBar,
    Portfolio,
    AccountUpdate,
    OrderForm,
    Balloon,
    NewPage
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
          .doc(this.user.uid)
          .get()
          .then(doc => {
            Cookies.set('alpaca_key', doc.data().terminal_key),
            Cookies.set('link', 'https://tranquil-beyond-74281.herokuapp.com/')
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      }

      let ckeditor = document.createElement('script');    
      ckeditor.setAttribute('src',"//cdn.ckeditor.com/4.6.2/full/ckeditor.js");
      document.head.appendChild(ckeditor);
    });
  },
  mounted(){
    postscribe('#mydiv', '<script>'+ 'window.customerlySettings = {        app_id: "28f2fded"    };    !function(){function e(){var e=t.createElement("script");e.type="text/javascript",e.async=!0, e.src="https://widget.customerly.io/widget/28f2fded"; var r=t.getElementsByTagName("script")[0];r.parentNode.insertBefore(e,r)}var r=window,t=document,n=function(){n.c(arguments)};r.customerly_queue=[],n.c=function(e){r.customerly_queue.push(e)}, r.customerly=n,r.attachEvent?r.attachEvent("onload",e):r.addEventListener("load",e,!1)}();' + '<'+ '/' +'script>');
  }
};

</script>