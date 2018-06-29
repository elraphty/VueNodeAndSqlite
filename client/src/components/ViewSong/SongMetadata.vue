<template>
  <panel title="Song Metadata" class="song">
                         <v-layout>
                  <v-flex xs6>
                         <div class="song-title">
                            {{song.title}}
                          </div>
                          <div class="song-artist">
                            {{song.artist}}
                          </div>
                           <div class="song-genre">
                            {{song.genre}}
                          </div>
                            <v-btn
                           dark
                           class="cyan" @click="navigateTo(
                               {name:'song-edit',
                               params:{
                                   songId:song.id
                                   }
                                   })">Edit Song </v-btn>

                                      <v-btn
                                      v-if="isUserLoggedIn && !bookmark"
                           dark
                           class="cyan"
                            @click="setAsBookmark">
                      <!-- <v-icon >bookmark</v-icon> -->
                            Bookmark</v-btn>

                                            <v-btn
                                            v-if="isUserLoggedIn && bookmark"
                           dark
                           class="cyan"
                            @click="unBookmark">
                           <!-- <v-icon >bookmark</v-icon> -->
                            UnBookmark</v-btn>
                    
                   </v-flex>
                    <v-flex xs6>
                      <div class="">
                    <img class="album-image" v-bind:src="song.albumImageUrl"/> 
                    <br>
                    {{song.album}}
                    </div> 
              </v-flex>
              </v-layout>
            </panel>
</template>

<script>
   import {mapState} from 'vuex'
   import BookmarksService from '@/services/BookmarksService'

export default {
    data(){

        return{
        bookmark:null
        }
    },
    props:['song']
    ,computed:{ // fetching data from vuex state
        ...mapState([
            'isUserLoggedIn'
        ])
    },
    watch :{
      async song() {

        if(!this.isUserLoggedIn)
       {
           return
       }
       
      const bookmark=BookmarksService.index(this.song.id,this.$store.state.user.id).then((mark)=>{
          this.bookmark=mark
             console.log("Bookmarks",mark)
             console.log("BookmarId",this.bookmark.id)
      }).catch((e)=>{
          console.log(e.toString())
      })

        }

    },
   async mounted(){

   },
    components:{
    
    },
      methods:{
      navigateTo (options)
      {
       this.$router.push(options)
      },
     async setAsBookmark ()
      {
          const bookmark= await BookmarksService.post(
              {
                  SongId:this.song.id,
                  UserId:this.$store.state.user.id
              }
          ).then((token)=>{
            console.log("Bookmark values",token)
            this.bookmark=token
              console.log("BookmarId",this.bookmark.id)
          }).catch((e)=>{
             console.log(e.toString)
          })
      },
       async unBookmark ()
      {
            console.log("Deleted BookmarkedId ",this.bookmark.id)
         const bookmark= await BookmarksService.delete( this.bookmark.id).then((token)=>{
            console.log('Deleted Bookmark',token)
            this.bookmark=null
          }).catch((e)=>{
             console.log(e.toString())
          })
      }
      
    }
}
</script>

<style scoped>
.song{
height:340px !important;
overflow: hidden;
}
.song-title{
    font-size: 30px
}
.song-artist{
    font-size: 24px
}
.song-genre{
    font-size: 18px
}
.album-image{
    width: 100%;
    margin:0 auto;
}
</style>
