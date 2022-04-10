const passport = require('passport');

// 함수를 모듈로 만듦 -> 언제든지 불러와서 재사용할 수 있도록
module.exports = () => {
  // 사용자 정보를 서버에 저장을 하는데, 사용자 정보가 엄청 많고 친구 관계도 복잡한데 서버에 다 저장하면 터짐 -> 최대한 가볍게 저장하기 위해 id만 저장할 것
  // req.login()할 때 딱 1번 실행 됨 -> 첫번째 인자인 user는 req.login(user) 여기서 온 것
  passport.serializeUser((user, done) => { 
    return done(null, user.id); // 메모리 부담을 줄이기 위해 서버에는 id만 저장
  })
  passport.deserializeUser(() => {

  })
};