<template>
  <router-view v-on:logout="logout" />
</template>

<script>
import firebase from "firebase";
import store from './store.js';
import router from './router'
import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import * as Cookies from "js-cookie";
Vue.use(VueAnalytics, {
  id: 'UA-173983456-1',
  router,
})
export default {
  name: "App",
  data() {
    return {
      name: null,
	  apiLink:"https://sandboxapi.ca/", 
    };
  },
  methods: {
    logout() {
      this.store.dispatch('logout')
    }
  },
};
</script>
<style>
/* width */
html *::-webkit-scrollbar {
  width: 5px;
}

/* Track */
html *::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
html *::-webkit-scrollbar-thumb {
  background: #08182b; 
  border-radius: 10px;
}

/* Handle on hover */
html *::-webkit-scrollbar-thumb:hover {
  background: #08182b; 
}
</style>
