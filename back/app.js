const express = require('express');

const app = express();

// / -> localhost:3085/ -> 'main page를 가져온다'는 의미
app.get('/', (req, res) => {
    res.send('안녕 백엔드'); // 그 응답으로 '안녕 백엔드'를 보내줌
    // == res.status(200).send('안녕 백엔드');
    // 응답은 200이고, body에 '안녕 백엔드'를 넣어 보냄
});

app.listen(3085, () => {
    console.log(`백엔드 서버 ${3085}번 포트에서 작동중.`);
});