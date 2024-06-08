import { useState } from "react";
import { FaSearch} from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

const SearchBar = () => {
  const [searchList, setSearchList] = useState("");

  return (
    <>
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
          <button className="relative flex items-center p-3">
            <IoFilterSharp size={24} className={`text-[#F15858]`} />
            {searchList && (
              <span className="absolute bg-[#2775EC] border-2 border-white rounded-full w-3 h-3 -top-2.5 right-1 m-1 mt-5" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
