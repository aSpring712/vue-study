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
        const newUser = await db.User.create({
            email: req.body.email, 
            // password: req.body.password, 
            password: hash, 
            nickname: req.body.nickname,
        });    
        // 200 -> 성공, 201 -> 성공적으로 생성됨 (HTTP STATUS CODE)
        res.status(201).json(newUser); // send는 문자열로 응답할 때, 응답 body에 json으로 응답 할 겨우 .json()
    } catch(err) {
        console.log(err);
        next(err); // next는 라우터에서 보통 err를 넘긴다고 보면 됨
    }
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});