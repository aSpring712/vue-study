module.exports = {
    head: {
        title: 'NodeBird',
    },
    // 설치한 모듈들을 아래처럼 적어주면 자동으로 연결됨 (Vue.use 사용하지 않음) -> 모든 페이지에 알아서 적용됨 -> 중복 제거!
    modules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/axios', // 서버쪽에 요청을 ajax로 보내기 위한 패키지
    ],
    plugins: [

    ],
    // 연결을 했기 때문에 아래에서 vuetify에 대한 설정 가능
    vuetify: {

    },
};