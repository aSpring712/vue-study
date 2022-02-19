// index.js 내 모듈
// 게시글의 대한 정보
export const state = () => ({
    name: 'posts', // index.js가 아닌 모듈이기 때문에 this.$store.state.posts.name
});

// module의 mutation 사용법
// this.$store.commit('posts/bye')
export const mutations = {
    BYE(state) {
        state.name = 'goodbye posts';
    }
};
