<template>
  <div>
    <v-container>
      <v-card>
        <v-container>
          <v-subheader>회원가입</v-subheader>
          <!-- 아래 5개 항목이 모두 입력되었다면 valid가 true가 되며 제출 버튼 활성화(클릭 가능) : 뷰티파이에서 제공하는 기능 -->
          <!-- ref="form" 지정하고, this.$refs.form.validate() 했을 때, 값이 모두 유효하면 valid가 자동으로 true로 바뀜 -->
          <v-form
            ref="form" 
            v-model="valid" 
            @submit.prevent="onSubmitForm"
          >
            <v-text-field
              v-model="email"
              label="이메일"
              type="email"
              :rules="emailRules"
              required
            />
            <v-text-field
              v-model="password"
              label="비밀번호"
              type="password"
              :rules="passwordRules"
              required
            />
            <v-text-field
              v-model="passwordCheck"
              label="비밀번호확인"
              type="password"
              :rules="passwordCheckRules"
              required
            />
            <v-text-field
              v-model="nickname"
              label="닉네임"
              type="nickname"
              :rules="nicknameRules"
              required
            />
            <v-checkbox
              v-model="terms" 
              label="무조건 동의합니다."
              :rules="[v => !!v || '약관에 동의해야 합니다.']"
              required
            />
            <v-btn
              color="green" 
              type="submit" 
              :disabled="!valid"
            >
              가입하기
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                valid: false, // 회원가입 버튼의 활성화(클릭 가능) 여부

                /* 회원가입 form */
                email: '',
                password: '',
                passwordCheck: '',
                nickname: '',
                terms: false, // 약관 동의 여부

                // vuetify에서 Form에 입력된 값들이 유효한지 검증해 줌 [조건함수 || 에러메시지]
                emailRules: [ // v에 값이 들어오고, 값이 없다면 에러메시지 노출
                    v => !!v || '이메일은 필수입니다.',
                    v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.',
                ],
                nicknameRules: [
                    v => !!v || '닉네임은 필수입니다.'
                ],
                passwordRules: [
                    v => !!v || '비밀번호는 필수입니다.'
                ],
                passwordCheckRules: [
                    v => !!v || '비밀번호 확인은 필수입니다.',
                    v => v === this.password || '비밀번호가 일치하지 않습니다.',
                ],
            }
        },
        head() {
            return {
                title: '회원가입',
            }
        },
        methods: {
            onSubmitForm() {
                // // 이렇게 해주면, vuetify에서 알아서 form 내용들을 검증하고 모두 유효할 시
                // this.$refs.form.validate()
                // // this.valid가 true로 변함 --> 1. watch로 잡아서 조작해도 되고
                // console.log(this.valid);

                if(this.$refs.form.validate()) { // 2. 이렇게 해도 true / false를 반환하기 때문에 여기서 조작해도 됨
                    alert('회원가입 시도!');
                } else {
                    alert('폼이 유효하지 않습니다.');
                }
            },
        },
    }
</script>
<style>
</style>
