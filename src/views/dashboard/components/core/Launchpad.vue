<template>
  <base-material-card
    color="primary"
    icon="mdi-rocket"
    title="Launchpad"
    style="height:17.5rem;overflow-top:scroll;margin:2.5rem 25px 0px 10px"
    class="px-5 py-3"
  >
    <v-container>
      <v-row>
        <template v-for="n in button_list">
          <v-col :key="n">
            <v-btn small @click="$router.push(n.link)" width="10rem">
              <i style="padding-right:5px;" :class="n.icon"></i>
              {{n.title}}
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </base-material-card>
</template>

<script>
export default {
  name: "Launchpad",
  data() {
    return {
      button_list: [
        {
          title: "Charting",
          link: "components/charting",
          icon: "fas fa-chart-line"
        },
        {
          title: "Transaction History",
          link: "tables/transactions",
          icon: "fas fa-money-check-alt"
        },
        {
          title: "Filings Search",
          link: "components/filings",
          icon: "fas fa-archive"
        },
        {
          title: "Statement Wizard",
          link: "components/fundamentals",
          icon: "fas fa-file-invoice"
        },
        {
          title: "Security Analysis",
          link: "pages/analysis",
          icon: "fas fa-chart-area"
        },
        {
          title: "Knowledge Base",
          link: "pages/trading",
          icon: "fas fa-book"
        }
      ]
    };
  }
};
</script>

<style>
</style>