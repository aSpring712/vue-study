// 로그인하지 않은 사용자인가?

// 미들웨어를 통해 페이지에 접근하기 전에 검사 + 동작을 취할 수 있음
export default function ({ store, redirect }) { // ( context )
  // 로그인 한 상태에서 '회원가입' 클릭해서 해당 페이지에 접근 시 해당 Middleware에 걸리지만
  // 주소창에서 url 직접 입력 시 새로고침 되므로 store가 초기화되어 로그인 풀려서 회원가입 페이지에 접근 가능함
  if (store.state.users.me) { // 로그인 한 사용자
    redirect('/'); // 메인 페이지로 보냄
  }
  // axios 요청을 보내거나, store에 dispatch를 보내는 등
}