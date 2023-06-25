import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

var m="suv0"

router.get('/', async function (req, res) {
    const suv = await selectSql.getnotressuv(m);
    if (req.cookies.user) {
        res.render('custsuv', {
            user: req.cookies.user,
            title: 'SUV 목록',
            suv,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/custsuv');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const data = {
        Vin: vars.Vin,
        Ssn: vars.Ssn
    }
    await updateSql.updatesuvres(data);

    res.redirect('/custres');
});


module.exports = router;