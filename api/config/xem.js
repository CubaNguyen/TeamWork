require('dotenv').config();
const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 5000;

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

app.get('/test-db', async (req, res) => {
    console.log('Đang xử lý request /test-db...');
    try {
        console.log('Đang kết nối MS SQL...');
        let pool = await sql.connect(dbConfig);
        console.log('Kết nối thành công, đang query...');
        let result = await pool.request().query('SELECT * FROM dbo.Users');
        console.log('Query hoàn tất, dữ liệu:', result.recordset);
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi xảy ra:', err.message);
        res.status(500).send(err.message);
    }
});

app.listen(port, () => {
    console.log(Server running on port ${port});
});