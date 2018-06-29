<template>
      <panel title="Songs">    
    <v-btn
    slot="action"
    @click="navigateTo({name:'songs-create'})"
    fab
    class="cyan accent-2"
    light
    medium
    right 
    absolute
    middle
    >
      <v-icon>add</v-icon>
    </v-btn>
          <div v-for="song in songs" 
          v-bind:key="song.id"
          class="song"
          >
              <v-layout column12>
                  <v-flex xs5>
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
                               {name:'song',
                               params:{
                                   songId:song.id
                                   }
                                   })"
                       >View Song 
                                   </v-btn>
                   </v-flex>
                    <v-flex xs7>
                      <div class="">
                    <img class="album-image" v-bind:src="song.albumImageUrl"/> 
                    </div> 
              </v-flex>
              </v-layout>
              
          </div>
   </panel>
</template>

<script>
import SongService from '@/services/SongsService'

export default {
    components:{
        
    },
    data(){
        return {
        songs:null
    }

    },
    methods:{
      navigateTo (options)
      {
       this.$router.push(options)
      }
    },
   async mounted(){
        //Do a request to the backend for the songs
     await SongService.index().then((songs)=>{
         this.songs=songs
          console.log('Main Songs',this.songs)
        }).catch((e)=>{
            this.songs.error=e.toString()
            console.log(e)
        })
    },
    watch : {
        '$route.query.search' :{ //Wathching search link if the page is refreshed it collects data from the url
            immediate :true,
          async  handler (value)
            {
            this.songs = await SongService.index(value)
            }
    
     }
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song{
padding: 20px;
height:300px;
overflow:hidden;
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
