// 보통의 미들웨어 모양 (req, res, next)

// 로그인 한 경우에만 접근 가능
exports.isLoggedIn = (req, res, next) => {
  // 로그인 한 경우
  if (req.isAuthenticated()) {
    return next(); // next() -> 다음 미들웨어로 넘어간다
    // next() 내에 어떤 인수를 넣어준다 ? -> error 처리로 넘어가버림! -> 넣으면 에러, 아니면 다음 미들웨어로 넘어감
  }
  // 로그인 하지 않은 경우
  return res.status(401).send('로그인이 필요합니다.');
};

// 로그인하지 않았을 때만 접근 가능
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('로그인한 사람은 이용할 수 없습니다.');
};

// * exports.isNotLoggedIn -> 이렇게 한 뒤 마지막에 module.exports = ''; 하면 덮어씌워져버리므로 함께 사용 불가
// * exports 보다 module.exports가 우선하므로, 위와 같이 하나하나 exports 하거나,
// * 아래처럼 module.exports 내에 객체로 쓰거나
// module.exports = {
//   isLoggedIn: (req, res, next) => {

//   },
//   isNotLoggedIn: (req, res, next) => {

//   },
// };

// ! exports 자체가 Object이므로, 그 객체 내에 isLoggedIn 등과 같은 것을 내가 주입하는 셈