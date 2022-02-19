<template>
    <div>
        <v-container>
            <v-card style="margin-bottom:20px;">
                <v-container>
                    <v-container>
                        <v-subheader>내 프로필</v-subheader>
                    </v-container>
                    <v-form>
                        <v-text-field 
                            label="닉네임"
                            required
                        />
                        <v-btn color="blue" type="submit">수정</v-btn>
                    </v-form>
                </v-container>
            </v-card>
            <v-card style="margin-bottom:20px;">
                <v-container>
                    <v-subheader>팔로잉</v-subheader>
                    <FollowList />
                </v-container>
            </v-card>
            <v-card style="margin-bottom:20px;">
                <v-container>
                    <v-subheader>팔로워</v-subheader>
                    <FollowList />
                </v-container>
            </v-card>
        </v-container>
    </div>
</template>
<script>
    import FollowList from '~/components/FollowList.vue';

    export default {
        // layout: 'admin', // 해당 페이지는 layout이 default가 아니라 admin.vue가 됨
        components: {
            FollowList,
        },
        data() {
            return {
                name: 'Nuxt.js',
            }
        },
        // 원래는 html의 head 태그에 들어갈 내용들(template 안에 넣을 수 없음) -> script, title, meta 등을 손쉽게 바꿀 수 있음
        head() {
            return {
                title: '프로필',
            }
        },
        methods: {},
        // computed: {},
        watch: {},
    }
</script>
<style>
</style>
