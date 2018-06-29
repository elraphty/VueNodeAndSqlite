<template>
<v-layout column12>
  <v-flex xs4 offset-xs0>
       <panel title="Song Metadata">
   <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
        ></v-text-field>

        <v-text-field
          label="Artist"
          v-model="song.artist"
        ></v-text-field>

        <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="song.genre"
        ></v-text-field>

        <v-text-field
          label="Album"
          required
          :rules="[required]"
          v-model="song.album"
        ></v-text-field>

        <v-text-field
          label="Album Image Url"
          required
          :rules="[required]"
          v-model="song.albumImageUrl"
        ></v-text-field>

        <v-text-field
          label="YouTube ID"
          required
          :rules="[required]"
          v-model="song.youtubeId"
        ></v-text-field>
      </panel>
    </v-flex>

    <v-flex xs8>
      <panel title="Song Structure" class="ml-2">
        <v-text-field
          label="Tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
        ></v-text-field>

        <v-text-field
          label="Lyrics"
          multi-line
          required
          :rules="[required]"
          v-model="song.lyrics"
        ></v-text-field>
      </panel>

      <div class="danger-alert" v-if="error">
        {{error}}
      </div>

      <v-btn
        dark
        class="cyan"
        @click="create">
        Create Song
      </v-btn>

  </v-flex>
</v-layout>
</template>

<script>
import SongService from '@/services/SongsService'
import SongOptions from '@/services/Api'

const options =SongOptions.postSong();


export default {
    components:{
      
    },
    data(){
        return {
    song:{
    title: null,
    artist: null,
    genre: null,
    album: null,
    albumImageUrl: null,
    youtubeId: null,
    lyrics: null,
    tab: null
    },
      error: null,
      required: (value) => !! value || 'Required.'
    }
    },
   async mounted(){
        //Do a request to the backend for the songs
    },
      methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every((key) => !! this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      options.body=this.song;
    await SongService.postSong(options).then(()=>{
   this.$router.push({
          name: 'songs'
        })
},(err)=>{
this.error=err.error.error
}
).catch((e) =>{
  this.error=e.error.error
});
      
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
