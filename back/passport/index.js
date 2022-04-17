const passport = require('passport');
const local = require('./local');
const db = require('../models');

// 함수를 모듈로 만듦 -> 언제든지 불러와서 재사용할 수 있도록
module.exports = () => {
  // 사용자 정보를 서버에 저장을 하는데, 사용자 정보가 엄청 많고 친구 관계도 복잡한데 서버에 다 저장하면 터짐 -> 최대한 가볍게 저장하기 위해 id만 저장할 것
  // req.login()할 때 딱 1번 실행 됨 -> 첫번째 인자인 user는 req.login(user) 여기서 온 것
  passport.serializeUser((user, done) => {
    return done(null, user.id); // 메모리 부담을 줄이기 위해 서버에는 id만 저장(cookie)
  });

  // 우리는 로그인 시 id만을 원하는 게 아니라 user의 정보를 원함
  // ! deserializeUser -> 로그인 후 모든 요청에서 실행 됨(모든 요청마다 사용자 정보를 복구해서 req.user에 넣어줌)
  // ! -> 모든 요청 마다 최소 1번씩은 db 요청이 들어감 -> 문제가 될 수 있기 때문에 나중에는 이 부분을 캐싱을 통해 극복할 예정
  // ! backend는 db요청을 최소화하는 것이 숙제
  passport.deserializeUser( async (id, done) => { // memory 절약을 위해 id만 저장해 둔것을 가지고, db에서 사용자의 data를 조회함
    try {
      const user = await db.User.findOne({ where: { id } });
      return done(null, user); // req.user와, req.isAuthenticated() = true로 만들어 줌
    } catch (err) {
      console.error(err);
      return done(err);
    }
  });
  local(); // localStrategy를 실행시켜 등록시킴
};