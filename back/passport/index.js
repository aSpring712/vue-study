const passport = require('passport');

// 함수를 모듈로 만듦 -> 언제든지 불러와서 재사용할 수 있도록
module.exports = () => {
  passport.serializeUser(() => {

  })
  passport.deserializeUser(() => {

  })
};