import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";

import TambahProject from "./TambahProject";

const TambahKegiatan = ({ isOpen, onClose, projectsList }) => {
  const [tanggalMulai, setTanggalMulai] = useState(dayjs(''));
  const [tanggalBerakhir, setTanggalBerakhir] = useState(dayjs(''));
  const [jamMulai, setJamMulai] = useState(dayjs("2024-06-08T07:30"));
  const [jamBerakhir, setJamBerakhir] = useState(dayjs("2024-06-08T15:30"));
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const handleTambahKegiatan = () => {
    console.log({
      tanggalMulai,
      tanggalBerakhir,
      jamMulai,
      jamBerakhir,
      judulKegiatan,
      selectedProject,
    });
  };

  const handleCloseAddKegiatan = () => {
    // setProject("");
    onClose(true);
  };

  // Add Project
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

  const handleCloseAddProject = () => {
    setIsAddProjectOpen(false);
  };

  const handlePilihProyek = (event) => {
    const value = event.target.value;
    if (value === "addProject") {
      setSelectedProject(value);
      setIsAddProjectOpen(true);
      <TambahProject
        isOpen={isAddProjectOpen}
        onClose={handleCloseAddProject}
      />;
    } else {
      setSelectedProject(value);
    }
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
          <div class="border-t border-gray-200 mb-3 min-w-full -mx-8"></div>

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
                  value={tanggalMulai}
                  onChange={(newValue) => setTanggalMulai(newValue)}
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
                  value={tanggalBerakhir}
                  onChange={(newValue) => setTanggalBerakhir(newValue)}
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
              className="w-full border rounded-lg px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-[#F15858] focus:ring-1 focus:ring-[#F15858]"
              placeholder="Judul Kegiatan"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">
              Nama Proyek <span class="text-[#F15858]">*</span>
            </label>
            <select
              value={selectedProject}
              onChange={handlePilihProyek}
              className="w-full border rounded-lg px-3 py-2 text-gray-700 focus-within:border-[#F15858] focus-within:ring-1 focus-within:ring-[#F15858]"
            >
              <option value="">Pilih Proyek</option>
              <option
                value="addProject"
                className="text-[#F15858] font-semibold"
              >
                + Tambah Proyek
              </option>
              {projectsList.map((project, index) => (
                <option key={index} value={project}>
                  {project}
                </option>
              ))}
            </select>
          </div>
          <div class="border-t border-gray-200 mb-3 min-w-full -mx-8"></div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseAddKegiatan}
              className="bg-white text-[#F15858] font-bold py-2 px-4 mr-2 rounded-lg hover:underline hover:underline-offset-4"
            >
              Kembali
            </button>
            <button
              onClick=""
              className="bg-[#F15858] text-white font-bold py-2 px-4 rounded-lg hover:underline hover:underline-offset-4"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TambahKegiatan;
