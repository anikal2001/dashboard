<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-alert color="red" dismissible  v-if="error" type="error">{{error}}</v-alert>
          <v-card class="elevation-12">
            <v-toolbar dark color="rgb(17, 25, 69)">
              <v-toolbar-title>RCFTA Portal Login</v-toolbar-title>
              <v-spacer />
              <v-tooltip bottom />
            </v-toolbar>
            <v-card-text>
              <v-form  @submit.prevent="login">
                <v-text-field
                  v-model="email"
                  prepend-icon="person"
                  name="login"
                  label="Email"
                  type="text"
                />
                <v-text-field
                  id="password"
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
                <v-btn
                  style="color: white; font-size: 1.2rem;"
                  large
                  color="rgb(17, 25, 69)"
                  @click="login"
                >Login</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import Axios from "axios";
export default {
  name: "LoginForm",
  components:{VueRecaptcha},
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      error: null,
      verified:false,
    };
  },
  computed: {
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          setTimeout(()=> {
            this.$router.push('/')
          }, 3500);
        }
      }
    },
  methods:{
    login: function(){
      const info ={
        email: this.email,
        password: this.password,
        error: this.error
      }
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
     onSubmit: function () {
      this.$refs.invisibleRecaptcha.execute();
    },
    onVerify: function (response) {
      console.log('Verify: ' + response);
      this.checkToken(response);
    },

     async checkToken(token){
       try{
        let result = await Axios({
            method: 'post',
            url: 'https://www.google.com/recaptcha/api/siteverify',
            params: {
                secret: '6Lcma7QZAAAAAI-O0Io6RBcZcNRkDsNrWPNm_Cdi',
                response: token
            },
            headers: {
                        "Content-Type": "application/json"
                    }
        });
        console.log(result);

        let data = result.data || {};
        if(!data.success){
            throw({
                success: false,
                error: 'response not valid'
            })
        } else if(data.success){
          this.verified = true; 
          console.log("YAAAHOOOOO");
        }
    }catch(err){
        console.log(err);
        throw err.response ? err.response.data : {success: false, error: 'captcha_error'}
    }
    },
    onExpired: function () {
      console.log('Expired');
    },
    resetRecaptcha () {
      this.$refs.recaptcha.reset() // Direct call reset method
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
