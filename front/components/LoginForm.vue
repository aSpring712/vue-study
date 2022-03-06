<template>
    <!-- v-container : 패딩을 주는 역할 -->
    <!-- 로그인 여부(vuex store에 있는 state)에 따라 분기 처리 -->

    <!-- 로그인 안했을 때 -->
    <v-container v-if="!me">
      <v-card>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-container>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="이메일"
              type="email"
              required
            />

            <v-text-field 
              v-model="password"
              :rules="passwordRules"
              label="비밀번호"
              type="password"
              required
            />
            <v-btn color="green" type="submit" :disabled="!valid">
              로그인
            </v-btn>
            <v-btn nuxt to="/signup">
              회원가입
            </v-btn>
          </v-container>
        </v-form>
      </v-card>
    </v-container>

    <!-- 로그인 시 -->
    <v-container v-else>
      <v-card>
        <v-container>
          {{ me.nickname }}님 로그인되었습니다.
          <v-btn @click="onLogOut">로그아웃</v-btn>
        </v-container>
      </v-card>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            // 로그인
            valid: false,

            email: '',
            password: '',

            emailRules: [
                v => !!v || '이메일을 입력해주세요.',
                v => /.+@+./.test(v) || '이메일이 유효하지 않습니다.',
            ],
            passwordRules: [
                v => !!v || '비밀번호를 입력해주세요.',
            ],
        }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
      // nickname() {
      //   return this.$store.state.users.me.nickname;
      // }
    },
    methods: {
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                // alert('로그인 시도!!')

                this.$store.dispatch('users/logIn', {
                  email: this.email,
                  nickname: 'dummy nickname',
                })
                // .then(() => {
                //   this.$router.push({path:'/'})
                // })
            } else {
                alert('로그인 폼이 유효하지 않음!!')
            }
        },
        onLogOut() {
          // logOut action이 dispatch되고, setMe가 commit됨
          this.$store.dispatch('users/logOut');
          this.$router.push({path:'/'})
        }
    },
}
</script>

<style>

</style>
