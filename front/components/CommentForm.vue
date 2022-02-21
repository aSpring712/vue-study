<template>
  <v-form ref="form" v-model="valid" style="position: relative" @submit.prevent="onSubmitForm">
    <v-textarea
      v-model="content"
      filled
      auto-grow
      label="댓글 달기"
      :hide-details="hideDetails"
      :success="success"
      :success-messages="successMessages"
      @input="onChangeTextarea"      
    />
    <v-btn color="green" dark absolute top right type="submit" :disabled="!valid">삐약</v-btn>
  </v-form>  
</template>

<script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        // validation
        valid: false,

        // form
        hideDetails: true,
        success: false,
        successMessages: '',

        content: '',
      }
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      }
    },
    methods: {
      // 새로운 댓글 작성 시 이전 상태 초기화
      onChangeTextarea(value) {
        if (value.length) { // 입력된 content가 있는 경우
          this.hideDetails = true;
          this.success = false; 
          this.successMessages = '';
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          // dummy data는 항상 back-end 개발자와 상의해서 객체의 모양을 어떻게 할 것인지 정하고 진행
          this.$store.dispatch('posts/addComment', {
            id: Date.now(),
            postId: this.postId,
            content: this.content,
            User: {
              nickname: this.me.nickname,
            }
          })
            .then(() => {
              this.content = '';
              this.success = true;              
              this.successMessages = '댓글이 등록되었습니다.'; // ['', '''] // 메세지도 배열로해서 여러개 띄울 수 있음
              this.hideDetails = false;
            })
            .catch((err) => {
              console.log(err)
            });
        }
      },
    },
  }
</script>

<style>

</style>