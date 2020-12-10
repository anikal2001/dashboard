<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>

      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>
    <v-img
      class="mx-2"
      src="../../../../assets/sandbox_logo.png"
      max-height="75"
      max-width="150"
      contain
    ></v-img>

    <v-toolbar-title class="hidden-sm-and-down font-weight-dark" v-text="$route.name" />

    <v-spacer />

    <div class="mx-3" />

    <v-btn class="ml-2" min-width="0" text to="/">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>
    <v-btn class="ml-2" min-width="0" text @click="dialog = true">
      <v-icon>mdi-margin</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="650">

          <v-card>
            <v-card-title color="primary" dark primary-title><h1>Daytrading Buying Power</h1></v-card-title>

            <v-card-text> 
              <h4>Previous Day's Equity</h4>
              <p>${{lastEquity}}</p>
              <h4>Last Margin Requirement</h4>
              <p>${{lastMargin}}</p>
              <h4>Daytrading Buying Power</h4>
              <p> = (Previous Day's Equity - Last Margin Requirement) * 4<br>
                              = (${{lastEquity}} - ${{lastMargin}}) * 4 <br>
                              =  ${{buyingPower}}</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

    <!-- <v-menu bottom left offset-y origin="top right" transition="scale-transition">
      <template v-slot:activator="{ attrs, on }">
        <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
          <v-badge color="red" overlap bordered>
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list :tile="false" nav>
        <div>
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu> -->

    <v-btn dark class="ma-2" @click="logout()" color="#08182b">Logout</v-btn>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";
import Axios from "axios";
import * as Cookies from "js-cookie";
const alpaca_key = Cookies.get('alpaca_key');
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
var token = 'Token ' + alpaca_key
let config = {
  headers: {
    Authorization: token
  }
};
import firebase from "firebase";
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",
  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              );
            }
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    dialog:false,
    lastEquity:null,
    lastMargin:null, 
    buyingPower: 2, 
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one"
    ]
  }),

  computed: {
    ...mapState(["drawer"])
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    logout(){
      this.$store.commit('logout')
      this.$router.push('/login')
    }
  },
  formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      },
  mounted() {
    let link =base_link + "info/accountUpdate/";
      Axios.get(link, config)
        .then((Response) =>{
          this.lastEquity = Response.data.lastEquity.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          this.lastMargin = Response.data.lastMargin.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); 
          this.buyingPower =Response.data.daytradingBuyingPower.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
          console.log(Response.data)
        });
        this.lastEquity = this.formatNumber(Number.parseFloat(Response.data.lastEquity));
        this.lastMargin = this.formatNumber(Response.data.lastMargin); 
  },
};
</script>
