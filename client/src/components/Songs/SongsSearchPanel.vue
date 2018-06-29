
<template>
<panel title="Search">
 <v-text-field 
      label="Search by song title, artist, album or genre"
      name="search"
       type="text"
        placeholder="Enter search word" 
        v-model="search"></v-text-field>
</panel>
</template>
<script>
import _ from 'lodash'
export default {
    data()
    {
        return{
        search: ''
        }
    },
    watch: {
        //with lodash debounce
        search: _.debounce(async function (value) {
              //Naming Route
            const route={
                name: 'songs'
            }

        //Make sure search input is not empty
         if(this.search !== '')
         {
             //set vue router search query
            route.query= {
                search : this.search
            }
         }

         this.$router.push(route)

            console.log(value)

        },500),
        '$route.query.search' : { //Wathching search link if the page is refreshed it collects data from the url
            immediate :true,
            handler (value)
            {
            this.search= value
            }
        }
    }

}

</script>

<style scoped>

</style>



