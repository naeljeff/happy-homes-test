const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'happyHomeDb',
    password: 'postgres',
    port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// User
app.get('/user', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tabel_user WHERE idUser = 1');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.put('/user/:idUser', async (req, res) => {
    try {
        const { idUser } = req.params;
        const { nama, rate } = req.body;
        console.log(`Updating user with id ${idUser}, nama: ${nama}, rate: ${rate}`);
        const result = await pool.query(
            'UPDATE tabel_user SET nama = $1, rate = $2 WHERE idUser = $3 RETURNING *',
            [nama, rate, idUser]
        );
        res.json(result.rows[0]);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});