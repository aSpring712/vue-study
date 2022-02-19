// index.js 내 모듈
// 게시글의 대한 정보
export const state = () => ({
    // index.js가 아닌 모듈이기 때문에 this.$store.state.posts.mainPosts
    mainPosts: [], 
});

// module의 mutation 사용법
// this.$store.commit('posts/bye')
export const mutations = {
    // 동기적으로 변경
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload); // 맨 앞에 추가
    }
};

// 이 actions를 미리 만들어 둔 이유 : 서버에 게시글 등록 요청을 보내기 위해
export const actions = {
    add({ commit }, payload) {
        // 여기서 posts/addMainPost 라고 하지않는 이유는, 여기가 main이라는 것을 알기 때문에 굳이 같은 모듈 내에서는 붙이지 않음
        commit('addMainPost', payload); // 기본적으로 { root: false }

        // // 모듈간 서로 호출이 가능한데, 그런데 다른 모듈인 index에도 addMainPost가 있고, 그걸 사용하고 싶다면
        // commit('addMainPost', payload, { root: true }); // 이렇게 해주면 index 모듈에 있는 addMainPost가 호출됨
    }
}