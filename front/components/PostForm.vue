<template>
    <v-card style="margin-bottom: 20px;">
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
                    :success="success"
                    :success-messages="successMessages"
                    :rules="[v => !!v || '내용을 입력하세요.']"
                    @input="onChangeTextarea"
                />
                <!-- 버튼은 무조건 v-form 내에 -->
                <v-btn type="submit" color="green" absolute right>짹짹</v-btn>

                <!-- 이미지 업로드를 위해 반드시 필요 -->
                <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                <!-- form 내 버튼은 진짜 form을 제출하는 역할의 button을 제외(type="submit")하고는 모두 type="button"으로 적어주어야 함
                    왜냐하면, form 내의 버튼은 클릭하면 데이터를 전송해 버리므로 구분 필수 -->
                <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            valid: false,
            
            hideDetails: true, // true로 해주면, error msg가 나올 공간을 숨겨두고
            success: false,
            successMessages: '',

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
        onChangeTextarea(value) { // 한 글자라도 쓰면, 작은 글자 노출하지 않도록 초기화 (게시글 등록 시 초기화 되어야 하니까)
            // 글이 비어있다가 새로 작성 시 '게시글 등록 성공' 메세지 없애주는 등 초기화
            if(value && value.length) {
                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            }
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
                        this.content = '';
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                        this.hideDetails = false;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        onClickImageUpload() {
            // click event를 작동시키기 위해서는 DOM에 접근해야 함 -> ref 이용
            this.$refs.imageInput.click();
        },
        onChangeImages(e) {
            // 사진을 고르면 해당 이벤트가 발생하며, 파일은 e.target.files내에 들어감
            console.log(e.target.files); 
            
            const imageFormData = new FormData(); // FormData를 프로그래밍적으로 만들 수 있음

            // e.target.files : 배열처럼 보이지만 배열이 아닌, 유사배열로 (array like object -> forEach 사용불가)
            // ! forEach를 사용하기 위해 아래와 같은 방식을 사용해야 함
            [].forEach.call(e.target.files, (f) => { // files 내 파일들을 각각 하나씩 따로 떼어서
                imageFormData.append('image', f);  // 같은 key로 formData에 append -> { image: [file1, file2] };
            });
            this.$store.dispatch('posts/uploadImages', imageFormData);
        },
    },
};
</script>

<style>

</style>