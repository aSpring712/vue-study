<template>
  <div>
    <!-- 패딩을 주는 역할 -->
    <v-container>
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
  </div>
</template>

<script>
export default {
    data() {
        return {
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
    methods: {
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                alert('로그인 시도!!')
            } else {
                alert('로그인 폼이 유효하지 않음!!')
            }
        },
    },
}
</script>

<style>

</style>
