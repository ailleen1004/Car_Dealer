import express from 'express';
import {selectSql, updateSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {
    const car = await selectSql.getmycar();
    const truck = await selectSql.getmytruck();
    const suv = await selectSql.getmysuv();    
    if (req.cookies.user) {
        res.render('custveh', {
            user: req.cookies.user,
            title: 'My Vehicle',
            car,
            truck,
            suv,
    })
    } else {
        res.render('/')
    }
})

module.exports = router;