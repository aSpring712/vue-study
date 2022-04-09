// front -> back으로 요청을 보내면 위에서부터 아래로 미들웨어를 훑으며 실행 됨

const express = require('express');

const app = express();

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
app.post('/user', (req, res) => {
    req.body.email;
    req.body.password;
    req.body.nickname;
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});