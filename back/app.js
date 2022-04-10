// front -> back으로 요청을 보내면 위에서부터 아래로 미들웨어를 훑으며 실행 됨

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport'); // passport 원본 미들웨어도 연결해줘야 함
const session = require('express-session');
const cookie = require('cookie-parser');

const morgan = require('morgan');

const db = require('./models'); // models/index.js에서 module.exports = db; -> 그 db를 불러온 것, 그 안에 User가 있음
// 내가 만든 모듈과 실제 모듈(passport)이 헷갈릴 수 있음 -> 내가 함수를 모듈로 만든 파일을 가져오는 것이므로 passportConfig로 이름 지정
const passportConfig = require('./passport');
const app = express();


// 서버 시작 시 app.js가 시작되면서 db, sequelize.sync()까지 같이 실행되도록
// db.sequelize.sync({ force: true }); // db 시작
db.sequelize.sync(); // db 시작
passportConfig(); // 서버가 시작될 때, 시퀄라이즈도 동작시키고 passport도 연결

// 요청이 왔을 때, 대해 console에 기록해 줌
app.use(morgan('dev')); // 보통 맨 위에다 써줌
app.use(cors('http://localhost:3000')); // () 이렇게 하면 모든 요청을 다 허용하므로 실무에서는 절대 이렇게하면 안됨 -> 정확하게 허용할 프론트 주소 적어주기
// express는 body로 Json data를 받지못하므로 써주어야 함
app.use(express.json()); // 요청으로 온 json data를 parsing(해석)해서 req.body에 넣어줌 // * req.body 만들어 줌
app.use(express.urlencoded({ extended: false })); // form에서 action을 통해 전송할 때, 그 데이터를 해석해서 req.body에 넣어줌 // * req.body 만들어 줌
app.use(cookie('cookiesecret'));
// passport를 사용하기 위해 미들웨어 연결
// passport의 session 사용하기 위해 express session 설치 필요
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'cookiesecret', // 쿠키는 암호화 할 수 있고, 그 암호화 한 것을 해독할 수 있는 key가 있음
})); 
app.use(passport.initialize()); // 요청(로그인, 로그아웃 기능 만들어 줌)
app.use(passport.session()); // 사용자 로그인 정보를 기록할 수 있는 session을 만들어 줌 -> 이걸 사용하려면 express session 설치 필요 ( app.use(session()); )

// app.use() --> req, res를 조작하는 express middleware (get, post도 마찬가지)

// / -> localhost:3085/ -> 'main page를 가져온다'는 의미
app.get('/', (req, res) => {
    res.send('안녕 시퀄라이즈'); // 그 응답으로 '안녕 백엔드'를 보내줌
    // == res.status(200).send('안녕 백엔드');
    // 응답은 200이고, body에 '안녕 백엔드'를 넣어 보냄
});

// 회원가입
app.post('/user', async (req, res, next) => { // promise이기 때문에 async await를 붙여주고 -> try catch로 감싸주어야 함
    try {
        const hash = await bcrypt.hash(req.body.password, 12); // (원문, salt -> 높일수록 좋으나, 복잡하게 암호화하기 때문에 느려질 수 있음)

        // email 중복 방지를 위한 코드
        const exUser = await db.User.findOne({ // findOne 시 검색할 때, 조건은 반드시 where 안에 적어주어야 함
            where: {
                email: req.body.email,
            },
        })
        if (exUser) { // 이미 해당 이메일로 가입된 회원 존재 시 -> back에서 brower에 거절 코드 보내야 함
            // 400대 -> 거절
            // 400 -> 클라이언트 쪽에서 잘못된 요청을 보냈다
            // 401 -> 권한 없음
            // 403 -> 금지
            // 404 -> 페이지 없음
            // return res.status(403).send('이미 회원가입되어있습니다.'); // 애매하면 403, 401, 400

            // 여기서 return 하지 않고 그냥 res 하면 요청 한번에 두번 이상의 응답을 보낼 수 없다는 에러 뜨므로 반드시 return !
            // 응답 보낼 때는 습관적으로 return 붙여주기
            return res.status(403).json({ // -> 여기서의 에러 코드는 http에서 정한 코드대로(http status code가 있는데도 아래에서 다시 에러코드를 정의해주는 이유 
                // -> 금지는 금지인데 뭐가 금지인지 모르니까)
                errorCode: 1, // error code는 마음대로 -> front와 협의해서
                messege: '이미 회원가입되어있습니다.',
            }); 
            // 이렇게 해도 back단에서 중복을 잡아내지 못할 수도 있음 -> db단에서 걸러내야 함 -> unique: true
        }

        const newUser = await db.User.create({
            email: req.body.email, 
            // password: req.body.password, 
            password: hash, 
            nickname: req.body.nickname,
        });    
        // 200 -> 성공, 201 -> 성공적으로 생성됨 (HTTP STATUS CODE)
        return res.status(201).json(newUser); // send는 문자열로 응답할 때, 응답 body에 json으로 응답 할 겨우 .json()
    } catch(err) {
        console.log(err);
        return next(err); // next는 라우터에서 보통 err를 넘긴다고 보면 됨
        // 기본적으로 nuxt에서 알아서 에러를 처리해줌
        // 500번대 커스터마이징 해서 res 보내줘도 됨
        // -> 실무에서는 에러가 나면 안됨.
    }
});

