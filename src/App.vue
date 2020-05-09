<template>
  <router-view v-on:logout="logout" />
</template>

<script>
  import firebase from 'firebase'
  import * as Cookies from 'js-cookie'
  export default {
    name: 'App',
    data () {
      return {
        name: null,
      }
    },
    methods: {
      logout () {
        firebase.auth().signOut()
          .then(() => {
            this.$router.push('/login')
            Cookies.set('authenticated', 'false')
          })
      },
    },
  }
</script>
