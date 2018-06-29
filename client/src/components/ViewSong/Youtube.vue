<template>
<panel title="Youtube Video" class="song">
    <youtube
    :video-id="youtubeId"
    :player-width="600"
     :player-height="250"
    >
    </youtube>
    </panel>
</template>

<script>
import VueYoutubeEmbed from 'vue-youtube-embed'
export default{

props: [
    'youtubeId'
    ],
components:{
    VueYoutubeEmbed
}
}
</script>

<style scoped>
.song{
height:340px !important;
overflow: hidden;
}
</style>