// 로그인 -> 세션 -> hip이라는 곳에 메모리로 존재
const user = {
    // 'aaaaaaaaaa': { // 이 key를 cookie에 넣음
    //     nickname: '제로초',
    //     email: 'zerocho@naver.com',
    // },
    // 'asdfasdfsa': {
    //     nickname: '영웅',
    //     email: 'hero@naver.com',
    // },

    // serializeUser -> id만 저장하므로
    'aaaaaa': 1, // 이런식으로 저장되며, 알아서 cookie를 front에 내려보내 줌! -> cookie 이름 : connect.sid
    // cookie인 connect.sid는 req.login에서 보내줌 -> body를 통해 추가적인 데이터는 passport.authenticate() 내 return res.json() 에서 보내줌
};

app.post('/user/login', (req, res) => { // * 1. front에서 email, pwd를 가지고 post 요청을 보냄 -> req.body에 담김 
    // req.body.email;
    // req.body.password;
    // // 로그인 시 세션을 이렇게 지정해도 되지만 실무에서는 사용하지 않음 -> 보통 passport 모듈 사용함

    // /* 로그인이란? */
    // // 1. email, password 검사 -> localStrategy 안에서 이뤄짐
    // await db.User.findOne();
    // // 2. 일치 시 session에 cookie와 객체 저장 (cookie를 key로 삼아 user 정보를 저장)
    // user[cookie] = 유저정보;

    // // 3. 프론트에 쿠키 내려보내주기

    
    // // 인증 성공 시 back이 해당 user의 cookie를 보내주면 front에서는 이후부터 이 cookie를 가지고 있다가
    // // 서버로 요청 시 header에 cookie를 함께 담아 보내고, 백에서는 이것을 꺼내서 쓸 수 있음

    // // req.cookie[connect.sid] // 이 cookie가 aaaaaaaaaa면 back에서는 '아, 요청보낸 애가 제로초구나' 하고 알 수 있음

    // 직접 LocalStrategy를 실행시켜 주어야 함
    // 로그인 요청 시 LocalStrategy 실행 -> 결과가 done callback 함수로
    // * 2. req.body에 담긴 것들을 passport localStrategy에 보냄 -> passport/local.js
    passport.authenticate('local', (err, user, info) => { // * 6. callback 함수로 돌아옴 -> done(err, 성공, 실패)
        // err 존재 시
        if (err) {
            // 콘손로 찍어주고
            console.error(err);
            // err 알아서 처리하게 넘겨버림
            return next(err);
        }
        // 실패 시 -> { reason }
        if (info) {
            return res.status(401).send(info.reason); // front에서 잘못된 요청을 보냈으므로 거절
        }
        // 성공 시 -> 성공한 user -> exUser 데이터 넣어줌
        // app.use(initialize()) -> req.login, req.logout 넣어줌

        // * 7. 성공 시 req.login을 하는데, req.login이 세션에 사용자 정보를 저장하고, front에 cookie를 내려보내주는 함수이며, 
        return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser)
            // req.login 할 때, serializeUser가 실행됨
            if (err) {
                console.error(err);
                return next(err);
            }
            // front로 사용자 정보 넘겨주기
            // * 8. body에 data까지 같이 내려다 보내줌
            return res.json(user); // cookie를 header를 통해 내려주면서 body 부분에 추가적인 내용을 내려보내줄 수 있음
        }); 
    })(req, res, next);
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});