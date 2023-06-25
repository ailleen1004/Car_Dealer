import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

var m="car0"

router.get('/', async function (req, res) {
    const car = await selectSql.getnotrescar(m);
    if (req.cookies.user) {
        res.render('custcar', {
            user: req.cookies.user,
            title: 'CAR 목록',
            car,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/custcar');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const data = {
        Vin: vars.Vin,
        Ssn: vars.Ssn
    }
    await updateSql.updatecarres(data);

    res.redirect('/custres');
});

module.exports = router;