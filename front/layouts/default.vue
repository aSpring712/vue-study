<template>
  <!-- vuetify 쓸 때 v-app을 꼭 넣어줘야 함. 아니면 다 깨짐 -->
  <v-app>
    <nav>
      <v-toolbar
        dark
        color="green"
      >
        <v-toolbar-title>
          <nuxt-link to="/">
            NodeBird
          </nuxt-link>
        </v-toolbar-title>
        <!-- 빈 공간 -->
        <v-spacer />
        <v-toolbar-items>
          <v-form @submit.prevent="onSearchHashtag">
          <div :style="{ display: 'flex', height: '100%', alignItems: 'center' }">
              <v-text-field
                v-model="hashtag"
                label="검색"
                hide-details
                prepend-icon="mdi-magnify"
              />
            </div>
          </v-form>
          <v-btn
            
            text
            nuxt
            to="/profile"
            :style="{display: 'flex', alignItems: 'center'}"
          >
            <div>프로필</div>
          </v-btn>
          <v-btn
            text
            nuxt
            to="/signup"
            :style="{display: 'flex', alignItems: 'center'}"
          >
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>        

    <!-- vuex store의 모듈들 끌어다 써보기 -->
    <!-- <div>{{ name }}</div>
    <v-btn @click="onChangeName">바이바이</v-btn> -->

    <!-- 보통 가로(row)로 나누고, 그 후 세로(col -> 몇대 몇으로 나눌 것인지 중요)로 나눔 -->
    <!-- no-gutters : 세로줄 간의 padding을 없애줌 -->
    <v-row no-gutters>
      <!-- 나누는 것 그리드 system -> 보통 12등분 -> 로그인 1 : 컨텐츠 2로 나눌 것임 -->
      <!-- 반응형 -> 그리드 바꾸면 됨 -->
      <!-- 로그인 1 -> 4 -->

      <!-- cols가 xs라고 보면 됨 -->
      <!-- 기본적으로 cols는 12 고정 -->
      <v-col
        cols="12"
        md="4"
      >
        <LoginForm />
      </v-col>
      <!-- 컨텐츠 2 -> 8 -->
      <v-col
        cols="12"
        md="8"
      >
        <!-- 바뀌는 부분 : router-view 역할 -->
        <nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
// 화면 사이즈별 xs, sm, md, lg, xl

// '~' : 소스들의 directory root -> 상대경로로 쓰기에는 ../../ .. 너무 길고 복잡해짐
import LoginForm from '~/components/LoginForm.vue';

export default{
  components: { LoginForm },
  data() {
    return {
      hashtag: '',
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
  },
  methods: {
    onSearchHashtag() {
      // 페이지 넘어가고
      this.$router.push({
        path: `/hashtag/${this.hashtag}`,
      });
      // 검색어 비워줌
      this.hashtag = '';
    },
  }
};
</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }
</style>