<template>

  <!-- <v-list>
    <v-list-item v-for="user in users" :key="user.id"> -->
      <!-- props 받은 것을 반복문으로 펼침 -->
      <!-- <span>{{ user.nickname }}</span> -->
      <!-- click 시 어떤 user인지에 따라 해야 할 action이 다름
      즉, 같은 컴포넌트지만 차이가 생기면 ?? props로 넘겨준다 -->
      <!-- <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon> -->
      <!-- <v-icon @click="removeHer">mdi-minus-circle-outline</v-icon> -->
    <!-- </v-list-item> -->
    <!-- <v-list-item>
      <span>네로</span>
      <v-icon>mdi-minus-circle-outline</v-icon>
    </v-list-item>
    <v-list-item>
      <span>히어로</span>
      <v-icon>mdi-minus-circle-outline</v-icon>
    </v-list-item> -->
  <!-- </v-list> -->

  <v-list>
    <!-- v-list-tile이 vue2 부터 사라짐 -->
    <v-col v-for="user in users" :key="user.id" cols="12" md="4" style="display: inline-block;">
      <!-- 12를 4로 나눈 3명씩 배치가 됨 -->
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{user.nickname[0]}}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{user.nickname}}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="remove(user.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
  
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    }
    // follow: {
    //   type: Object,
    //   required: true,
    // },
    // listType: {
    //   type: String,
    //   required: true,
    // }
  },
  // methods: {
  //   // removeHer() {
  //   //   if(this.listType == 'following') {
  //   //     this.$store.commit('users/unfollow', this.follow)
  //   //   } else {
  //   //     this.$store.commit('users/removeFollower', this.follow)
  //   //   }
  //   // }
  // }
}
</script>

<style>

</style>
