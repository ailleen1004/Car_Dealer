import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {
    const car = await selectSql.getrescar();
    const truck = await selectSql.getrestruck();
    const suv = await selectSql.getressuv();    
    if (req.cookies.user) {
        res.render('custres', {
            user: req.cookies.user,
            title: '예약 조회/취소',
            car,
            truck,
            suv,
    })
    } else {
        res.render('/')
    }
})

router.post('/', async (req, res) => {
    const vars = req.body;
    const data = {
        Vin: vars.Vin,
        Model: vars.Model
    }
    await updateSql.cancelcarres(data);
    await updateSql.canceltruckres(data);
    await updateSql.cancelsuvres(data);

    res.redirect('/custres');
});

module.exports = router;