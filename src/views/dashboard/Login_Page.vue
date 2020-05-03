<template>
<v-flex class="form justify-center">
    <div style="width:30%">
        <login-form></login-form>
    </div>
</v-flex>
</template>

<script>
 /* eslint-disable */ 
  import LoginForm from './components/core/LoginForm.vue'
  import MenuBar from './components/core/MenuBar.vue'
  
  export default {
    name: 'LoginPage',
    components: {
      LoginForm,
      MenuBar
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
