module.exports = {
    head: {
        title: 'NodeBird',
    },
    // 설치한 모듈들을 아래처럼 적어주면 자동으로 연결됨 (Vue.use 사용하지 않음) -> 모든 페이지에 알아서 적용됨 -> 중복 제거!
    modules: [
        '@nuxtjs/axios', // 서버쪽에 요청을 ajax로 보내기 위한 패키지
    ],
    // 원래는 devModules에 적어주는데 최근에 변경됨 -> 이런 것들은 언제 추적해야 하는가? npm outdated 해보고 버전이 바뀐 경우 체크해보기
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    plugins: [

    ],
    // 연결을 했기 때문에 아래에서 vuetify에 대한 설정 가능
    vuetify: {

    },
};