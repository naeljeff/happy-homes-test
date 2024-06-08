// Import libraries
import { useState } from "react";

// Import components
import Navigation from "./Navigation/Nav";
import Header from "./Components/Header";
import DaftarKegiatan from "./Components/DaftarKegiatan";
import Pengaturan from "./Components/Pengaturan";
import FilterProject from "./Components/FilterProject";

function App() {
  // State for navigation
  const [activeTab, setActiveTab] = useState("daftarKegiatan");

  const renderContent = () => {
    if (activeTab === "daftarKegiatan") return <DaftarKegiatan />;
    else if (activeTab === "pengaturan") return <Pengaturan />;
  };

  return (
    <>
      <div className="min-h-screen bg-[#F7F8FB]">
        <Header />

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* Content */}
        <div className="mx-auto p-4">{renderContent()}</div>
      </div>
    </>
  );
}

export default App;
