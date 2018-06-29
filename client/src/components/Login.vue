<template>
<v-layout column12>
  <v-flex xs6 offset-xs3>
   <panel title="Login">
      <v-text-field 
      label="Email"
      name="email"
       type="email"
        placeholder="Enter your email" 
        v-model="email"></v-text-field>
<br>
<v-text-field 
label='Password'
name="password"
 type="password" 
 placeholder="Enter your password" 
 v-model="password"></v-text-field>
<br>
<div class="danger-alert" v-html="error"></div>
<br>
<v-btn class="cyan" @click='login' dark>Login</v-btn>
      </panel>
  </v-flex>
</v-layout>
</template>

<script>

import AutheticationService from '@/services/AutheticationService'
import Options from '@/services/Api'
import store from '@/store/store'

let options=Options.login()


export default {
  name: 'Login',
  data () {
    return {
      email:"",
      password:"",
      error:null
    }
  },
  methods:{
async login(){
  options.body.email=this.email
  options.body.password=this.password
const response= await AutheticationService.login(options)
.then(
  (result)=>{

    console.log(result)
    store.dispatch('setToken',result.token)
    store.dispatch('setUser',result.user)
    this.$router.push({name:'songs'})
},(err)=>{
this.error=err.error.error
}
).catch((e) =>{
  this.error=e.error.error
});
   }
},
  components:{
      
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}
</style>
