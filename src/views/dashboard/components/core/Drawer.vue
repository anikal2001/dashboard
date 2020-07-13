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
            <v-list-group>
        <template v-slot:activator>
          <v-list-item-content color="white">
            <v-list-item-title  class="display-1">Dashboard</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(sub, i) in SubMenu" :key="i" @click="$router.push(sub[2])" >
          <v-list-item-title class="display-1" v-text="sub[0]"></v-list-item-title>
          <v-list-item-action>
            <v-icon v-text="sub[1]"></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
                  <v-list-group>
        <template v-slot:activator> 
          <v-list-item-content>
            <v-list-item-title color="white" class="display-1">Security Analysis</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="(sub, i) in SubMenu2" :key="i" @click="$router.push(sub[2])">
          <v-list-item-title class="display-1" v-text="sub[0]"></v-list-item-title>
          <v-list-item-action>
            <v-icon v-text="sub[1]"></v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>

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
        icon: "mdi-view-dashboard",
        title: "dashboard",
        to: "/"
      },
      {
        title: "Security Analysis",
        icon: "fa-chart-area",
        to: "/pages/analysis"
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
      }
    ],
    SubMenu: [
      ["Transaction History", "fas fa-chart-line", 'tables/transactions'],
      ["Charting", "fas fa-money-check-alt", 'components/charting'],
    ],
    SubMenu2:[
      ["Filing Search", "fas fa-archive", 'components/filings'],
      ["Statement Wizard", "fas fa-file-invoice", 'components/fundamentals'],
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
