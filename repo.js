require('dotenv').config()

const mysql = require('mysql');
let connection = null

function openDbConnect() {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    connection.connect();
}

function addNewRecord(record) {
    connection.query(`INSERT INTO ${process.env.DB_TABLE_NAME} values ('${record.name}', '${record.secName}', '${record.pathr}', STR_TO_DATE('${record.birth}', "%d/%m/%Y" ), '${record.group}', '${record.rank}', '${record.specRank}')`, (error, results, fields) => {
        if (error) {
            throw error;
        } else {
            console.log('Saved', results)
        }
    });
}

function closeDbConnect() {
    connection.end();
}

module.exports = {
    openDbConnect,
    closeDbConnect,
    addNewRecord
}