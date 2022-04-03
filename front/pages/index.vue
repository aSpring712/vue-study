<template>
  <v-container>
    <PostForm v-if="me" />
    <div>
      <!-- 현재 반복문(v-for)으로 되어있는데, 실제로 1000개 부터 브라우저에서 삐그덕거리기 시작함
      Virtualized list 사용하나, 현재 적용하기 어려우므로 infinite scolloing부터 -->
      <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
    </div>
  </v-container>
</template>
<script>
import PostCard from '../components/PostCard.vue'
import PostForm from '../components/PostForm.vue'
    export default {
      components: { PostCard, PostForm },
      data() {
          return {
              name: 'Nuxt.js',
          }
      },
      computed: {
        me() {
          return this.$store.state.users.me;
        },
        mainPosts() {
          return this.$store.state.posts.mainPosts;
        },
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
