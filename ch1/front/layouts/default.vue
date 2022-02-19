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
          <v-text-field
            label="검색"
            hide-details
            prepend-icon="mdi-magnify"
            :style="{display: 'flex', alignItems: 'center'}"
          />
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
    <!-- 보통 가로(row)로 나누고, 그 후 세로(col -> 몇대 몇으로 나눌 것인지 중요)로 나눔 -->
    <!-- no-gutters : 세로줄 간의 padding을 없애줌 -->
    <v-row no-gutters>
      <!-- 나누는 것 그리드 system -> 보통 12등분 -> 로그인 1 : 컨텐츠 2로 나눌 것임 -->
      <!-- 반응형 -> 그리드 바꾸면 됨 -->
      <!-- 로그인 1 -> 4 -->
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
// '~' : 소스들의 directory root -> 상대경로로 쓰기에는 ../../ .. 너무 길고 복잡해짐
import LoginForm from '~/components/LoginForm.vue';

export default{
  components: { LoginForm },
// 중복 -> nuxt.config.js에서 처리 가능
//    head() {
//        return {
//            title: 'NodeBird',
//        }
//    }

};
</script>

<style>

</style>