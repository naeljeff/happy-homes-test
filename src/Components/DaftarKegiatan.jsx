const DaftarKegiatan = () => {
  return (
    <>
      <div className="p-3 mx-auto">
        <div className="bg-white shadow rounded-t-xl p-3 mb-1">
          <div className="flex my-1 ml-5 py-2">
            <div className="flex flex-col justify-between items-start">
              <h2 className="text-sm text-slate-500">Nama Karyawan</h2>
              <p className="text-md font-bold">Timothy Pradana</p>
            </div>
            <div className="flex flex-col justify-between items-start ml-8">
              <h2 className="text-sm text-slate-500">Rate</h2>
              <p className="text-md font-semibold">Rp 12.000/Jam</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-b-xl p-8">
          <div className="flex justify-between">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Daftar Kegiatan</h3>
              <button className="bg-[#F0F6FF] text-[#2775EC] font-bold px-4 py-2 rounded-xl tracking-tighter">
                Tambah Kegiatan
              </button>
            </div>
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Daftar Kegiatan</h3>
              <button className="bg-[#F0F6FF] text-[#2775EC] font-bold px-4 py-2 rounded-lg">
                Tambah Kegiatan
              </button>
            </div>
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
                <td className="text-center py-4" colSpan="8">
                  Belum ada kegiatan
                </td>
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
  );
};

export default DaftarKegiatan;
