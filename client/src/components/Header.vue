<template>
  <v-toolbar fixed class="cyan" dark>
    <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
    <v-toolbar-title>
        <router-link 
        class="home"
        tag="span"
        :to=" {
            name : 'root'
            }"
        >
        TabTracker
        </router-link>
            
            </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        
      <v-btn flat dark type="button"
      :to=" {
            name : 'songs'
            }"
      >Browse</v-btn>

    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
         <v-btn 
          v-if="!$store.state.isUserLoggedIn"
         flat type="button" :to=" {
            name : 'login'
            }">Login</v-btn>
            <v-btn   v-if="!$store.state.isUserLoggedIn" flat type="button" @click="navigateTo({
                name:'register'
            })">Signup</v-btn>
         <v-btn v-if="$store.state.isUserLoggedIn" flat type="button" @click="logout">Logout</v-btn>
      <!--<v-btn flat>Login</v-btn>-->
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
    methods:{
        navigateTo(route){
        this.$router.push(route)
        },
        logout(){
            //clear state
        this.$store.dispatch('setToken',null)
        this.$store.dispatch('setUser',null)
        //redirect to root
        this.$router.push({
            name:''
        })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}
.home {
cursor: pointer;
}
.home:hover{
    color: black;
}
</style>
