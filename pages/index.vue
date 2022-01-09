<template>
    <v-container>
        <div>
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
        
        </div>
    </v-container>
</template>
<script>
import PostCard from '../components/PostCard.vue'
    export default {
  components: { PostCard },
        data() {
            return {
                name: 'Nuxt.js',
            }
        },
        // 해당 페이지에 head()가 없으면, layout defualt의 head를 사용함
        // head() {
        //     return {
        //         title: '메인페이지',
        //     }
        // },
    }
</script>
<style>
</style>
