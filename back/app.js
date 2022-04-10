// front -> back으로 요청을 보내면 위에서부터 아래로 미들웨어를 훑으며 실행 됨

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const db = require('./models'); // models/index.js에서 module.exports = db; -> 그 db를 불러온 것, 그 안에 User가 있음
const app = express();


// 서버 시작 시 app.js가 시작되면서 db, sequelize.sync()까지 같이 실행되도록
db.sequelize.sync(); // db 시작

app.use(cors('http://localhost:3000')); // () 이렇게 하면 모든 요청을 다 허용하므로 실무에서는 절대 이렇게하면 안됨 -> 정확하게 허용할 프론트 주소 적어주기
// express는 body로 Json data를 받지못하므로 써주어야 함
app.use(express.json()); // 요청으로 온 json data를 parsing(해석)해서 req.body에 넣어줌
app.use(express.urlencoded({extended: false})); // form에서 action을 통해 전송할 때, 그 데이터를 해석해서 req.body에 넣어줌

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
        const exUser = await db.User.findOne({
            email: req.body.email,
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

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});