const Nav = ({ activeTab, setActiveTab }) => {
  return (
    <>
      <div className="bg-white shadow-md p-7 mt-3 pb-0">
        <h2 className="text-3xl font-bold mb-7 ml-1 mt-2 text-slate-600">
          HH Timesheet
        </h2>

        <div className="flex mb-0 ml-10 pb-2">
          <button
            onClick={() => setActiveTab("daftarKegiatan")}
            className={`
          text-lg 
          tracking-tighter  
          font-semibold 

          ${
            activeTab === "daftarKegiatan"
              ? `underline 
          underline-offset-[15px] 
          decoration-[3px]
          text-[#2775EC]`
              : `text-gray-600`
          }
          `}
          >
            Daftar Kegiatan
          </button>

          <button
            onClick={() => setActiveTab("pengaturan")}
            className={`
          text-lg 
          tracking-tighter  
          font-semibold 
          ml-8

          ${
            activeTab === "pengaturan"
              ? `underline 
          underline-offset-[15px] 
          decoration-[3px]
          text-[#2775EC]`
              : `text-gray-600`
          }
          `}
          >
            Pengaturan
          </button>
        </div>
      </div>
    </>
  );
};

export default Nav;
