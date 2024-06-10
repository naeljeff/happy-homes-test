import { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
import { IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";

import TambahProject from "./TambahProject";
import AddKegiatanModal from "../Modal/ModalSubmitSuccess";
import EditKegiatanModal from "../Modal/ModalSubmitSuccess";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const TambahKegiatan = ({
  isOpen,
  onClose,
  projectsList,
  currentActivity,
  mode,
}) => {
  const defaultDate = dayjs();
  const defaultNowTime = dayjs().set("hour", 9).startOf("hour");
  const defaultTomorrowTime = dayjs().set("hour", 17).startOf("hour");

  const [tanggalMulai, setTanggalMulai] = useState(null);
  const [tanggalBerakhir, setTanggalBerakhir] = useState(null);
  const [jamMulai, setJamMulai] = useState(null);
  const [jamBerakhir, setJamBerakhir] = useState(null);
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [dropdownState, setDropdownState] = useState(false);
  const [addKegiatanModal, setAddKegiatanModal] = useState(false);
  const [editKegiatanModal, setEditKegiatanModal] = useState(false);
  const [idProyek, setIdProyek] = useState(null);
  const [idKegiatan, setIdKegiatan] = useState(null);
  let durasi = 0;

  useEffect(() => {
    setAddKegiatanModal(false);
    setEditKegiatanModal(false);
    if (mode.action === "edit" && currentActivity) {
      setIdKegiatan(currentActivity.idkegiatan);
      setTanggalMulai(
        dayjs(
          dayjs(currentActivity.tanggalmulai).format("DD/MM/YYYY"),
          "M/D/YYYY"
        )
      );
      setTanggalBerakhir(
        dayjs(
          dayjs(currentActivity.tanggalberakhir).format("DD/MM/YYYY"),
          "M/D/YYYY"
        )
      );
      setJamMulai(
        dayjs(dayjs(currentActivity.waktumulai, "HH:mm:ss").format())
      );
      setJamBerakhir(
        dayjs(dayjs(currentActivity.waktuberakhir, "HH:mm:ss").format())
      );
      setJudulKegiatan(currentActivity.judulkegiatan);
      setSelectedProject(currentActivity.namaproyek);
    } else {
      setTanggalMulai(defaultDate);
      setTanggalBerakhir(defaultDate);
      setJamMulai(defaultNowTime);
      setJamBerakhir(defaultTomorrowTime);
      setJudulKegiatan("");
      setSelectedProject("");
    }
  }, [mode, currentActivity]);

  const addKegiatan = async () => {
    const idproyek = idProyek;
    const tMulai = tanggalMulai.format("DD/MM/YYYY");
    const tBerakhir = tanggalBerakhir.format("DD/MM/YYYY");
    const jMulai = jamMulai.format("HH:mm");
    const jBerakhir = jamBerakhir.format("HH:mm");

    try {
      const res = await axios.post("http://localhost:5000/api/v1/kegiatan", {
        judulKegiatan,
        tMulai,
        tBerakhir,
        jMulai,
        jBerakhir,
        durasi,
        idproyek,
      });
      console.log(res.data);
    } catch (error) {
      console.log(`Error adding new kegiatan: ${error.message}`);
    }
  };

  const editKegiatan = async (idKegiatan) => {
    const idproyek = idProyek;
    const tMulai = tanggalMulai.format("DD/MM/YYYY");
    const tBerakhir = tanggalBerakhir.format("DD/MM/YYYY");
    const jMulai = jamMulai.format("HH:mm");
    const jBerakhir = jamBerakhir.format("HH:mm");

    console.log(tMulai)
    console.log(tBerakhir)
    console.log(jMulai)
    console.log(jBerakhir)

    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/kegiatan/${idKegiatan}`,
        {
          judulKegiatan,
          idproyek,
          tMulai,
          tBerakhir,
          jMulai,
          jBerakhir,
          durasi,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(`Error updating kegiatan: ${error.message}`);
    }
  };

  const handleTambahKegiatan = () => {
    if (!tanggalMulai.valueOf()) alert("Tanggal mulai tidak boleh kosong");
    else if (!tanggalBerakhir.valueOf())
      alert("Tanggal berakhir tidak boleh kosong");
    else if (!jamMulai.valueOf()) alert("Jam mulai tidak boleh kosong");
    else if (!jamBerakhir.valueOf()) alert("Jam berakhir tidak boleh kosong");
    else if (!judulKegiatan) alert("Judul kegiatan tidak boleh kosong");
    else if (!selectedProject) alert("Project tidak boleh kosong");
    else {
      const tMulai = tanggalMulai.format("DD/MM/YYYY");
      const tBerakhir = tanggalBerakhir.format("DD/MM/YYYY");
      const jMulai = jamMulai.format("HH:mm");
      const jBerakhir = jamBerakhir.format("HH:mm");

      const dateStart = `${tMulai} ${jMulai}`;
      const dateEnd = `${tBerakhir} ${jBerakhir}`;

      const combinedStart = dayjs(dateStart, "MM/DD/YYYY HH:mm");
      const combinedEnd = dayjs(dateEnd, "MM/DD/YYYY HH:mm");
      const totalDuration = dayjs.duration(combinedEnd.diff(combinedStart));
      const totalMinutes = totalDuration.asMinutes();

      const workStart = dayjs(`${tMulai} 09:00`, "MM/DD/YYYY HH:mm");
      const workEnd = dayjs(`${tMulai} 17:00`, "MM/DD/YYYY HH:mm");

      let workDurationInMinutes = 0;
      let overtimeDurationInMinutes = 0;

      if (combinedStart.isBefore(workEnd) && combinedEnd.isAfter(workStart)) {
        const effectiveStart = combinedStart.isBefore(workStart)
          ? workStart
          : combinedStart;
        const effectiveEnd = combinedEnd.isAfter(workEnd)
          ? workEnd
          : combinedEnd;
        workDurationInMinutes = dayjs
          .duration(effectiveEnd.diff(effectiveStart))
          .asMinutes();
      }

      if (combinedStart.isBefore(workStart)) {
        overtimeDurationInMinutes += dayjs
          .duration(workStart.diff(combinedStart))
          .asMinutes();
      }
      if (combinedEnd.isAfter(workEnd)) {
        overtimeDurationInMinutes += dayjs
          .duration(combinedEnd.diff(workEnd))
          .asMinutes();
      }

      // Calculate just overtime -> I will assume 08:00 - 16:00 still counts as work time even though it's outside work hour, because minimum duration has to be 8 hours
      durasi = workDurationInMinutes + overtimeDurationInMinutes;

      // console.log(data);

      if (mode.action === "add") {
        addKegiatan();
        setAddKegiatanModal(true);
      } else if (mode.action === "edit") {
        editKegiatan(idKegiatan);
        setEditKegiatanModal(true);
      }

      setTimeout(() => {
        onClose(true);
        setTanggalMulai(defaultDate);
        setTanggalBerakhir(defaultDate);
        setJamMulai(defaultNowTime);
        setJamBerakhir(defaultTomorrowTime);
        setJudulKegiatan("");
        setSelectedProject("");
        setDropdownState(!dropdownState);
      }, 2000);
    }
  };

  const handleCloseAddKegiatan = () => {
    setTanggalMulai(defaultDate);
    setTanggalBerakhir(defaultDate);
    setJamMulai(defaultNowTime);
    setJamBerakhir(defaultTomorrowTime);
    setJudulKegiatan("");
    setSelectedProject("");
    onClose(true);
    setDropdownState(false);
  };

  const handleDropdownState = () => {
    setDropdownState(!dropdownState);
  };

  const handleSelectedProject = (project) => {
    setIdProyek(project.idproyek);
    setSelectedProject(project.namaproyek);
    setDropdownState(false);
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
            <h1 className="text-xl font-bold">
              {mode === "add" ? "Tambah Kegiatan Baru" : "Edit Kegiatan"}
            </h1>
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
                      setTanggalBerakhir(newValue);
                    }
                  }}
                  defaultValue={tanggalMulai}
                  minDate={tanggalMulai}
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
                  defaultValue={tanggalBerakhir}
                  minDate={tanggalMulai}
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
                      key={project.idproyek}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded"
                    >
                      {project.namaproyek}
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

      {/* If Add Success -> Show modal */}
      <AddKegiatanModal
        show={addKegiatanModal}
        onClose={() => setAddKegiatanModal(false)}
        message="Berhasil menambahkan kegiatan!"
      />

      {/* If Edit Success -> Show modal */}
      <EditKegiatanModal
        show={editKegiatanModal}
        onClose={() => setEditKegiatanModal(false)}
        message="Berhasil mengubah kegiatan!"
      />
    </>
  );
};

export default TambahKegiatan;
