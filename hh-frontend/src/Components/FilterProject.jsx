import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const FilterProject = ({ isOpen, onClose, projects, onApplyFilter }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [dropdownState, setDropdownState] = useState(false);

  const handleSelectProject = (projects) => {
    setSelectedProjects((prevSelected) =>
      prevSelected.includes(projects)
        ? prevSelected.filter((p) => p !== projects)
        : [...prevSelected, projects]
    );
  };

  const handleApplyFilter = () => {
    onApplyFilter(selectedProjects);
  };

  const handleClearFilter = () => {
    setSelectedProjects([]);
  };

  const handleDropdownState = () => {
    setDropdownState(!dropdownState);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl">
          <div className="flex justify-between items-center mb-4 -mt-2">
            <h1 className="text-xl font-bold">Filter</h1>
            <button
              onClick={onClose}
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
              Proyek <span class="text-[#F15858]">*</span>
            </label>
            <div className="relative">
              <div className="flex items-center border rounded-lg p-2">
                <div className="flex flex-wrap gap-2">
                  {selectedProjects.length > 0 ? (
                    selectedProjects.map((project) => (
                      <span
                        key={project}
                        className="flex items-center bg-gray-200 text-gray-700 font-semibold tracking-tighter p-1 pr-3 rounded-full mr-2"
                      >
                        <button
                          type="button"
                          className="text-lg text-white ml-1 mr-2 bg-gray-400 rounded-full w-7 h-7 hover:text-[#F15858]"
                          onClick={() => handleSelectProject(project)}
                        >
                          &times;
                        </button>
                        {project}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 pl-2">Pilihan filter</span>
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
                  {projects.map((project) => (
                    <div
                      onClick={() => handleSelectProject(project)}
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

          <div class="border-t border-gray-200 mb-3 min-w-full -mx-8"></div>
          <div className="flex justify-end">
            <button
              onClick={handleClearFilter}
              className="bg-white text-[#F15858] font-bold py-2 px-4 mr-2 rounded-lg hover:underline hover:underline-offset-4"
            >
              Hapus Filter
            </button>
            <button
              onClick={handleApplyFilter}
              className="bg-[#F15858] text-white font-bold py-2 px-4 rounded-lg hover:underline hover:underline-offset-4"
            >
              Terapkan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProject;
