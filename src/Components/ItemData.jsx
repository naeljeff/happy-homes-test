import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const ItemData = ({ index, data, onEdit, onDelete }) => {
  return (
    <>
      <tr key={index} className="border-b border-gray-200">
        <td
          className="py-2 px-4 border-r border-gray-200"
          colSpan="10"
        >
          {data.judul}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.namaProyek}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.tanggalMulai}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.tanggalBerakhir}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.waktuMulai}
        </td>
        <td className="py-2 px-4 border-r border-gray-200" colSpan="4">
          {data.waktuBerakhir}
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
