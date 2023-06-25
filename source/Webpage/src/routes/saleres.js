import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {
    const car = await selectSql.getrescar2();
    const truck = await selectSql.getrestruck2();
    const suv = await selectSql.getressuv2();
    const salecar = await selectSql.getsalecar();
    const saletruck = await selectSql.getsaletruck();    
    const salesuv = await selectSql.getsalesuv();    
    
    if (req.cookies.user) {
        res.render('saleres', {
            user: req.cookies.user,
            title1: '예약 현황',
            car,
            truck,
            suv,
            title2: '판매 완료 현황',
            salecar,
            saletruck,
            salesuv
    })
    } else {
        res.render('/')
    }
})

router.post('/succ', async (req, res) => {
    console.log('update router:', req.body.updBtn);
    const data = {
        Sid: req.body.Sid,
        Vin: req.body.Vin,
        Model: req.body.Model,
    }
    await updateSql.carsalesucc(data);
    await updateSql.trucksalesucc(data);
    await updateSql.suvsalesucc(data);

    res.redirect('/saleres');
});

router.post('/fail', async (req, res) => {
    console.log('update router:', req.body.updBtn);
    const data = {
        Vin: req.body.Vin,
        Model: req.body.Model,
    }
    await updateSql.cancelcarres(data);
    await updateSql.canceltruckres(data);
    await updateSql.cancelsuvres(data);

    res.redirect('/saleres');
});

module.exports = router;