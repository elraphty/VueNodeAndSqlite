<template>
    <panel title="Boormarks">
          <v-data-table
    :headers="headers"
    :pagination.sync="pagination"
    :items="bookmarks"
    class="elevation-1 "
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">{{ props.item.title }}</td>
      <td class="text-xs-right">{{ props.item.artist }}</td>
    
    </template>
   </v-data-table>
    </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
    data(){
        return {
            headers:[{
                align: 'right',
               text: 'Title',
               value: 'title'
            },
            {
                align: 'right',
               text: 'Artist',
               value: 'artist'
            },
            ],
            pagination: {
                sortBy: "date",
                descending: true
            },
            bookmarks:[]
        }
    },
    computed:{ // fetching data from vuex state
        ...mapState([
            'isUserLoggedIn'
        ])
    },
    async mounted (){
     if(this.isUserLoggedIn){
            const bookmark=BookmarksService.index(this.$store.state.user.id)
            .then((marks)=>{
           this.bookmarks=marks
      }).catch((e)=>{
          console.log(e.toString())
      })
     }
    }
}
</script>

<style scoped>

</style>


