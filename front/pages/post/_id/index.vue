<!-- 이렇게 하면, post 폴더 내 _id.vue와 같은 사용방법을 가지지만, 아이디 없이 /post만 쳤을 때,
매칭되지 않음. 무조건 /post/숫자 여야만 매칭이 됨 -->

<template>
  <!-- 게시글 아이디를 이상하게 쳤다? 없는 id를 쳤다? -->
  <v-container v-if="post">
    <PostCard :post="post" />
  </v-container>
  <div v-else>
    해당 아이디의 게시글이 존재하지 않습니다.
  </div>
</template>

<script>
// import PostCard from '../../components/PostCard.vue';
import PostCard from '~/components/PostCard.vue';

export default ({
  // fetch() {

  // },
  // asyncData() {

  // },
  components: {
    PostCard,
  },
  computed: {
    post() {
      // store에 있는 게시글들 중 id가 params로 온 _id와 동일한 아이디를 찾음
      /* 주의! 실제 back과 연결이 되었을 때,
       아직 로딩 전이라 mainPosts에 해당하는 게시글이 들어있지 않을 수도 있음
       --> 그럴 때, 미리 로딩하는 것을 사용할 것
       --> fetch() {}나 asyncData() {}
       --> 동적 라우팅을 하려면 저 두가지 methods를 배워야 함 */
      return this.$store.state.posts.mainPosts.find(v => v.id === parseInt(this.$route.params.id)) // params는 문자열이기 때문에 parseInt
      /* 
        /post/id -> 그러나 지금 Dummy Data이기 때문에 주소창에 검색을 하면 새로고침이 되어 store에 저장된 값이 없어짐
        따라서 nuxt-link를 사용해서 새로고침 되지 않고 이동할 수 있도록 해야함
        --> url 쳐서 바로 접근 가능한가? OK. 가능하다. But, 지금은 Dummy Data라서 바로 url로 접근하면 새로고침이 되어
        해당 게시글이 존재하지 않는다고 하는 것
      */ 

     /* 또 주의!!
      폴더 구조를 보면 post 폴더 내 _id.vue 파일이 있는데, 주소창에 /post/12345 이렇게 아이디까지 적어주지 않고,
      /post 까지만 써도 해당 페이지로 _id.vue 파일에 매칭이 되는 문제가 있음
      --> /post 주소에는 이 페이지가 매칭되게 하고싶지 않을 때, _id라는 .vue 파일이 아닌, 폴더를 만들고
      그 안에 index.vue를 만들어라.
     */
      
    }
  },
})
</script>

<style>

</style>
