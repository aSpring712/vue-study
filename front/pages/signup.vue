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
        middleware: 'anonymous',
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
        computed: {
          // 회원가입 페이지에 있다가 로그인을 통해 로그인 한 경우 회원가입 페이지에서 벗어날 수 있도록, 
          // store의 me값 존재 여부에 따라, 해당 페이지에 머무를지 아닐지 watch로 me를 감지할 수 있도록 하려고
          // computed를 통해 store의 me값을 가져오고
          me() {
            return this.$store.state.users.me;
          }
        },
        watch: {
          // watch로 변하는 me값을 감지
          me(value, oldValue) {
            if(value) { // me 즉, value가 생긴 경우
              this.$router.push({path : '/', }); // 프로그래밍적으로 페이지 넘겨줬다고 표현
              // nuxt.js router, link로 넘겨주는 건 -> 컴포넌트 적으로 넘겨줬다고 표현
            }
          },
        },
        methods: {
            onSubmitForm() {
                // // 이렇게 해주면, vuetify에서 알아서 form 내용들을 검증하고 모두 유효할 시
                // this.$refs.form.validate()
                // // this.valid가 true로 변함 --> 1. watch로 잡아서 조작해도 되고
                // console.log(this.valid);

                if(this.$refs.form.validate()) { // 2. 이렇게 해도 true / false를 반환하기 때문에 여기서 조작해도 됨
                    // alert('회원가입 시도!');

                    // // signUp action을 dispatch -> setMe mutations을 commit
                    // this.$store.dispatch('users/signUp', {
                    //   nickname: this.nickname,
                    //   email: this.email
                    // }); // users 모듈의 actions 실행

                    // // 회원가입이 완료되면, 페이지 변경
                    // /* 주의!! 위의 actions는 비동기이므로
                    // --> 위의 작업과 아래 페이지 이동 작업의 순서가 달라질 수 있음
                    // --> 물론 실행 자체는 위에서 아래로 되지만 실행이 완료되는 시점이 다를 수 있음
                    // --> 따라서 페이지 이동이 먼저 되고, 그 다음 signUp 처리가 완료될 수 있음
                    // --> 회원가입에 성공한 경우만 main 페이지로 갈 수 있도록 실행 순서를 맞춰주어야 함
                    
                    // dispatch는 자체적으로 비동기이면서 promise이기 때문에 .then(() => {})을 붙여줄 수 있음 */
                    // this.$router.push({
                    //   path: '/',
                    // });


                    // signUp action을 dispatch -> setMe mutations을 commit
                    // action이 비동기이기 때문에 then과 catch를 써주어야 실행순서가 보장됨
                    this.$store.dispatch('users/signUp', {
                        nickname: this.nickname,
                        email: this.email,
                        password: this.password
                      })
                        .then(() => { // .then()으로 실행 순서 보장 -> 비동기 promise가 완료된 후 아래 실행
                          this.$router.push({
                            path: '/',
                          });
                        })
                          .catch(() => { // 회원가입 실패 시
                            alert('회원가입에 실패했습니다.')
                        });
                } else {
                    alert('폼이 유효하지 않습니다.');
                }
            },
          //   /* async await로 순서를 보장해주어도 됨( .then과 .catch 대신 )
          // async await는 무조건 try catch로 감싸주어야 함 */ 
          // async onSubmitForm() {
          //       if(this.$refs.form.validate()) { 
          //         try {
          //           const result = await this.$store.dispatch('users/signUp', {
          //               nickname: this.nickname,
          //               email: this.email
          //           })
                    
          //           // result가 들어오는 것에 따라 페이지 이동 처리
                    
          //         } catch(err) {
          //           console.log(e)
          //         }
          //       } else {
          //           alert('폼이 유효하지 않습니다.');
          //       }
          //   },
        },
    }
</script>
<style>
</style>
