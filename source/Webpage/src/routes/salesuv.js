import express from 'express';
import {selectSql, updateSql, deleteSql} from '../database/sql';

const router = express.Router();

var m="suv0"

router.get('/', async function (req, res) {
    const suv = await selectSql.getsuv(m);
    if (req.cookies.user) {
        res.render('salesuv', {
            user: req.cookies.user,
            title: '등록된 SUV 목록',
            suv,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/salesuv');
});

router.post('/update', async (req, res) => {
    console.log('update router:', req.body.updBtn);
    const data = {
        Price: req.body.Price,
        Model: req.body.Model,
        No_seats: req.body.No_seats,
        Vin: req.body.Vin,
    }
    await updateSql.updatesuv(data);

    res.redirect('/salesuv');
});

router.post('/delete', async (req, res) => {
    console.log('delete router:', req.body.delBtn);
    const data={
        Vin:req.body.delBtn,
    };
    await deleteSql.deletesuv(data);

    res.redirect('/salesuv');
});

module.exports = router;