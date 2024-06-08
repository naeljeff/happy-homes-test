const DaftarKegiatan = () => {
  return <>
  <div className="container p-4 -mt-5 mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between mb-4">
          <div>
            <p>Nama Karyawan: <strong>Timothy Pradana</strong></p>
            <p>Rate: <strong>Rp12.000/jam</strong></p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <h3 className="text-xl font-semibold">Daftar Kegiatan</h3>
          <button className="bg-[#F0F6FF] text-[#2775EC] font-bold px-4 py-2 rounded-lg">Tambah Kegiatan</button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Judul Kegiatan</th>
              <th className="py-2">Nama Proyek</th>
              <th className="py-2">Tanggal Mulai</th>
              <th className="py-2">Tanggal Berakhir</th>
              <th className="py-2">Waktu Mulai</th>
              <th className="py-2">Waktu Berakhir</th>
              <th className="py-2">Durasi</th>
              <th className="py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center py-4" colSpan="8">Belum ada kegiatan</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-col justify-between mt-4">
          <p>Total Durasi: -</p>
          <p>Total Pendapatan: -</p>
        </div>
      </div>
    </div>
  </>
};

export default DaftarKegiatan;
