<template>
  <v-list>
    <v-list-item>
      <span>{{ follow.nickname }}</span>
      <v-icon @click="removeHer">mdi-minus-circle-outline</v-icon>
    </v-list-item>
    <!-- <v-list-item>
      <span>네로</span>
      <v-icon>mdi-minus-circle-outline</v-icon>
    </v-list-item>
    <v-list-item>
      <span>히어로</span>
      <v-icon>mdi-minus-circle-outline</v-icon>
    </v-list-item> -->
  </v-list>
</template>

<script>
export default {
  props: {
    follow: {
      type: Object,
      required: true,
    },
    listType: {
      type: String,
      required: true,
    }
  },
  methods: {
    removeHer() {
      if(this.listType == 'following') {
        this.$store.commit('users/unfollow', this.follow)
      } else {
        this.$store.commit('users/removeFollower', this.follow)
      }
    }
  }
}
</script>

<style>

</style>
