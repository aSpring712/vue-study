const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// router 분리하면서 항상 그 파일에서 사용하는 모듈들 require 필요
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();


/* 회원가입  */
// * app.post -> router.post로 변경 && /user 부분 없애기
router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
        // * 비밀번호 암호화
        const hash = await bcrypt.hash(req.body.password, 12);

        // email 중복 방지
        const exUser = await db.User.findOne({ 
            where: {
                email: req.body.email,
            },
        })
      
        // * email 중복 일 때
        if (exUser) { 
            return res.status(403).json({ 
                errorCode: 1, // error code는 마음대로 -> front와 협의해서
                messege: '이미 회원가입되어있습니다.',
            }); 
            // ! 이렇게 해도 back단에서 중복을 잡아내지 못할 수도 있음 -> db단에서 걸러내야 함 -> unique: true
        }

        // * 중복아닐 때, 회원 등록
        await db.User.create({
            email: req.body.email, 
            password: hash, 
            nickname: req.body.nickname,
        });    

        // * 회원가입에 성공 시 그 정보 그대로 바로 로그인 처리
        passport.authenticate('local', (err, user, info) => { 
          if (err) {
              console.error(err);
              return next(err);
            }
            
          if (info) {
              return res.status(401).send(info.reason); 
          }
          
          return req.login(user, async (err) => {
              if (err) {
                  console.error(err);
                  return next(err);
              }
              return res.json(user);
          }); 
      })(req, res, next);

    } catch(err) {
        console.log(err);
        return next(err); 
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => { // app.use('/user', userRouter) -> 의 주소와 합쳐져 실제 주소 : /user/login
    passport.authenticate('local', (err, user, info) => {
        // err 존재
        if (err) {
            console.error(err);
            return next(err); // err 알아서 처리하게 넘겨버림
        }

        if (info) {
            return res.status(401).send(info.reason); // front에서 잘못된 요청을 보냈으므로 거절
        }

        // * 로그인 성공 시 req.login -> serializeUser 실행 -> 세션에 사용자 정보 저장
        return req.login(user, async (err) => { 
            if (err) {
                console.error(err);
                return next(err);
            }
          
            return res.json(user); // front에 data 보냄 -> header에 cookie + body에 추가 data
        }); 
    })(req, res, next);
});

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
    if (req.isAuthenticated()) { 
        req.logout(); // 필수
        req.session.destroy(); // 선택 : 세션까지 모두 없애주기 (session에 사용자 정보 외에 다른 정보가 들어있을 수 있으므로)
        return res.status(200).send('로그아웃 되었습니다.');
    }
})

module.exports = router;