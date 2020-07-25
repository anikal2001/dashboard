<template>

  <v-container id="dashboard" fluid tag="section">
  
    <v-row>
      <AccountUpdate></AccountUpdate>
      <v-row>
        <v-col style="height:90%" cols="12" md="8" class="mt-6">
          <Portfolio></Portfolio>
        </v-col>
        <v-col style="height:90%" cols="12" md="4" class="mt-6">
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
    <div id='mydiv2'></div>
    <new-page></new-page>
  </v-container>
</template>
<!-- Customerly Integration Code -->

<script>
import postscribe from 'postscribe';
import Axios from "axios";
import firebase from "firebase";
import db from "./pages/db.js";
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
  async getData() {
      db.collection("backups")
          .doc(this.user.uid)
          .get()
          .then(doc => {
            Cookies.set('alpaca_key', doc.data().terminal_key),
            Cookies.set('uid', uid),
            Cookies.set('link', 'https://tranquil-beyond-74281.herokuapp.com/')
            console.log(Cookies.get('link'))
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });
      },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      var backup = false; 

      if (user) {
        this.user = user;
        let uid = this.user.uid;
        // this.getData();
      }

       db.collection("backups")
          .doc(this.user.uid)
          .get()
          .then(doc => {
            Cookies.set('alpaca_key', doc.data().terminal_key),
            Cookies.set('uid', uid),
            Cookies.set('link', 'https://tranquil-beyond-74281.herokuapp.com/')
            console.log(Cookies.get('link'))
          })
          .catch(err => {
            console.log("Error getting documents", err);
          });

      let ckeditor = document.createElement('script');    
      ckeditor.setAttribute('src',"//cdn.ckeditor.com/4.6.2/full/ckeditor.js");
      document.head.appendChild(ckeditor);
    });
  },
  mounted(){

    postscribe('#mydiv2', "<script type='application/javascript'>  window.tiledeskSettings = { projectid: '5f121a789cf1b20012044108' }; (function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://widget.tiledesk.com/v4/launch.js';fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'tiledesk-jssdk'));<" + "/script>");
    //postscribe('#mydiv2', '<!-- Customerly Live Chat Snippet Code --> <script> !function(){var e=window,i=document,t="customerly",n="queue",o="load",r="settings",u=e[t]=e[t]||[];if(u.t){return void u.i("[customerly] SDK already initialized. Snippet included twice.")}u.t=!0;u.loaded=!1;u.o=["event","attribute","update","show","hide","open","close"];u[n]=[];u.i=function(t){e.console&&!u.debug&&console.error&&console.error(t)};u.u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(e),u[n].push(t),u}};u[o]=function(t){u[r]=t||{};if(u.loaded){return void u.i("[customerly] SDK already loaded. Use customerly.update to change settings.")}u.loaded=!0;var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://messenger.customerly.io/launcher.js";var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};u.o.forEach(function(t){u[t]=u.u(t)})}(); customerly.load({ "app_id": "28f2fded" }); <' +'/script> <!-- End of Customerly Live Chat Snippet Code -->');

  }
};

</script>