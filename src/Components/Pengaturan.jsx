import { useState } from "react";

const Pengaturan = () => {
  // State handler
  const [nama, setNama] = useState("");
  const [rate, setRate] = useState("");

  // Handler function to submit data
  const handleSave = () => {
    if (!nama) alert("Please enter your name");
    else if (!rate) alert("Please enter a rate");
    else {
      //   Convert rate into int

      alert(`Data Saved: ${nama}, ${rate}`);
      setNama("");
      setRate("");
    }
  };

  const handleCancel = () => {
    console.log("Canceled");
    setNama("");
    setRate("");
  };

  const formatNumber = (value) => {
    if (!value) return value;
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const handleRateChange = (event) => {
    const rawValue = event.target.value.replace(/,/g, "");
    const formattedValue = formatNumber(rawValue);
    setRate(formattedValue);
  };

  // Only allow numeric input for rate
  const handleKeyPress = (event) => {
    const charCode = event.charCode || event.keyCode;
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="bg-white shadow-md rounded-lg p-10 w-1/3">
          <div className="mb-4 mt-3">
            <label
              htmlFor="nama"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Nama Karyawan
            </label>
            <input
              onChange={(event) => setNama(event.target.value)}
              type="text"
              id="nama"
              value={nama}
              className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-[#F15858] focus:ring-1 focus:ring-[#F15858]"
              placeholder="Nama"
            />
          </div>

          <div className="mb-4 mt-7">
            <label
              htmlFor="rate"
              className="block text-gray-500 text-sm font-bold mb-2"
            >
              Rate
            </label>
            <div className="flex items-center border rounded-lg focus:outline-none focus-within:border-[#F15858] focus-within:ring-1 focus-within:ring-[#F15858]">
              <span className="px-3 text-gray-700">Rp.</span>
              <input
                onChange={handleRateChange}
                onKeyPress={handleKeyPress}
                type="text"
                id="rate"
                value={rate}
                className="w-full py-2 px-3 text-gray-700 bg-white rounded-md outline-none focus:ring-0"
                placeholder="0"
              />

              <span className="px-3 text-gray-400">/Jam</span>
            </div>
          </div>

          <div className="flex justify-center w-full mt-7 mb-3">
            <button
              onClick={handleCancel}
              className="bg-[#F0F6FF] text-[#2775EC] font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-3/5 "
            >
              Batalkan
            </button>
            <button
              onClick={handleSave}
              className="bg-[#2775EC] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-3/5 ml-2"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pengaturan;
