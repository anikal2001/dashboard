
<template>
  <v-app>
    <dashboard-core-app-bar @logout="logout_mid()" />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
import firebase from "firebase";
import db from "./pages/db.js";
import * as Cookies from "js-cookie";
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/Drawer"),
    DashboardCoreSettings: () => import("./components/core/Settings"),
    DashboardCoreView: () => import("./components/core/View")
  },
  data: () => ({
    expandOnHover: false,
    user: null
  }),
  methods: {
    logout_mid() {
      this.$emit("logout");
    }
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
           Cookies.set("alpaca_key", doc.data().terminal_key),
            Cookies.set("uid", this.user.uid),
            //Cookies.set('link', 'https://tranquil-beyond-74281.herokuapp.com/')
            console.log(Cookies.get("alpaca_key"));
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });

      let ckeditor = document.createElement("script");
      ckeditor.setAttribute("src", "//cdn.ckeditor.com/4.6.2/full/ckeditor.js");
      document.head.appendChild(ckeditor);
    });
  }
};
</script>
