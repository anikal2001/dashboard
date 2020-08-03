<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    color="#08182b"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    mobile-break-point="960"
    app
    absolute
    temporary
    width="360"
    v-bind="$attrs"
    style="z-index:25;"
  >
    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item style="padding:0px;" width="100%" height="100%">
        <v-img src="../../../../assets/sandbox_logo.png" max-height="200" />

        <v-list-item-content>
          <v-list-item-title class="display-1" v-text="profile.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children" :key="`group-${i}`" :item="item">
          <!--  -->
        </base-item-group>

        <base-item v-else :key="`item-${i}`" :item="item" />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapState } from "vuex";

export default {
  name: "DashboardCoreDrawer",

  props: {
    expandOnHover: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    items: [
      {
        title: "Trading Terminal",
        text: true,
        avatar: "fa-trophy",
        children: [
          {
            title:"Dashboard",
            icon: "mdi-view-dashboard",
            to: "/"
          },
          {
            title: "Transaction History",
            icon: "fas fa-money-check-alt",
            to: "/tables/transactions"
          },
          {
            title: "Charting",
            icon: "fa-chart-line",
            to: "/components/charting"
          },
        ]
      },
      {
        title: "Security Analysis",
        text: true,
        avatar: "fa-trophy",
        children: [
          {
            title: "Company Data",
            icon: "fa-chart-area",
            to: "/pages/analysis"
          },
          {
            title: "Filing Search",
            icon: "fas fa-archive",
            to: "/components/filings"
          },
          {
            title: "Statement Wizard",
            icon: "fa-chart-line",
            to: "/components/fundamentals"
          },
        ]
      },
            
      {
        title: "Standings",
        icon: "fa-trophy",
        to: "/pages/standings"
      },
      {
        title: "Algo-Trading",
        icon: "fa-code",
        to: "/pages/trading"
      },
      {
        title: "Knowledge Base",
        icon: "fa-book",
        to: "/pages/resources"
      },
      
    ]
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("SET_DRAWER", val);
      }
    },
    computedItems() {
      return this.items.map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: this.$t("RCFTA Portal")
      };
    }
  },

  methods: {
    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title)
      };
    }
  }
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24
    color: white

  .v-list-item
    &__icon--text,
    &__icon:first-child
      justify-content: center
      text-align: center
      width: 20px

      +ltr()
      margin-right: 24px
      margin-left: 12px !important

      +rtl()
      margin-left: 24px
      margin-right: 12px !important

  .v-list--dense
    .v-list-item
      &__icon--text,
      &__icon:first-child
        margin-top: 10px

  .v-list-group--sub-group
    .v-list-item
      +ltr()
      padding-left: 8px

      +rtl()
      padding-right: 8px

    .v-list-group__header
      +ltr()
      padding-right: 0

      +rtl()
      padding-right: 0

      .v-list-item__icon--text
        margin-top: 19px
        order: 0

      .v-list-group__header__prepend-icon
        order: 2

        +ltr()
        margin-right: 8px

        +rtl()
        margin-left: 8px
</style>
