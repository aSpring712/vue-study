// index.js 내 모듈
// 유저에 대한 정보

// state는 함수
export const state = () => ({
    me: null,
    // me 속성이 null이면 로그인하지 않은 상태
    // 사용자 정보에 대한 객체가 담겨있으면 로그인한 상태
    // -> 이런 상태를 전역적으로 관리하기 위해 Vuex를 사용
});

// state 외 나머지는 객체
export const mutations = { // 단순 동기적 작업 처리
    // 회원가입
    setMe(state, payload) { // state -> 위의 state에 접근 가능, payload에는 저 state를 어떻게 바꿀 것인지에 대한 정보가 담김
        // state를 mutations를 통해 바꾼다
        state.me = payload;
    }

    /* 주의
    mutations에는 비동기 작업이 있으면 안됨
    ex. setTimeout, new Promise, ajax 요청(xhr, axios, ..) 등 */

};

// 회원가입, 로그인 등은 ajax 요청을 통해 서버와 요청 및 응답을 주고받아야 하는데, mutations에서는 불가능
// actions는 보다 고차원적 개념으로, 동기적 작업 뿐만 아니라 비동기적이 작업 가능
export const actions = { // 복잡한 작업 처리, 특히 비동기적 작업 처리
    signUp(context, payload) { // context는 객체
        // console.log(context)로 구조를 확인해 볼 수 있음
        // 서버에 회원가입 요청을 보내는 부분
    },
    logIn({ commit, dispatch, state, rootState, getters, rootGetters }, payload) { // context를 구조분해 해서 쓰면 다음과 같음
        // commit : mutations 실행
        // dispatch : actions 실행
        // rootState, rootGetters : index 모듈의 state와 getters
    },
    logOut(context, payload) {

    },
}
