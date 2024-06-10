const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "happyHomeDb",
  password: "postgres",
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

// User
app.get("/api/v1/user", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tabel_user WHERE idUser = 1"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/api/v1/user/:idUser", async (req, res) => {
  try {
    const { idUser } = req.params;
    const { nama, rate } = req.body;
    console.log(
      `Updating user with id ${idUser}, nama: ${nama}, rate: ${rate}`
    );
    const result = await pool.query(
      "UPDATE tabel_user SET nama = $1, rate = $2 WHERE idUser = $3 RETURNING *",
      [nama, rate, idUser]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Proyek
app.get("/api/v1/proyek", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tabel_proyek");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/api/v1/proyek", async (req, res) => {
  try {
    const { namaProyek } = req.body;
    const result = await pool.query(
      "INSERT INTO tabel_proyek (namaProyek) VALUES ($1) RETURNING *",
      [namaProyek]
    );
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Kegiatan
app.get("/api/v1/kegiatan", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT tk.idkegiatan AS idkegiatan, tk.judulkegiatan AS judulkegiatan, tp.namaproyek AS namaproyek, tk.tanggalmulai AS tanggalmulai, tk.tanggalberakhir AS tanggalberakhir, tk.waktumulai AS waktumulai, tk.waktuberakhir AS waktuberakhir, tk.durasi AS durasi FROM tabel_kegiatan tk JOIN tabel_proyek tp ON tk.idproyek = tp.idproyek"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/api/v1/kegiatan", async (req, res) => {
  try {
    const {
      judulKegiatan,
      tMulai,
      tBerakhir,
      jMulai,
      jBerakhir,
      durasi,
      idproyek,
    } = req.body;
    const result = await pool.query(
      "INSERT INTO tabel_kegiatan (judulKegiatan, tanggalMulai, tanggalBerakhir, waktuMulai, waktuBerakhir, durasi, idproyek) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [judulKegiatan, tMulai, tBerakhir, jMulai, jBerakhir, durasi, idproyek]
    );
    res.json(result.rows[0]);
    console.log(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.put("/api/v1/kegiatan/:idKegiatan", async (req, res) => {
  try {
    const { idKegiatan } = req.params;
    const {
      judulKegiatan,
      idproyek,
      tMulai,
      tBerakhir,
      jMulai,
      jBerakhir,
      durasi,
    } = req.body;
    console.log(
      `Updating kegiatan with id ${idKegiatan}, namaKegiatan : ${judulKegiatan}, idProyek: ${idproyek}`
    );
    const result = await pool.query(
      "UPDATE tabel_kegiatan SET judulKegiatan = $1, idProyek = $2, tanggalMulai = $3, tanggalBerakhir = $4, waktuMulai = $5, waktuBerakhir = $6, durasi = $7 WHERE idKegiatan = $8 RETURNING *",
      [
        judulKegiatan,
        idproyek,
        tMulai,
        tBerakhir,
        jMulai,
        jBerakhir,
        durasi,
        idKegiatan,
      ]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.delete("/api/v1/kegiatan/:idKegiatan", async (req, res) => {
  try {
    const { idKegiatan } = req.params;
    await pool.query("DELETE FROM tabel_kegiatan WHERE idKegiatan = $1", [
      idKegiatan,
    ]);
    res.send("Item deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Happy Home server is running on port ${port}`);
});
