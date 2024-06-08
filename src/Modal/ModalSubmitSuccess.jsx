import { useEffect } from "react";

const PengaturanModal = ({ show, onClose, message }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-20 rounded-xl shadow-md text-center relative">
          <div className="flex justify-center items-center mb-4">
            <div className="checkmark-circle">
              <svg
                className="w-20 h-20 text-lime-500 checkmark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 52 52"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="checkmark__circle"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
                <path
                  class="checkmark__check"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 mt-5">Berhasil</h2>
          <p className="text-lg">{message}</p>
        </div>
      </div>
    </>
  );
};

export default PengaturanModal;
