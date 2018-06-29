<template>
<v-layout column12>

  <v-flex xs6 >
      <songs-search-panel/>
      <songs-panel class="mt-2"/>
  </v-flex>

    <v-flex xs6  class="ml-2">
        <songs-bookmarks/>
    </v-flex>
</v-layout>
</template>

<script>
import SongService from '@/services/SongsService'
import SongsPanel from './SongsPanel'
import SongsSearchPanel from './SongsSearchPanel'
import SongsBookmarks from './SongsBookmarks'

export default {
    components:{
        SongsPanel,
        SongsSearchPanel,
        SongsBookmarks
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
