import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const ItemData = ({ index, data, onEdit, onDelete }) => {
  const tanggalMulai = dayjs(data.tanggalmulai).format("DD/MM/YYYY");
  const tanggalBerakhir = dayjs(data.tanggalberakhir).format("DD/MM/YYYY");
  const waktuMulai = dayjs(data.waktumulai, "HH:mm:ss").format("HH:mm")
  const waktuBerakhir = dayjs(data.waktuberakhir, "HH:mm:ss").format("HH:mm")

  return (
    <>
      <tr key={index} className="border-b border-gray-200">
        <td
          className="py-2 px-4 border-r border-gray-200"
          colSpan="10"
        >
          {data.judulkegiatan}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.namaproyek}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {tanggalMulai}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {tanggalBerakhir}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {waktuMulai}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {waktuBerakhir}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="3">
          {data.durasi}
        </td>
        <td className="flex py-2 px-4 -ml-1 " colSpan="2">
          <button
            onClick={() => onEdit(data)}
            className="text-[#F15858]  mr-2 border border-gray-200 p-1 hover:bg-[#F7F8FB]"
          >
            <CiEdit />
          </button>
          <button
            onClick={() => onDelete(data)}
            className="text-[#F15858]  mr-2 border border-gray-200 p-1 hover:bg-[#F7F8FB]"
          >
            <MdDeleteOutline />
          </button>
        </td>
      </tr>
    </>
  );
};

export default ItemData;
