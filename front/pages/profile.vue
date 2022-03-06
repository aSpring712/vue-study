<template>
  <!-- <div v-if="me"> -->
    <!-- middleware로 처리 -->
    <div> 
    <v-container>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-container>
            <v-subheader>내 프로필</v-subheader>
          </v-container>
          <v-form v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field 
              v-model="nickname"
              label="닉네임"
              :rules="nicknameRules"
              required
            />
            <v-btn color="blue" type="submit" :disabled=" !valid ">
              수정
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <!-- 팔로잉 리스트, 팔로워 리스트에서 모두 같은 컴포넌트인 FollowList를 사용하므로 구분을 위해 props를 넘겨주기
          -> 같은 컴포넌트를 쓰면서 다른 사용자 리스트를 넘겨줄 수 있게 됨 -->
          <!-- <FollowList v-for="user in followings" :key="user.id" :follow="user" list-type="following" /> -->
          <FollowList :users="followingList" :remove="removeFollowing" />
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <!-- <FollowList v-for="user in followers" :key="user.id" :follow="user" list-type="follower" /> -->
          <FollowList :users="followerList" :remove="removeFollower" />
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
        middleware: 'authenticated',
        data() {
            return {
                valid: false,
                nickname: '',
                nicknameRules: [v => !!v || '닉네임을 입력하세요.'],
            }
        },
        // 원래는 html의 head 태그에 들어갈 내용들(template 안에 넣을 수 없음) -> script, title, meta 등을 손쉽게 바꿀 수 있음
        head() {
            return {
                title: '프로필',
            }
        },
        computed: {
          followerList() {
            return this.$store.state.users.followerList
          },
          followingList() {
            return this.$store.state.users.followingList
          },
          me() {
            return this.$store.state.users.me
          }
        },
        watch: {},
        methods: {
          onChangeNickname() {
            this.$store.dispatch('users/chageNickname', {
              nickname: this.nickname
            })
            .then(() => {
              console
            })
            .catch((err) => {
              console.log(err)
            })
          },
          removeFollowing(id) {
            this.$store.dispatch('users/removeFollowing', {
              // id: id,
              id // key와 value가 같은 경우는 축약 가능
            })
          },
          removeFollower(id) {
            this.$store.dispatch('users/removeFollower', {id})
          },
        },
    }
</script>
<style>
</style>
