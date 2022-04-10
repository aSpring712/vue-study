// index.js 내 모듈
// 유저에 대한 정보

// state는 함수
export const state = () => ({
    me: null,
    // me 속성이 null이면 로그인하지 않은 상태
    // 사용자 정보에 대한 객체가 담겨있으면 로그인한 상태
    // -> 이런 상태를 전역적으로 관리하기 위해 Vuex를 사용

    followerList: [
        // Dummy Data 비움 -> fetch할 것
        // {
        //     id: 1,
        //     nickname: 'spring',
        //     email: 'spring@spring.com'
        // }, {
        //     id: 2,
        //     nickname: 'ronnie',
        //     email: 'ronnie@ronnie.com',
        // }, {id:3,
        //     nickname: 'mango',
        //     email: 'mango@mango.com',
        // }
    ],
    followingList: [
        // {
        //     id: 1, nickname: 'happy', email: 'happy@happy.com'
        // },
        // {
        //     id: 2, nickname: 'sunday', email: 'sunday@sunday.com'
        // },
        // {
        //     id: 3, nickname: 'moon', email: 'moon@moon.com'
        // }
    ],
    hasMoreFollower: true,
    hasMoreFollowing: true,
});

// For simulation
const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

// state 외 나머지는 객체
export const mutations = { // 단순 동기적 작업 처리
    // 회원가입
    setMe(state, payload) { // state -> 위의 state에 접근 가능, payload에는 저 state를 어떻게 바꿀 것인지에 대한 정보가 담김
        // state를 mutations를 통해 바꾼다
        state.me = payload;
    },
    changeNickname(state, payload) {
        state.me.nickname = payload.nickname;
    },
    addFollower(state, payload) {
        state.followerList.push(payload);
    },
    addFollowing(state, payload) {
        state.followingList.push(payload);
    },
    removeFollower(state, payload) {
        const index = state.followerList.findIndex(v => v.id === payload.id);
        state.followerList.splice(index, 1);
    },
    removeFollowing(state, payload) {
        const index = state.followingList.findIndex(v => v.id === payload.id);
        state.followingList.splice(index, 1);
    },
    loadFollowings(state) {
        const diff = totalFollowings - state.followingList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000),
        }));
        state.followingList = state.followingList.concat(fakeUsers);
        state.hasMoreFollowing = fakeUsers.length === limit;
    },
    loadFollowers(state) {
        const diff = totalFollowers - state.followerList.length;
        const fakeUsers = Array(diff > limit ? limit : diff).fill().map(v => ({
            id: Math.random().toString(),
            nickname: Math.floor(Math.random() * 1000),
        }));
        state.followerList = state.followerList.concat(fakeUsers);
        state.hasMoreFollower = fakeUsers.length === limit;
    },
    // unfollow(state, payload) {
    //     const index = state.followingList.findIndex( v => v.email === payload.email)
    //     state.followingList.splice(index, 1);
    // },
    // removeFollower(state, payload) {
    //     const index = state.followerList.findIndex(v => v.email === payload.email)
    //     state.followerList.splice(index, 1);
    // }

    /* 주의
    mutations에는 비동기 작업이 있으면 안됨
    ex. setTimeout, new Promise, ajax 요청(xhr, axios, ..) 등 */

};

// 회원가입, 로그인 등은 ajax 요청을 통해 서버와 요청 및 응답을 주고받아야 하는데, mutations에서는 불가능
// actions는 보다 고차원적 개념으로, 동기적 작업 뿐만 아니라 비동기적이 작업 가능
export const actions = { // 복잡한 작업 처리, 특히 비동기적 작업 처리
    signUp({ commit, state }, payload) { // ( context, payload ) -> context는 객체
        // console.log(context)로 구조를 확인해 볼 수 있음
        // 서버에 회원가입 요청을 보내는 부분

        // console.log(this.$axios); // axios -> backend 서버로 요청을 보내주는 라이브러리

        // this.$axios.get('/') // -> front에서는 이렇게 요청을 보내고, back에서는 app.get('/')로 받음

        // 사용자를 생성하다 -> 앞을 동작, 뒤를 장원(대상)으로 두는 주소체계 : REST API
        // this.$axios.post('/user', { // 이렇게만 해주면, front server에 요청을 보내게 됨
        this.$axios.post('http://localhost:3085/user', { 
            email: payload.email,
            nickname: payload.nickname,
            password: payload.password,
        }) // 이렇게 데이터를 body에 담아서 서버로 보냄

        

        // 서버에서 응답이 오면, state 변경 및 로그인 처리
        commit('setMe', payload);
        // context 자리에 { commit, state } 해서
        // state.me = payload // 이렇게 써줄 수도 있지만 보통 state 변경하는 부분은 동기적으로 변경하는 것이므로 mutations로 만들어주는 것이 좋음
        // -> actions와 mutations를 완전히 분리
        
    },
    logIn({ commit, dispatch, state, rootState, getters, rootGetters }, payload) { // context를 구조분해 해서 쓰면 다음과 같음
        // commit : mutations 실행
        // dispatch : actions 실행
        // rootState, rootGetters : index 모듈의 state와 getters
        
        commit('setMe', payload);
    },
    logOut({ commit }, payload) {
        commit('setMe', null);
    },
    chageNickname({ commit }, payload) {
        // server를 거치는 것이면 무조건 actions로 만들어서 서버 요청을 보낸 후, mutations로 최종적으로 변경
        commit('changeNickname', payload);
    },
    addFollowing({ commit }, payload) {
        commit('addFollowing', payload);
    },
    addFollower({ commit }, payload) {
        commit('addFollower', payload);
    },
    removeFollowing({ commit }, payload) {
        // 이 부분에는 사실 비동기 요청이 들어감
        commit('removeFollowing', payload);
    },
    removeFollower({ commit }, payload) {
        commit('removeFollower', payload);
    },
    // 더보기
    loadFollowers({ commit, state }, payload) {
        // 더보기 할 팔로워가 있을 때
        if (state.hasMoreFollower) {
            commit('loadFollowers');   
        }
    },
    loadFollowings({ commit, state }, payload) {
        if (state.hasMoreFollowing) {
            commit('loadFollowings');
        }
    },

    // unfollow({ commit }, payload) {
    //     commit('unfollow', payload);
    // },
    // removeFollower({ commit }, payload) {
    //     commit('removeFollower', payload)
    // }
}
