// 로그인 한 사용자가 맞는가?
export default function ({ store, redirect }) { // ( context )
  if (!store.state.users.me) { // 로그인 하지 않은 상태
    redirect('/'); // 메인 페이지로 보냄
  }
}