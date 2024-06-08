import { IoMdAddCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

import ItemData from "./ItemData";
import SortIcon from "./SortIcon";
import FilterProject from "./FilterProject";

const DaftarKegiatan = () => {
  // Add logic to fetch data from database
  const [datas, setDatas] = useState([
    {
      judul: "wireframing untuk fitur/flow bidding",
      namaProyek: "UI Desain",
      tanggalMulai: "1 Okt 2023",
      tanggalBerakhir: "1 Okt 2023",
      waktuMulai: "08:00",
      waktuBerakhir: "16:00",
      durasi: "8 Jam",
    },
    {
      judul: "Pembuatan desain sistem",
      namaProyek: "Dokumentasi",
      tanggalMulai: "2 Okt 2023",
      tanggalBerakhir: "2 Okt 2023",
      waktuMulai: "08:50",
      waktuBerakhir: "17:30",
      durasi: "8 Jam 40 menit",
    },
    {
      judul: "desain mockup untuk fitur/flow bidding",
      namaProyek: "UI Desain",
      tanggalMulai: "3 Okt 2023",
      tanggalBerakhir: "4 Okt 2023",
      waktuMulai: "10:30",
      waktuBerakhir: "15:00",
      durasi: "4 Jam 30 menit",
    },
  ]);

  // DUMMY
  const [projects] = useState(["UI Desain", "Desain Logo"]);
  const [filteredProject, setFilteredProject] = useState(datas);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterApplied, setFilteredApplied] = useState(0);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilter = (selectedProject) => {
    setFilteredApplied(selectedProject.length);
    const filtered = datas.filter((data) =>
      selectedProject.includes(data.namaProyek)
    );
    setFilteredProject(filtered);
    console.log(filteredProject);
    handleCloseFilterModal();
  };

  // Search data
  const [searchList, setSearchList] = useState("");
  const [filteredData, setFilteredData] = useState(datas);
  const handleSearchInput = (event) => {
    setSearchList(event.target.value);
  };

  useEffect(() => {
    setFilteredData(
      datas.filter((data) =>
        data.judul.toLowerCase().includes(searchList.toLowerCase())
      )
    );
  }, [searchList, datas]);

  // Sort table data
  const [sortDatas, setSortDatas] = useState({ key: null, direction: null });

  const handleSortData = (key) => {
    // Default ascending
    let direction = "ascending";
    if (sortDatas.key === key && sortDatas.direction === "ascending") {
      direction = "descending";
    }
    setSortDatas({ key, direction });
    sortArrayDatas(key, direction);
  };

  const sortArrayDatas = (key, direction) => {
    // Copy array then sort by key according to direction
    const sortedDatas = [...datas].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setDatas(sortedDatas);
  };

  return (
    <>
      <div className="min-h-max p-3 mx-auto flex flex-col">
        <div className="bg-white shadow rounded-t-xl p-3 mb-1 flex-none">
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

        <div className="bg-white shadow rounded-b-xl p-8 grow min-h-max">
          <div className="flex justify-between">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Daftar Kegiatan</h3>
              <button className="bg-[#F0F6FF] text-[#2775EC] font-bold ml-4 px-4 py-2 rounded-xl tracking-tighter">
                <div className="flex">
                  <IoMdAddCircleOutline className="mt-1 mr-1" />
                  Tambah Kegiatan
                </div>
              </button>
            </div>

            {/* Search box */}
            <div className="flex mb-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm focus:outline-none focus-within:border-[#F15858] focus-within:ring-1 focus-within:ring-[#F15858] mr-3">
                <div className="flex items-center pl-3">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  onChange={handleSearchInput}
                  type="text"
                  value={searchList}
                  className="w-100 pl-4 py-3 px-10 text-slate-700 bg-white rounded-md outline-none focus:ring-0 placeholder:italic"
                  placeholder="Cari"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <div>
                  <button
                    onClick={handleOpenFilter}
                    className="relative flex items-center p-3"
                  >
                    <IoFilterSharp size={24} className={`text-[#F15858]`} />
                    {filterApplied > 0 ?  <span className="absolute bg-[#2775EC] border-2 border-white rounded-full w-3 h-3 -top-2.5 right-1 m-1 mt-5" /> : null}
                    
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-full relative overflow-hidden shadow bg-white rounded-lg border border-gray-300">
            <div className="max-h-96 overflow-auto -mb-4">
              <table className="w-full text-md text-left text-slate-900 table-fixed">
                <thead className="sticky top-0 bg-white">
                  <tr>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="10"
                    >
                      <div className="flex items-center">
                        Judul Kegiatan
                        <button onClick={() => handleSortData("judul")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="4"
                    >
                      <div className="flex items-center">
                        Nama Proyek
                        <button onClick={() => handleSortData("namaProyek")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="4"
                    >
                      <div className="flex items-center">
                        Tanggal Mulai
                        <button onClick={() => handleSortData("tanggalMulai")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="4"
                    >
                      <div className="flex items-center">
                        Tanggal Berakhir
                        <button
                          onClick={() => handleSortData("tanggalBerakhir")}
                        >
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="4"
                    >
                      <div className="flex items-center">
                        Waktu Mulai
                        <button onClick={() => handleSortData("waktuMulai")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="4"
                    >
                      <div className="flex items-center">
                        Waktu Berakhir
                        <button onClick={() => handleSortData("waktuBerakhir")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left border-r"
                      colSpan="3"
                    >
                      <div className="flex items-center">
                        Durasi
                        <button onClick={() => handleSortData("durasi")}>
                          <SortIcon />
                        </button>
                      </div>
                    </th>
                    <th
                      className="py-2 px-4 border-b border-gray-200 text-left"
                      colSpan="2"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* If data is empty */}
                  {datas.length === 0 ? (
                    <tr>
                      <td
                        className="text-center py-4 font-semibold"
                        colSpan="35"
                      >
                        Belum ada kegiatan
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((data, index) => (
                      <ItemData index={index} data={data} />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between p-4 mt-4 bg-[#F7F8FB]">
              <div className="flex justify-between text-[#2775EC] font-semibold text-md tracking-tighter">
                <p>Total Durasi: </p>
                <p>8 Jam 50 Menit</p>
              </div>
              <div className="flex justify-between text-[#2775EC] font-bold text-lg tracking-tighter mt-1">
                <p>Total Pendatapatan:</p>
                <p>Rp 153.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterProject
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        projects={projects}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
};

export default DaftarKegiatan;
