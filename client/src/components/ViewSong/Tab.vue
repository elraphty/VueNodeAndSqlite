<template>
   <panel title="Tabs"  class="ml-2 mt-2">
                <textarea class="size"
                readonly
                v-model="song.tab"
                >
                </textarea>
               </panel>
</template>

<script>

export default {

    props:['song'
    ]
    ,
    components:{
    
    }
}
</script>

<style scoped>
.size{
    width:100%;
    height:600px;
    padding: 40px;
    font-family: monospace;
    border-color :transparent;
    overflow:auto;
    border: none;
    border-style:none;

}
</style>