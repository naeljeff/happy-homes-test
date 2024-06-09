// Import libraries
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Import components
import Navigation from "./Navigation/Nav";
import Header from "./Components/Header";
import DaftarKegiatan from "./Components/DaftarKegiatan";
import Pengaturan from "./Components/Pengaturan";

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="mx-auto p-4">{renderContent()}</div>
        </LocalizationProvider>
      </div>
    </>
  );
}

export default App;
