import { IoMdAddCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

import ItemData from "./ItemData";
import SortIcon from "./SortIcon";
import FilterProject from "./FilterProject";
import TambahKegiatan from "./TambahKegiatan";
import DeleteKegiatanModal from "../Modal/ModalSubmitSuccess";

const DaftarKegiatan = () => {
  // Fetch User
  const [nama, setNama] = useState("");
  const [rate, setRate] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user");
      // console.log(res.data);
      setNama(res.data[0].nama);

      const tempRate = Math.round(parseFloat(res.data[0].rate));
      setRate(formatNumber(tempRate.toString()));
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  const formatNumber = (value) => {
    if (!value) return value;
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };

  // Fetch Data
  const [datas, setDatas] = useState([]);
  const [totalBiaya, setTotalBiaya] = useState(null);
  const [totalDurasi, setTotalDurasi] = useState(null);
  useEffect(() => {
    fetchData();
  }, [datas]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/kegiatan");
      setDatas(res.data);
      setFilteredData(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
  };

  // New useEffect for calculating totalBiaya
  useEffect(() => {
    const currRate = parseFloat(rate.replace(".", "")) / 60;
    let newTotalBiaya = 0;

    datas.forEach((data) => {
      if (data.durasi > 480) {
        const tempBiayaOvertime = (data.durasi - 480) * currRate * 0.3;
        const tempBiayaNormal = 480 * currRate;
        newTotalBiaya += tempBiayaNormal + tempBiayaOvertime;
      } else {
        const tempBiayaNormal = 480 * currRate;
        newTotalBiaya += tempBiayaNormal;
      }
    });

    let tempDurasi = 0;
    datas.forEach((data) => {
      tempDurasi += data.durasi;
    });

    if (tempDurasi % 60 === 0) {
      setTotalDurasi(`${tempDurasi / 60} Jam`);
    } else {
      setTotalDurasi(
        `${Math.floor(tempDurasi / 60)} Jam ${tempDurasi % 60} Menit`
      );
    }

    setTotalBiaya(newTotalBiaya);
  }, [datas, rate]);

  // Fetch Project
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetchProjects();
  }, [projects]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/proyek");
      setProjects(res.data);
    } catch (error) {
      console.log(`Error fetching project: ${error.message}`);
    }
  };

  // Search data
  const [searchList, setSearchList] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterApplied, setFilteredApplied] = useState(0);

  useEffect(() => {
    filterAndSearchData();
  }, [searchList, datas, filterApplied]);

  const filterAndSearchData = () => {
    console.log("Datas before filtering:", datas);
    console.log("Filter applied:", filterApplied);
    console.log("Search list:", searchList);

    let tempData = datas;

    if (filterApplied.length > 0) {
      tempData = tempData.filter((data) =>
        filterApplied.includes(data.namaProyek)
      );
    }

    if (searchList) {
      tempData = tempData.filter((data) =>
        data.judulkegiatan.toLowerCase().includes(searchList.toLowerCase())
      );
    }
    setFilteredData(tempData);
  };

  // Filter
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilter = (selectedProject) => {
    setFilteredApplied(selectedProject.length);
    const filtered = filteredData.filter((data) =>
      selectedProject.includes(data.namaproyek)
    );
    setFilteredData(filtered);
    handleCloseFilterModal();
  };

  const [currentActivity, setCurrentActivity] = useState([]);
  const [mode, setMode] = useState({ action: "add", key: Date.now() });

  // Modal Config
  const [deleteKegiatanModal, setDeleteKegiatanModal] = useState(false);

  // Add kegiatan
  const [isAddKegiatanOpen, setIsAddKegiatanOpen] = useState(false);
  const handleOpenAddKegiatan = () => {
    setMode({ action: "add", key: Date.now() });
    setCurrentActivity(null);
    setIsAddKegiatanOpen(true);
  };

  const handleCloseAddKegiatan = () => {
    setIsAddKegiatanOpen(false);
  };

  // Edit Kegiatan
  const handleOpenEditKegiatan = (data) => {
    setMode({ action: "edit", key: Date.now() });
    setCurrentActivity(data);
    setIsAddKegiatanOpen(true);
  };

  // Delete Kegiatan
  const deleteKegiatan = async (idKegiatan) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/kegiatan/${idKegiatan}`);
      setDatas(datas.filter((data) => data.idKegiatan !== idKegiatan));
    } catch (error) {
      console.log(`Error deleting kegiatan: ${error.message}`);
    }
  };
  const handleDeleteKegiatan = (data) => {
    setDeleteKegiatanModal(true);
    setTimeout(() => {
      deleteKegiatan(data.idkegiatan);
      setDeleteKegiatanModal(false);
    }, 2000);
  };

  // Sort table data
  const [sortDatas, setSortDatas] = useState({ key: null, direction: null });

  const handleSortData = (key) => {
    // Default ascending
    let direction = "ascending";
    if (sortDatas.key === key && sortDatas.direction === "ascending") {
      direction = "descending";
    }
    setSortDatas({ key, direction });
    sortArrayDatas(key, sortDatas.direction);
  };

  const sortArrayDatas = (key, direction) => {
    // Copy array then sort by key according to direction
    // If a filter is applied
    const sortedDatas = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedDatas);
  };

  return (
    <>
      <div className="min-h-max p-3 mx-auto flex flex-col">
        <div className="bg-white shadow rounded-t-xl p-3 mb-1 flex-none">
          <div className="flex my-1 ml-5 py-2">
            <div className="flex flex-col justify-between items-start">
              <h2 className="text-sm text-slate-500">Nama Karyawan</h2>
              <p className="text-md font-bold">{nama}</p>
            </div>
            <div className="flex flex-col justify-between items-start ml-8">
              <h2 className="text-sm text-slate-500">Rate</h2>
              <p className="text-md font-semibold">Rp. {rate} /Jam</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-b-xl p-8 grow min-h-max">
          <div className="flex justify-between">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold">Daftar Kegiatan</h3>
              <button
                onClick={handleOpenAddKegiatan}
                className="bg-[#F0F6FF] text-[#2775EC] font-bold ml-4 px-4 py-2 rounded-xl tracking-tighter"
              >
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
                  onChange={(event) => setSearchList(event.target.value)}
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
                    {filterApplied > 0 ? (
                      <span className="absolute bg-[#2775EC] border-2 border-white rounded-full w-3 h-3 -top-2.5 right-1 m-1 mt-5" />
                    ) : null}
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
                        <button onClick={() => handleSortData("judulkegiatan")}>
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
                        <button onClick={() => handleSortData("namaproyek")}>
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
                        <button onClick={() => handleSortData("tanggalmulai")}>
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
                          onClick={() => handleSortData("tanggalberakhir")}
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
                        <button onClick={() => handleSortData("waktumulai")}>
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
                        <button onClick={() => handleSortData("waktuberakhir")}>
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
                    filteredData.map((data) => (
                      <ItemData
                        index={data.idkegiatan}
                        data={data}
                        onEdit={handleOpenEditKegiatan}
                        onDelete={handleDeleteKegiatan}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col justify-between p-4 mt-4 bg-[#F7F8FB]">
              <div className="flex justify-between text-[#2775EC] font-semibold text-md tracking-tighter">
                <p>Total Durasi: </p>
                <p>{totalDurasi ? totalDurasi : "-"}</p>
              </div>
              <div className="flex justify-between text-[#2775EC] font-bold text-lg tracking-tighter mt-1">
                <p>Total Pendatapatan:</p>
                <p>
                  {totalBiaya
                    ? `Rp. ${formatNumber(totalBiaya.toString())}`
                    : "-"}
                </p>
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

      <TambahKegiatan
        isOpen={isAddKegiatanOpen}
        onClose={handleCloseAddKegiatan}
        projectsList={projects}
        currentActivity={currentActivity}
        mode={mode}
      />

      {/* If Success -> Show modal */}
      <DeleteKegiatanModal
        show={deleteKegiatanModal}
        onClose={() => setDeleteKegiatanModal(false)}
        message="Berhasil menghapus kegiatan!"
      />
    </>
  );
};

export default DaftarKegiatan;
