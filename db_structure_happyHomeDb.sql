-- This is to create Db
-- Create database happyHomeDb

-- No need to run this if using pgAdmin
-- \c happyHomeDb

-- Create tableUser
CREATE TABLE tabel_user (
    idUser SERIAL PRIMARY KEY,
	nama VARCHAR(255),
    rate DECIMAL(15, 2)
);

-- Create tableProyek
CREATE TABLE tabel_proyek (
    idProyek SERIAL PRIMARY KEY,
    namaProyek VARCHAR(255)
);

-- Create tableKegiatan
CREATE TABLE tabel_kegiatan (
    idKegiatan SERIAL PRIMARY KEY,
    judulKegiatan VARCHAR(255),
    tanggalMulai DATE,
    tanggalBerakhir DATE,
    waktuMulai TIME,
    waktuBerakhir TIME,
    durasi INT,
    idProyek INT,
    CONSTRAINT fk_idProyek FOREIGN KEY (idProyek) REFERENCES tabel_proyek(idProyek)
);

-- Insert user dummy
INSERT INTO tabel_user (nama, rate) VALUES(
	'Timothy Pradana',
	12000
)