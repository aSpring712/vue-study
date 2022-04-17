const express = require('express');
// 로그인 체크를 위해 직접 만든 미들웨어
const { isLoggedIn } = require('./middlewares.js'); // exports한 것(Object)을 구조분해

const router = express.Router();

// 게시글 작성
router.post('/', isLoggedIn, (req, res) => {
  // * 권한 확인을 위해 route에서 자주 사용하는 것 -> req.isAuthenticated()가 true인지 false인지
  // * 로그인 한 사용자만 가능한 것이면 -> if(req.isAuthenticated()) 반대면 if(!req.isAuthenticated())
  // * 추가적으로 관리자인지 일반 유저인지 등등 ..
  // ! 또는 관리자인지 일반회원인지 등... -> 권한 확인을 위해 반복적으로 써야함
  // ! 이미 router 자체가 미들웨어이지만, 반복되는 것을 따로 또 미들웨어로 빼서 쓸 수 있음 -> routes/middlewares.js
  
  // ! 미들웨어를 만들고, 중간에 끼워넣으면 아래 코드를 반복적으로 쓰지 않고도 미들웨어에서 체크 후 next();
  // if (req.isAuthenticated()) { // 이것으로 로그인을 했는지, 아닌지를 검사할 수 있음
        
  // }
});

// 게시글에 이미지 여러개 넣기
router.post('/images', isLoggedIn, (req, res) => {
    // if (req.isAuthenticated()) { // 이것으로 로그인을 했는지, 아닌지를 검사할 수 있음
          
    // }
});

module.exports = router;