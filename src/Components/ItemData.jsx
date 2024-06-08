const ItemData = ({index, data}) => {
  return (
    <>
      <tr key={index}>
        <td
          className="py-2 px-4 border-b border-r border-gray-200"
          colSpan="10"
        >
          {data.judul}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="4">
          {data.namaProyek}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="4">
          {data.tanggalMulai}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="4">
          {data.tanggalBerakhir}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="4">
          {data.waktuMulai}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="4">
          {data.waktuBerakhir}
        </td>
        <td className="py-2 px-4 border-b border-r border-gray-200" colSpan="3">
          {data.durasi}
        </td>
        <td className="py-2 px-4 border-b border-gray-200" colSpan="2">
          AKSI
        </td>
      </tr>
    </>
  );
};

export default ItemData;
