import express from 'express';
import {selectSql, updateSql, deleteSql} from '../database/sql';

const router = express.Router();

var m="truck0"

router.get('/', async function (req, res) {
    const truck = await selectSql.gettruck(m);
    if (req.cookies.user) {
        res.render('saletru', {
            user: req.cookies.user,
            title: '등록된 TRUCK 목록',
            truck,
    })
    } else {
        res.render('/')
    }
})

router.post('/search', async (req, res) => {
    console.log('search router:', req.body.seaBtn);
    m=req.body.Model

    res.redirect('/saletru');
});

router.post('/update', async (req, res) => {
    console.log('update router:', req.body.updBtn);
    const data = {
        Price: req.body.Price,
        Model: req.body.Model,
        Tonnage: req.body.Tonnage,
        Vin: req.body.Vin,
    }
    await updateSql.updatetruck(data);

    res.redirect('/saletru');
});

router.post('/delete', async (req, res) => {
    console.log('delete router:', req.body.delBtn);
    const data={
        Vin:req.body.delBtn,
    };
    await deleteSql.deletetruck(data);

    res.redirect('/saletru');
});

module.exports = router;