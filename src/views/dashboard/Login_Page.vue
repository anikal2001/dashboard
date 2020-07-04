<template>
<v-flex class="form justify-center">
    <div style="width:30%" @keyup.shift="alert('hello')">
        <login-form></login-form>
    </div>
</v-flex>
</template>

<script>
 /* eslint-disable */ 
  import LoginForm from './components/core/LoginForm.vue'
  import Firebase from 'firebase'
  import db from '../../db.js'
  
  export default {
    name: 'LoginPage',
    components: {
      LoginForm
    },
  }
</script>
<style scoped>
a {  text-decoration: none;}
/* eslint-disable */
.form{
    display: flex;
    justify-content: center;
}
</style>
