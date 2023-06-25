import express from 'express';
import {selectSql, updateSql, deleteSql} from '../database/sql';

const router = express.Router();

var m="car0"

router.get('/', async function (req, res) {
    const car = await selectSql.getcar(m);
    if (req.cookies.user) {
        res.render('salecar', {
            user: req.cookies.user,
            title: '등록된 CAR 목록',
            car,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/salecar');
});


router.post('/update', async (req, res) => {
    console.log('update router:', req.body.updBtn);
    const data = {
        Price: req.body.Price,
        Model: req.body.Model,
        Engine_size: req.body.Engine_size,
        Vin: req.body.Vin,
    }
    await updateSql.updatecar(data);

    res.redirect('/salecar');
});

router.post('/delete', async (req, res) => {
    console.log('delete router:', req.body.delBtn);
    const data={
        Vin:req.body.delBtn,
    };
    await deleteSql.deletecar(data);

    res.redirect('/salecar');
});

module.exports = router;
