<template>
    <v-card>
        <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <!-- 
                    outlined 외곽선, 
                    auto-grow : 텍스트가 길어지면 자동으로 칸이 한 줄씩 넓어지는 것,
                    clearable : x 표시가 떠서 클릭 시 한번에 내용 지워주는 것
                    -->
                <v-textarea
                    v-model="content"
                    outlined
                    auto-grow
                    clearable
                    label="어떤 신기한 일이 있었나요?"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    :rules="[v => !!v.trim() || '내용을 입력하세요.']"
                    @input="onChangeTextarea"
                />
            </v-form>
            <v-btn type="submit" color="green" absolute right>짹짹</v-btn>
            <v-btn>이미지 업로드</v-btn>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            hideDetails: true, // true로 해주면, error msg가 나올 공간을 숨겨두고
            successMessages: '',
            success: false,

            content: '',
        }
    },
    computed: {
        /* store에서 state 값 받아오는 방법 1 */
        // me() {
        //     return this.$store.state.users.me;
        // }

        /* store에서 state 값 받아오는 방법 2 */
        // ...mapState(['users/me']) // (['모듈명/인자'])

        /* store에서 state 값 받아오는 방법 3 */
        ...mapState('users', ['me']) // (모듈명, [인자])
    },
    methods: {
        onChangeTextarea() { // 한 글자라도 쓰면, 작은 글자 노출하지 않도록 초기화 (게시글 등록 시 초기화 되어야 하니까)
            this.hideDetails = true;
            this.success = false;
            this.successMessages = '';
        },
        onSubmitForm() {
            if(this.$refs.form.validate()) {
                this.$store.dispatch('posts/add', {
                    /* 입력되는 게시글의 내용 외에도 게시글을 작성한 유저의 정보, 댓글, 이미지 등의 데이터가 있는데,
                    실제로 개발 시 서버쪽에서 백엔드 개발자가 데이터를 만들어 보내주기 때문에 미리 백엔드 개발자와 상의
                    '게시글 객체의 모양 어떻게 보내줄 건지?' 미리 물어보고 만들어놓기
                    --> 따라서 미리 어떤 모양으로 데이터를 주고받을지 문서화 해놓는 것이 중요 */

                    content: this.content,
                    User: {
                        nickname: this.me.nickname
                    },
                    Comments: [],
                    Images: [],
                    id: Date.now(),
                    createdAt: Date.now(),
                })
                    .then(() => {
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
    }
}
</script>

<style>

</style>