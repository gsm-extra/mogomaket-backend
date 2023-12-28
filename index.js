
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const crypto = require('crypto');
const FileStore = require('session-file-store')(session); // 세션을 파일에 저장
const cookieParser = require('cookie-parser');;

const app = express(); // 이 부분을 앞으로 이동


app.use(express.static(__dirname + '/src'));

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7503',
    database: 'mogoDB'                                                                      // 테이블 확인 하기
});

app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret: 'blackzat', // 데이터를 암호화 하기 위해 필요한 옵션
    resave: true, // 요청이 왔을때 세션을 수정하지 않더라도 다시 저장소에 저장되도록
    saveUninitialized: true, // 세션이 필요하면 세션을 실행시칸다(서버에 부담을 줄이기 위해)
}));

// MySQL 연결
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL 연결됨..');
});



// 회원가입
app.get('/extra-membergaib',(req,res)=>{
    res.sendFile(__dirname + '/src/extra-membergaib.html');
    console.log('회원가입 페이지');
});

app.post('/extra-membergaib',(req,res)=>{
    console.log('회원가입 하는중')
    const { nickname, name, password } = req.body;   //name
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');


    db.query('select * from members where nickname=?',[nickname],(err,data)=>{
        
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (data.length <= 0) {
            console.log('회원가입 성공');
            db.query('insert into members(nickname, name, password) values(?,?,?)', [
                nickname, name,hashedPassword
            ]);
            db.query('commit');
            res.redirect('login');
        } else {
            console.log('회원가입 실패');
            res.send('<script>alert("회원가입 실패");location.href="/extra-membergaib";</script>');
        }
       
    });
});
// 로그인
app.get('/login',(req,res)=>{
    console.log('로그인 작동');
    res.sendFile(__dirname + '/src/index.html');
});

app.post('/login',(req,res)=>{
    const { nickname, password } = req.body;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    console.log('로그인 하는중')

    db.query('SELECT * FROM members WHERE nickname = ? AND password = ?', [nickname,hashedPassword], (err, results) => {
        if (err) {
            console.error('MySQL query error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
    
        if (results.length > 0) {
            console.log('로그인 됨')
            req.session.user = results[0];
            res.redirect('home');

        } else {

            console.log('로그인 실패')
            res.send('<script>alert("로그인 실패");location.href="/login";</script>');
        }
      });   
    
});
// 로그아웃
app.get('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy();
    res.sendFile(__dirname + '/srcs/index.html');
    res.redirect('login');
  });
  
//홈
app.get('/home',(req,res)=>{
    console.log('홈');
    res.sendFile(__dirname + '/src/extra-home.html');
});


// 서버 시작
const port = 3000;
app.listen(port, () => {
    console.log(`start server ${port}`);
});