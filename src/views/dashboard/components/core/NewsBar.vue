<template>
  <base-material-card height="600px" color="#08182b" class="scroll px-5 py-3">
    <template v-slot:heading>
      <v-tabs v-model="tabs" background-color="transparent" slider-color="white">
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-newspaper</v-icon>News
        </v-tab>
        <v-tab class="mr-3">
          <v-icon class="mr-2">mdi-archive</v-icon>Filings
        </v-tab>
      </v-tabs>
    </template>
    <v-tabs-items v-model="tabs" class="transparent">
      <v-tab-item v-for="n in 3" :key="n">
        <v-text-field
          :label="$t('Search Recent Filings')"
          color="primary"
          v-model="search"
          v-if=" n == 2"
          hide-details
          style="max-width: auto;padding-bottom:10px"
        ></v-text-field>
        <v-btn
          v-if="n==2"
          style="color: white;"
          small
          v-on:click="$router.push('components/filings')"
          color="rgb(17, 25, 69)"
        >Search for more Filings</v-btn>
        <v-btn
          v-if="n==1"
          style="color: white;"
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/us'" target="_blank" style="color:white; text-decoration:none;">Bloomberg US Stream</a></v-btn>
        <v-btn
          v-if="n==1"
          style="margin:10px;"
          small
          dark
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/europe'" target="_blank" style="color:white;text-decoration:none;">Bloomberg Europe Stream</a></v-btn>
        <v-btn
          v-if="n==1"
          small
          color="rgb(17, 25, 69)"
        ><a :href="'https://www.bloomberg.com/live/asia'" target="_blank" style="color:white; text-decoration:none;">Bloomberg Asia Stream</a></v-btn>
        <div :class="[n==1 ? 'news': 'filings']">
          <v-card-text>
            <template v-for="(task, i) in filterFilings">
              <v-row style="border-bottom:thin solid" :key="i" align="center">
                <v-col>
                  <a style="text-decoration:none;" target="_blank" :href="task.Link">
                    <h3 class="font-weight-dark" style="padding-bottom:.5rem;" v-text="task.Title"></h3>
                    <p class="font-weight-light" v-text="task.Summary"></p>
                  </a>
                  <p
                    v-if="task==0"
                    class="font-weight-light"
                  >Published: {{task.Date[0]}}-{{task.Date[1]}}-{{task.Date[2]}}</p>
                </v-col>
              </v-row>
            </template>
          </v-card-text>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </base-material-card>
</template>

<script>
import Axios from "axios";
import * as Cookies from "js-cookie";
const base_link = 'https://tranquil-beyond-74281.herokuapp.com/';
export default {
  name: "NewsBar",
  data: function() {
    return {
      title_array: null,
      summary_array: null,
      search: "",
      tabs: 0,
      tasks: {
        0: null,
        1: null
      },
      loading: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tasks[0] = [];
      this.news(this.tasks[0]);
      this.tasks[1] = [];
      this.filings(this.tasks[1]);
    });
  },
  computed: {
    filterFilings: function() {
      if (this.tabs == 1) {
        return this.tasks[1].filter(filings => {
          return filings.Summary.toLowerCase().match(this.search.toLowerCase());
        });
      } else {
        return this.tasks[0];
      }
    }
  },
  methods: {
    news(vm) {
      Axios.get(base_link + "info/news/")
        .then(function(Response) {
          var count = Object.keys(Response.data).length;
          for (let i = 0; i < count; i++) {
            vm.push({
              Title: Response.data[i].title,
              Link: Response.data[i].link,
              Summary: Response.data[i].summary,
              Date: Response.data[i].published_parsed
            });
          }
        })
        .catch(error => {
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
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    filings(vm) {
      Axios.get(base_link + "info/filings/")
        .then(function(Response) {
          var count = Object.keys(Response.data).length;
          for (let i = 0; i < count; i++) {
            vm.push({
              Summary: Response.data[i].title,
              Link: Response.data[i].link
            });
          }
        })
        .catch(error => {
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
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },
    FilingSearch() {
      this.$router.push("/components/filings");
    }
  }
};
</script>

<style>
.news {
  overflow-y: scroll;
  max-height: 420px;
  overflow-x:hidden;
}
.filings {
  overflow-y: scroll;
  max-height: 400px;
  overflow-x:hidden;
}
</style>