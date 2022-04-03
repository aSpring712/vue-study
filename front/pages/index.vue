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
      // 메인 페이지에서 게시글을 불러올 건데, 처음 mainPosts는 비어있는 상태
      // 그러나, 실제 서비스에서 비어있으면 안됨. 그래서 fetch method를 사용해 처음 시작할 때, 데이터를 넣어줌
      /* 보통 Component가 mount 되기 전(화면에 보이기 전)에 vuex store에 비동기적으로 data를 넣을 때 사용 */
      fetch({ store }) {
        // 화면이 뜨기 전 미리 서버에서 게시글 10개를 서버에서 로딩해 와서 PostCard 부분에 데이터가 차있을 수 있도록
        // store에서 미리 데이터를 준비
        store.dispatch('posts/loadPosts');
        // fetch하지 않으면, 화면이 뜨기 전에 데이터가 준비되지 않기 때문에 새로고침 했을 때 아무것도 뜨지 않음
      },
      computed: {
        me() {
          return this.$store.state.users.me;
        },
        mainPosts() {
          return this.$store.state.posts.mainPosts;
        },
        // front-end 해커가 되지 않기 위해 해당 값 가져와야 함
        hasMorePost() {
          return this.$store.state.posts.hasMorePost;
        }
      },
      // 스크롤을 게시글 10개까지 내렸을 때 다음 게시글을 자연스럽게 불러오도록 scroll event를 달기 위함
      mounted() { // mounted --> 화면에 붙었다
        // mounted에서 event를 등록했으면, 항상 beforeDestroy에서 제거해주어야 함
        // 그렇지 않으면 메모리 누수가 생김

        // window는 created에서 사용 불가
        window.addEventListener('scroll', this.onScroll);
      },
      beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
      },
      methods: {
        onScroll() {
          /* window.scrollY + document.documentElement.clientHeight === document.documentElement.scrollHeight ( - 맨 아래에서 스크롤 올린 만큼의 px) */
          // 마지막에 빼주는 px의 크기는 게시물의 성격에 따라 숫자를 다르게 주면 됨 -> 사람들이 빨리 읽는다면 더 큰 숫자 주기
          if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if(this.hasMorePost) {
              this.$store.dispatch('posts/loadPosts');
            }
          }
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
