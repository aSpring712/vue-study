<template>
  <div style="margin-bottom: 20px;">
    <v-card>
      <!-- <v-image /> -->
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
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <!-- open-on-hover 마우스 호버만 해도, offset-y 세로로 뜬다 -->
        <v-menu offset-y open-on-hover>
          <!-- # : v-slot -->
          <template #activator="{ on }">
            <!-- v-menu 안 template 내에 원하는 대표 버튼을 넣기 -->
            <v-btn text color="orange" :disabled="!me || me.nickname != post.User.nickname" v-on="on">
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

    <!-- template 태그는 v-if를 적용하기 위해 하나로 묶어주기 위해 사용 -->
    <template v-if="commentOpened">
      <!-- 댓글 입력 칸 -->
      <CommentForm :post-id="post.id" />
      <!-- 입력한 댓글들 -->
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <!-- h3 -->
            <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
            <!-- div -->
            <v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CommentForm from '~/components/CommentForm';

export default {
  components: {
    CommentForm,
  },
  // props: ['post'],
  /* 위처럼 props를 간단하게 적어줄 수도 있겠지만, 부모로부터 받는 값이므로 어떤 형식으로 data가 오게될지 자세하게 적어주는 것이 좋음 */
    props: {
      post: {
        type: Object,
        required: true, // 부모로부터 필수적으로 받느냐, 아니면 선택적으로 받느냐(무조건 부모가 props로 넘겨줄 것이기 때문에 true)
      }
    },
    data() {
      return {
        commentOpened: false,
      }
    },
    computed: {
      ...mapState('users', ['me'])
    },
    methods: {
      onRemovePost() {
        this.$store.dispatch('posts/remove', {
          id: this.post.id,
        })
      },
      onEditPost() {

      },
      onToggleComment() {
        this.commentOpened = !this.commentOpened;
      },
    },
}
</script>

<style>

</style>