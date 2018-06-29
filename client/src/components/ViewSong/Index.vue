1<template>
<div>
       <v-layout >
           <v-flex xs6 >

               <song-metadata :song="song" />
                  
           </v-flex>

               <v-flex xs6 >

               <youtube :youtubeId="song.youtubeId" class="ml-2" />
                  
           </v-flex>
       </v-layout>

        <v-layout>
             <v-flex xs6>
              <tab :song="song" />
           </v-flex>

           <v-flex xs6>

               <lyrics :song="song" />
         
           </v-flex>
       </v-layout>

   </div>
</template>

<script>
import SongService from '@/services/SongsService'
import SongMetadata from './SongMetadata'
import Youtube from './Youtube'
import Lyrics from './Lyrics'
import Tab from './Tab'
export default {
    data()
    {
     return {
         song:{}
     }
    },
    async mounted(){
        const songId = this.$store.state.route.params.songId;
        console.log(songId)
        await SongService.getSingleSong(songId).then((song) => {
            this.song=song
        }).catch((e)=>{
            console.log(e)
        })
    },
    components:{
        SongMetadata,
        Youtube,
        Lyrics,
        Tab
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
