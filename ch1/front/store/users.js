// index.js 내 모듈
// 유저에 대한 정보
export const state = () => ({
    name: 'users',
});

export const mutations = {
    BYE(state) {
        state.name = 'goodbye users';
    }
};
