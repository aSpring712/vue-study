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
            <v-btn dark color="blue" type="submit" :disabled=" !valid ">
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
          <!-- 페이징 -->
          <v-btn v-if="hasMoreFollowing" @click="loadMoreFollowings" dark color="blue" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin-bottom:20px;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <!-- <FollowList v-for="user in followers" :key="user.id" :follow="user" list-type="follower" /> -->

          <!-- profile.vue이지만 실제로 렌더링은 followList.vue에서 하는데, 따로 이어줄 필요없이 vuex store만 바꿔주면 됨
            -> 관심사 분리 : 데이터만 바꾸면 화면에 반영되므로 의존 관계도 줄고 에러도 준다 -->
          <FollowList :users="followerList" :remove="removeFollower" />
          <!-- 페이징 -->
          <v-btn v-if="hasMoreFollower" @click="loadMoreFollowers" dark color="blue" style="width: 100%">더보기</v-btn>
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
          },
          // 이렇게 쓰기 귀찮으면 mapState
          hasMoreFollowing() {
            return this.$store.state.users.hasMoreFollowing;
          },
          hasMoreFollower() {
            return this.$store.state.users.hasMoreFollower;
          },
        },
        watch: {},
        fetch({ store }) { // context를 구조분해
          // 데이터 2개를 미리 준비
          store.dispatch('users/loadFollowers');
          store.dispatch('users/loadFollowings');
        },
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
          // 더보기 -> 실무에서는 이 방식을 사용하지 않음 -> 더보기를 누르는 사이에 데이터가 추가/삭제될 수 있으므로
          // 따라서 limit 방식이 아닌, lastId 방식을 사용함
          loadMoreFollowings() {
            this.$store.dispatch('users/loadFollowings');
          },
          loadMoreFollowers() {
            this.$store.dispatch('users/loadFollowers');
          }
        },
    }
</script>
<style>
</style>
