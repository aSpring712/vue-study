// 로그인하지 않은 사용자인가?

// 미들웨어를 통해 페이지에 접근하기 전에 검사 + 동작을 취할 수 있음
export default function ({ store, redirect }) { // ( context )
  if (store.state.users.me) { // 로그인 한 사용자
    redirect('/'); // 메인 페이지로 보냄
  }
  // axios 요청을 보내거나, store에 dispatch를 보내는 등
}