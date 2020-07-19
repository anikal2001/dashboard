
<template>
  <v-app>
    <dashboard-core-app-bar @logout="logout_mid()" />

    <dashboard-core-drawer />

    <dashboard-core-view />
  </v-app>
</template>

<script>
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
  }),
  methods: {
    logout_mid() {
      this.$emit("logout");
    }
  },
  
};
</script>
