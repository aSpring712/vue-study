// index.js 내 모듈
// 게시글의 대한 정보
export const state = () => ({
    // index.js가 아닌 모듈이기 때문에 this.$store.state.posts.mainPosts
    mainPosts: [], 

    /* infinite scrolling */
    // 처음부터 10개를 불러오고 시작할 것
    // 더 불러올 게시물이 존재하는지?에 대한 state
    hasMorePost: true, // 얘가 false 일 때, 더이상 server에 요청하지 않음
    // 계속 요청하면 front-end 개발자가 아니라, server를 공격하는 해커임
});

// module의 mutation 사용법
// this.$store.commit('posts/bye')

const limit = 10; // 한 번에 불러올 게시글의 개수

export const mutations = {
    // 동기적으로 변경
    addMainPost(state, payload) {
        state.mainPosts.unshift(payload); // 맨 앞에 추가
    },
    // 크롬 vue dev tools에 actions는 기록되지 않지만, mutations는 기록됨
    // actions에서 최대한 mutations를 활용하는 이유 ==> 기록하기 위해
    removeMainPost(state, payload) {
        const index = state.mainPosts.findIndex(v => v.id === payload.id) // mainPosts 중 id가 내가 넘긴 post의 id값과 같은 것이 있는지 찾아보고
        state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
        // 해당하는 게시글을 찾고
        const index = state.mainPosts.findIndex(v => v.id === payload.postId)
        // 해당 게시글의 Comments에 댓글 추가
        state.mainPosts[index].Comments.unshift(payload);
    },
    loadPosts(state) {
        // Array(limit).fill() 길이가 limit(10)인 빈 배열을 만드는 방법
        const fakePosts = Array(limit).fill().map(v => ({ // map 함수로 Dummy data를 만듦
            id: Math.random().toString(),
            User: {
                id: 1,
                nickname: "제로초",
            },
            content: `Hello, infinite scrolling~ ${Math.random()}`,
            Comments: [],
            Images: [],
        }));
        // 위에서 만든 가짜 데이터 10개씩을 기존의 mainPosts 배열과 concat으로 합침
        state.mainPosts = state.mainPosts.concat(fakePosts);
        // fakePosts의 길이(가짜 데이터의 개수)가 limit(10)과 같으면 더 불러올 게시글이 있다(hasMorePost = true)
        // limit과 같지 않으면 더 불러올 게시글이 없다(hasMorePost = false)
        state.hasMorePost = fakePosts.length === limit;
    }
};

// 이 actions를 미리 만들어 둔 이유 : 서버에 게시글 등록 요청을 보내기 위해
export const actions = {
    add({ commit }, payload) {
        // 여기서 posts/addMainPost 라고 하지않는 이유는, 여기가 main이라는 것을 알기 때문에 굳이 같은 모듈 내에서는 붙이지 않음
        commit('addMainPost', payload); // 기본적으로 { root: false }

        // // 모듈간 서로 호출이 가능한데, 그런데 다른 모듈인 index에도 addMainPost가 있고, 그걸 사용하고 싶다면
        // commit('addMainPost', payload, { root: true }); // 이렇게 해주면 index 모듈에 있는 addMainPost가 호출됨
    },
    remove({commit}, payload) {
        commit('removeMainPost', payload);
    },
    addComment({ commit }, payload) {
        commit('addComment', payload);
    },
    // 더 불러오기 위한
    loadPosts({ commit, state }, payload) {
        if (state.hasMorePost) {
            commit('loadPosts');
        }
    }
}