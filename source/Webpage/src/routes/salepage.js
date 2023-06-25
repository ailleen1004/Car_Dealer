import express from 'express';
import {selectSql} from '../database/sql';

const router = express.Router();

router.get('/', async function (req, res) {
    if (req.cookies.user) {
        res.render('salepage', {
            user: req.cookies.user,
    })
    } else {
        res.render('/')
    }
})

module.exports = router;