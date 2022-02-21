<template>
  <v-card style="margin-bottom: 20px;">
    <v-image />
    <v-card-text>
      <div>
        <h3>{{ post.id }} {{ post.User.nickname }}</h3>
        <div>{{ post.content }}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="orange">
        <v-icon>mdi-repeat-variant</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn text color="orange">
        <v-icon>mdi-comment-outline</v-icon>
      </v-btn>
      <!-- open-on-hover 마우스 호버만 해도, offset-y 세로로 뜬다 -->
      <v-menu offset-y open-on-hover>
        <!-- # : v-slot -->
        <template #activator="{ on }">
          <!-- v-menu 안 template 내에 원하는 대표 버튼을 넣기 -->
          <v-btn text color="orange" v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>
        <!-- v-menu의 template 밖에 마우스 호버 시 뜰 목록 넣기 -->
        <div style="background: white">
          <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
          <v-btn dark color="orange" @click="onEditPost">수정</v-btn>
        </div>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  // props: ['post'],
  /* 위처럼 props를 간단하게 적어줄 수도 있겠지만, 부모로부터 받는 값이므로 어떤 형식으로 data가 오게될지 자세하게 적어주는 것이 좋음 */
    props: {
      post: {
        type: Object,
        required: true, // 부모로부터 필수적으로 받느냐, 아니면 선택적으로 받느냐(무조건 부모가 props로 넘겨줄 것이기 때문에 true)
      }
    },
    methods: {
      onRemovePost() {
        this.$store.dispatch('posts/remove', {
          id: this.post.id,
        })
      },
      onEditPost() {

      },
    }
}
</script>

<style>

</style>