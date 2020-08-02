<template>
  <v-footer id="dashboard-core-footer">
    
      <v-row style='margin:20px' no-gutters>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">Get API Keys</v-btn>
          </template>

          <v-card>
            <v-card-title color="primary" dark primary-title><h1>Your Keys</h1></v-card-title>

            <v-card-text> 
              <h4>API Key</h4>
              <p>{{api_key}}</p>
              <h4>Secret Key</h4>
              <p>{{secret_key}}</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <a :href="'https://rcsandbox.ca/#docs'" target="_blank" >
        <v-btn color="primary" style='margin-left:15px;'dark v-on="on">Documentation</v-btn>
        </a>
        <a :href="'https://rcsandbox.ca/#workshops'" target="_blank" >
        <v-btn color="primary" style='margin-left:15px;'dark v-on="on">Workshops</v-btn>
        </a>
        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
          <div><v-btn text style='width:0.3rem;margin-left:5px;' @click="disclaimer = true" >Disclaimer</v-btn>
          <v-dialog v-model="disclaimer" width="50rem">

          <v-card>
            <v-card-title color="primary" dark primary-title><h1>Disclaimer</h1></v-card-title>

            <v-card-text> 
            These data, figures, and other sources of information on the Sandbox platform are approximate and provided for informational purposes only. The Rotman Commerce FinTech Association does not make any guarantees, representations or warranties as to, and shall have no liability for, the timeliness, truthfulness, sequence, quality, completeness, accuracy, validity or freedom from interruption of any information or data on the Sandbox Website. The content on the Sandbox Website is not to be construed as a recommendation or offer to buy or sell or the solicitation of an offer to buy or sell any security, financial product or instrument; or to participate in any particular trading strategy.
To the extent research materials or similar information is available through the Sandbox Website understand that these materials are intended for informational and educational purposes only and they do not constitute a recommendation to enter into any securities transactions or to engage in any investment strategies.
By viewing or using this data or information in any manner, you understand and acknowledge that such information does not reflect trading activity on any financial markets and is intended to provide you with a reference point only, rather than as a basis for making trading decisions.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="disclaimer = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog></div>
          <div class="margin-left:50px;body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; 2020, made with
            <v-icon size="18">mdi-heart</v-icon>by
            <a>RCFTA</a>
          </div>
        </v-col>
      </v-row>
    
  </v-footer>
</template>
<script> window.customerlySettings = { app_id: "28f2fded" }; !function(){function e(){var e=t.createElement("script"); e.type="text/javascript",e.async=!0, e.src="https://widget.customerly.io/widget/28f2fded"; var r=t.getElementsByTagName("script")[0];r.parentNode.insertBefore(e,r)} var r=window,t=document,n=function(){n.c(arguments)}; r.customerly_queue=[],n.c=function(e){r.customerly_queue.push(e)}, r.customerly=n,r.attachEvent?r.attachEvent("onload",e):r.addEventListener("load",e,!1)}(); </script>
<script>
import Axios from 'axios';
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get('alpaca_key')
var token = 'Token ' + alpaca_key
let config = {
  headers: {
    Authorization: token
  }
};

export default {
  name: "DashboardCoreFooter",
  data() {
    return {
      api_key: null,
      dialog: false,
      secret_key: null,
      disclaimer:false,
    };
  },
  created() {
    Axios.get('https://rcsandbox.ca/info/accountInfo/', config)
    .then((response)=>{
      this.secret_key = response.data.alpaca_secret_key
      this.api_key= response.data.alpaca_api_key
    })
  }
};
</script>

<style lang="sass">
#dashboard-core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
