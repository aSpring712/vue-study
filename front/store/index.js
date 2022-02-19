// 전체적인 설정
// idnex.js가 기본 vuex store가 되고,
// posts.js나 users.js는 기본 store 안의 또다른 state, mutations 다른 하나의 종류가 더 생기는 것

// state는 함수
export const state = () => ({
    hello: 'vuex', // this.$store.state.hello
});

// 나머지는 객체, 그 안에 함수들
export const mutations = {
    BYE(state) {
        state.hello = 'goodbye';
    }
};
