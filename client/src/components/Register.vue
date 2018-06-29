<template>
<v-layout column12>
  <v-flex xs6 offset-xs3>
    <panel title="Register">
        <form name="tab-tracker-form" autocomplete="off">
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
autocomplete="new-password"
 type="password" 
 placeholder="Enter your password" 
 v-model="password"></v-text-field>
<br>
<div class="error"  v-html="error"></div>

<br/>
<v-btn class="cyan" @click='register' dark >Register</v-btn>
        </form>
    </panel>
  </v-flex>
</v-layout>
</template>
<script>
import AutheticationService from '@/services/AutheticationService'
import Options from '@/services/Api'
import store from '@/store/store'
let options=Options.register()

export default {
  data () {
    return {
      email:"abc",
      password:"123",
      error:null
    }
  },
  methods:{
async register() {
  options.body.email=this.email
  options.body.password=this.password
  
await AutheticationService.register(options).then(
  (result)=>{
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
  watch:{
    email(value){
      console.log("email has changed",value);
    },
    password(value){
      console.log("password has changed", value);
    }
  },
  mounted() {
    setTimeout(()=> {
     this.email='Hello world'
    }, 2000)
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
