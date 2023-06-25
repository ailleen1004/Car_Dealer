import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

var m="truck0"

router.get('/', async function (req, res) {
    const truck = await selectSql.getnotrestruck(m);
    if (req.cookies.user) {
        res.render('custtru', {
            user: req.cookies.user,
            title: 'TRUCK 목록',
            truck,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/custtru');
});

router.post('/', async (req, res) => {
    const vars = req.body;
    const data = {
        Vin: vars.Vin,
        Ssn: vars.Ssn
    }
    await updateSql.updatetruckres(data);

    res.redirect('/custres');
});

module.exports = router;