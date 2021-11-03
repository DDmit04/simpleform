const {addNewRecord, openDbConnect} = require('./repo.js')
const express = require('express');
const path = require('path');
require('dotenv').config()

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.post('/', (req, res, next) => {
    let body = req.body
    let record = {
        name: body.name,
        secName: body.secName,
        pathr: body.pathr,
        birth: body.birth,
        group: body.grp,
        rank: body.rank,
        specRank: body.specRank
    }
    if (isNotEmpty(record.name) && isNotEmpty(record.secName) && isNotEmpty(record.pathr)
        && isDate(record.birth) && isNotEmpty(record.group) && isInt(record.rank) && isNotEmpty(record.specRank)) {
        addNewRecord(record)
    } else {
        console.log('bad request!', record)
    }
    res.redirect('/')
});
app.listen(port, host, () => {
    openDbConnect()
    console.log('started')
})

function isNotEmpty(str) {
    return str.trim() != ''
}

function isDate(str) {
    return /(?:((?:0[1-9]|1[0-9]|2[0-9])\/(?:0[1-9]|1[0-2])|(?:30)\/(?!02)(?:0[1-9]|1[0-2])|31\/(?:0[13578]|1[02]))\/(?:19|20)[0-9]{2})/.test(str)
}

function isInt(str) {
    return /^\+?(0|[1-9]\d*)$/.test(str);
}
