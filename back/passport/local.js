const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

module.exports = () => {
  // 이 LocalStrategy가 알아서 실행되는 것이 아니라, 실제 front -> back으로 요청을 보내면 app.js의 app.get에서 걸리므로 거기서 직접 실행시켜 주어야 함
  passport.use(new LocalStrategy({
    // * 3. req.body.email, req.body.password를 받음
    usernameField: 'email', // req.body.email -> 이렇게 body에 속하는 걸 적어주어야 함
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => { // 그 값들이 들어옴
    try {
      // * 4. 검사 -> db 사용 -> 로그인 할 수 있는지 없는지 검사하는 것이 바로 전략 부분
      // 1. 먼저 email로 해당 User가 있는지 찾아보기 -> 없으면 비밀번호 검사할 필요도 없음
      const exUser = await db.User.findOne({ where: { email } });

      // 사용자가 없는 경우
      if (!exUser) {
        // done(error, 성공, 실패);
        return done(null, false, {reason: '존재하지 않는 사용자입니다.'}); // done -> callback 함수
      }

      // 사용자가 있는 경우 -> 비밀번호 비교
      const result = await bcrypt.compare(password, exUser.password) // (사용자가 입력한 비밀번호, db에 저장된 비밀번호) 비교
      // 일치 시 result : true
      if (result) {
        // * 5. 성공 시 다시 app.js로 돌아감 -> callback 함수로
        return done(null, exUser); // 성공 시 사용자 정보를 넣어줌
      } else {
        return done(null, false, { reason: '비밀번호가 틀립니다.' });
      }

      // error -> 비동기 요청(await) 시 error가 자주 발생 -> try catch 꼭 써주기
    } catch (err) {
      console.log(err)
      return done(err);
    }
  }));
};