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
          <FollowList :abc="abc" :users="followerList" :remove="removeFollower" />
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
                // abc: 'a',
                abc: [1, 2, 3],

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
        mounted() {
          // 부모 페이지에서 자식 컴포넌트로 props를 통해 넘겨주는 값 abc를 mounted 때 변경하는 경우, 자식 컴포넌트에서는 적용되지 않는 이유?
          // this.abc = 'b'; // -> 자식 컴포넌트에 {{ abc }}에 b가 잘 찍힘

          // 객체의 속성 변경 또는 Array인 경우 index로 접근할 경우 안될 수도 있음 -> 자식 컴포넌트에는 변경 전 값 [1, 2, 3]이 찍힘 -> 자식 컴포넌트에서 updated가 안불려질 수 있음
          // this.abc[0] = '5' -> Not working
          // 이 경우 -> this.$set()을 써주어야 함
          this.$set(this.abc, '0', '5')
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
