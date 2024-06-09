import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import { IoMdArrowDropdown } from "react-icons/io";

import TambahProject from "./TambahProject";

const TambahKegiatan = ({ isOpen, onClose, projectsList }) => {
  const defaultNowDate = dayjs();
  const defaultTomorrowDate = dayjs().add(1, "day");
  const defaultNowTime = dayjs().set("hour", 9).startOf("hour");
  const defaultTomorrowTime = dayjs().set("hour", 17).startOf("hour");

  const [tanggalMulai, setTanggalMulai] = useState(defaultNowDate);
  const [tanggalBerakhir, setTanggalBerakhir] = useState(defaultTomorrowDate);
  const [jamMulai, setJamMulai] = useState(defaultNowTime);
  const [jamBerakhir, setJamBerakhir] = useState(defaultTomorrowTime);
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleTambahKegiatan = () => {

    if (!tanggalMulai.valueOf()) alert("Tanggal mulai tidak boleh kosong");
    else if (!tanggalBerakhir.valueOf())
      alert("Tanggal berakhir tidak boleh kosong");
    else if (!jamMulai.valueOf()) alert("Jam mulai tidak boleh kosong");
    else if (!jamBerakhir.valueOf()) alert("Jam berakhir tidak boleh kosong");
    else if (!judulKegiatan) alert("Judul kegiatan tidak boleh kosong");
    else if (!selectedProject) alert("Project tidak boleh kosong");
    else {
      const tMulai = tanggalMulai.format("MM/DD/YYYY");
      const tBerakhir = tanggalBerakhir.format("MM/DD/YYYY");
      const jMulai = jamMulai.format("hh:mm");
      const jBerakhir = jamBerakhir.format("hh:mm");

      const data = {
        tanggalMulai: tMulai,
        tanggalBerakhir: tBerakhir,
        waktuMulai: jMulai,
        waktuBerakhir: jBerakhir,
        judul: judulKegiatan,
        namaProyek: selectedProject,
      };
      console.log(data);
      onClose(true);
      setTanggalMulai(defaultNowDate);
      setTanggalBerakhir(defaultNowDate);
      setJamMulai(defaultNowTime);
      setJamBerakhir(defaultTomorrowTime);
      setJudulKegiatan("");
      setSelectedProject("");
      setDropdownState(!dropdownState);
    }
  };

  const handleCloseAddKegiatan = () => {
    setTanggalMulai(defaultNowDate);
    setTanggalBerakhir(defaultNowDate);
    setJamMulai(defaultNowTime);
    setJamBerakhir(defaultTomorrowTime);
    setJudulKegiatan("");
    setSelectedProject("");
    onClose(true);
    setDropdownState(!dropdownState);
  };

  const [dropdownState, setDropdownState] = useState(false);
  const handleDropdownState = () => {
    setDropdownState(!dropdownState);
  };

  const handleSelectedProject = (project) => {
    setSelectedProject(project);
    setDropdownState(!dropdownState);
  };

  // Add Project
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const handleCloseAddProject = () => {
    setIsAddProjectOpen(false);
  };

  const handleOpenAddProject = () => {
    setIsAddProjectOpen(true);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">
          <div className="flex justify-between items-center mb-4 -mt-2">
            <h1 className="text-xl font-bold">Tambah Kegiatan Baru</h1>
            <button
              onClick={handleCloseAddKegiatan}
              className="text-3xl text-gray-600 hover:text-[#F15858]"
            >
              &times;
            </button>
          </div>
          <div class="border-t border-gray-200 min-w-full -mx-8 mb-5"></div>

          <div className="flex justify-evenly">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block mb-1">
                  Tanggal Mulai <span class="text-[#F15858]">*</span>
                </label>
                <DatePicker
                  slotProps={{
                    textField: { size: "medium", color: "error" },
                  }}
                  onChange={(newValue) => {
                    setTanggalMulai(newValue);
                    if (
                      newValue.isAfter(tanggalBerakhir) ||
                      newValue.isSame(tanggalBerakhir, "day")
                    ) {
                      setTanggalBerakhir(newValue.add(1, "day"));
                    }
                  }}
                  defaultValue={defaultNowDate}
                  minDate={defaultNowDate}
                  value={tanggalMulai}
                />
              </div>
              <div>
                <label className="block mb-1">
                  Tanggal Berakhir <span class="text-[#F15858]">*</span>
                </label>
                <DatePicker
                  slotProps={{
                    textField: { size: "medium", color: "error" },
                  }}
                  onChange={(newValue) => setTanggalBerakhir(newValue)}
                  defaultValue={defaultTomorrowDate}
                  minDate={tanggalMulai.add(1, "day")}
                  value={tanggalBerakhir}
                />
              </div>
              <div>
                <label className="block mb-1">
                  Jam Mulai <span class="text-[#F15858]">*</span>
                </label>
                <TimePicker
                  ampm={false}
                  slotProps={{
                    textField: { size: "medium", color: "error" },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  defaultValue={defaultNowTime}
                  value={jamMulai}
                  onChange={(newValue) => setJamMulai(newValue)}
                />
              </div>
              <div>
                <label className="block mb-1">
                  Jam Berakhir <span class="text-[#F15858]">*</span>
                </label>
                <TimePicker
                  ampm={false}
                  slotProps={{
                    textField: { size: "medium", color: "error" },
                  }}
                  viewRenderers={{
                    hours: renderTimeViewClock,
                    minutes: renderTimeViewClock,
                    seconds: renderTimeViewClock,
                  }}
                  defaultValue={defaultTomorrowTime}
                  value={jamBerakhir}
                  onChange={(newValue) => setJamBerakhir(newValue)}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Judul Kegiatan <span class="text-[#F15858]">*</span>
            </label>
            <input
              type="text"
              value={judulKegiatan}
              onChange={(event) => setJudulKegiatan(event.target.value)}
              className="w-full border rounded-lg p-3 text-gray-700 leading-tight focus:outline-none focus:border-[#F15858] focus:ring-1 focus:ring-[#F15858]"
              placeholder="Judul Kegiatan"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Nama Proyek <span class="text-[#F15858]">*</span>
            </label>

            <div className="relative">
              <div className="flex items-center border rounded-lg p-2">
                <div className="flex flex-wrap gap-2">
                  {selectedProject !== "" ? (
                    <span
                      key={selectedProject}
                      className="flex items-center bg-white text-gray-700 font-semibold tracking-tighter p-1 pr-3 rounded-full ml-2"
                    >
                      {selectedProject}
                    </span>
                  ) : (
                    <span className="text-gray-500 pl-2">Pilih Proyek</span>
                  )}
                </div>
                <button
                  onClick={handleDropdownState}
                  type="button"
                  className="ml-auto text-gray-600"
                >
                  <IoMdArrowDropdown className="text-xl hover:text-[#F15858]" />
                </button>
              </div>

              {dropdownState && (
                <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
                  <div
                    onClick={handleOpenAddProject}
                    className="cursor-pointer px-4 py-2 text-[#F15858] font-bold hover:bg-gray-200 rounded"
                  >
                    + Tambah Proyek
                  </div>
                  {projectsList.map((project) => (
                    <div
                      onClick={() => handleSelectedProject(project)}
                      key={project}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded"
                    >
                      {project}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div class="border-t border-gray-200 mb-3 min-w-full -mx-8 my-4"></div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseAddKegiatan}
              className="bg-white text-[#F15858] font-bold py-2 px-4 mr-2 rounded-lg hover:underline hover:underline-offset-4"
            >
              Kembali
            </button>
            <button
              onClick={handleTambahKegiatan}
              className="bg-[#F15858] text-white font-bold py-2 px-4 rounded-lg hover:underline hover:underline-offset-4"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <TambahProject
        isOpen={isAddProjectOpen}
        onClose={handleCloseAddProject}
      />
      ;
    </>
  );
};

export default TambahKegiatan;
