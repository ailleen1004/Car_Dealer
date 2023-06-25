import cookieParser from "cookie-parser";
import express from "express";
import expressSession from 'express-session';
import { selectSql } from "../database/sql";

const router = express.Router();

// 쿠키 및 세션 설정
router.use(cookieParser());
router.use(expressSession({
    secret: 'fin',
    resave: true,
    saveUninitialized: true,
}))

router.get('/', (req, res) => {
    if (req.cookies.user) {
        res.render('main', { 'user': req.cookies.user });
    } else {
        res.render('login');
    }
});

router.get('/logout', (req, res) => {
    if (req.cookies.user) {
        res.clearCookie('user')
        res.redirect("/");
    } else {
        res.redirect("/");
    }
})

router.post('/', async (req, res) => {
    const vars = req.body;
    const users = await selectSql.getusers();
    let whoAmI = '';
    let Me = '';
    let checkLogin = false;

    users.map((user)=>{
        console.log(user.Id);
        if(vars.id===user.Id&&vars.password===user.Password){
            console.log('login success!');
            checkLogin=true;
            if(vars.id[0]==='c'){ //user.Id 첫 글자 c -> cust -> 사용자 아이디
                whoAmI='cust';
                Me = user.Id;
            }
            else{
                whoAmI='sale'; // salesperson
                Me = user.Id;
            }
        }
    })
    const k=vars.id;
    module.exports={
        k
    };
    
    if(checkLogin&&whoAmI==='cust'){
        res.cookie('user', Me, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/custpage');
    }
    else if(checkLogin&&whoAmI==='sale'){
        res.cookie('user', Me, {
            expires: new Date(Date.now() + 3600000), // ms 단위 (3600000: 1시간 유효)
            httpOnly: true
        })
        res.redirect('/salepage');
    }
    else{
        console.log('login failed!');
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>")
    }
})

module.exports = router;