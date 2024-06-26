import { useEffect, useState } from "react";
import axios from "axios";

const TambahProject = ({ isOpen, onClose }) => {
  const [project, setProject] = useState("");
  const [projectsList, setProjectsList] = useState([]);

  // Fetch project
  useEffect(() => {
    fetchProjects();
  }, [projectsList]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/proyek");
      setProjectsList(res.data);
    } catch (error) {
      console.log(`Error fetching project: ${error.message}`);
    }
  };

  const addProject = async () => {
    const namaProyek = project;
    try {
      const res = await axios.post("http://localhost:5000/api/v1/proyek", {
        namaProyek,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(`Error adding new project: ${error.message}`);
    }
  };

  //   Add handle save project -> close project on save
  const handleAddProject = () => {
    console.log(projectsList);
    if (!project) alert("Nama proyek tidak boleh kosong");
    else if (projectsList.some((p) => p.namaproyek.toLowerCase() === project.toLowerCase())) {
      alert("Nama proyek sudah ada");
    } else {
      addProject();
      console.log(project); // Nanti jadi add to db
      setProject("");
      onClose(true);
    }
  };

  const handleCloseAddProject = () => {
    setProject("");
    onClose(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4 -mt-2">
            <h1 className="text-xl font-bold">Tambah Proyek Baru</h1>
            <button
              onClick={handleCloseAddProject}
              className="text-3xl text-gray-600 hover:text-[#F15858]"
            >
              &times;
            </button>
          </div>
          <div class="border-t border-gray-300 mb-6 min-w-full -mx-8"></div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-bold mb-2"
              htmlFor="project"
            >
              Nama Proyek <span class="text-[#F15858]">*</span>
            </label>
          </div>

          <input
            onChange={(event) => setProject(event.target.value)}
            type="text"
            id="project"
            value={project}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 mb-7 text-gray-700 leading-tight focus:outline-none focus:border-[#F15858] focus:ring-1 focus:ring-[#F15858]"
            placeholder="Nama Proyek Baru"
          />

          <div class="border-t border-gray-200 mb-3 min-w-full -mx-8"></div>
          <div className="flex justify-end">
            <button
              onClick={handleCloseAddProject}
              className="bg-white text-[#F15858] font-bold py-2 px-4 mr-2 rounded-lg hover:underline hover:underline-offset-4"
            >
              Kembali
            </button>
            <button
              onClick={handleAddProject}
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

export default TambahProject;
