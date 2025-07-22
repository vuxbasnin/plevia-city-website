import React from "react";
import "./TableLeftImageRight.css";

interface TableLeftImageRightProps {
  tableData: { label: string; value: string }[];
  imageUrl: string;
}

const TableLeftImageRight: React.FC<TableLeftImageRightProps> = ({ tableData, imageUrl }) => {
  return (
    <div className="table-left-image-right__container">
      <div className="table-left-image-right__table-wrapper">
        <table className="table-left-image-right__table">
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td className="table-left-image-right__label">{row.label}</td>
                <td className="table-left-image-right__value">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-left-image-right__image-wrapper">
        <img src={imageUrl} alt="section" className="table-left-image-right__image" />
      </div>
    </div>
  );
};

export default TableLeftImageRight;

export const tableLeftImageRightExample = {
  tableData: [
    { label: "Mật độ xây dựng", value: "23,3%, 3 mặt giáp sông" },
    { label: "Công viên nội khu", value: "5 công viên: ven sông, ven trườn, sức khoẻ, cộng đồng" },
    { label: "Hệ giá trị 5 iFactors", value: "iNature – Thiên nhiên, iEntertainment – Giải trí, iWell-being – Sức khoẻ, iConvenience – Tiện nghi, iSustainability – Bền vững" },
    { label: "Tiện ích", value: "Hồ cảnh quan, sân golf mini, khu BBQ và đường chạy bộ 2km" },
    { label: "Thiết kế", value: "Mảng xanh đa tầng" },
  ],
  imageUrl: "https://khangdienhcm.com/wp-content/uploads/2025/07/TONG-QUAN-DU-AN-GLADIA-KHANG-DIEN.jpg",
};

export const tableLeftImageRightProjectInfo = {
  tableData: [
    { label: "Tên dự án", value: "GLADIA KHANG ĐIỀN" },
    { label: "Vị trí dự án", value: "Võ Chí Công, P. Bình Trưng (Quận 2),  TP.HCM" },
    { label: "Chủ đầu tư", value: "Khang Điền & Keppel Land" },
    { label: "Phòng Kinh Doanh", value: "0918 78 00 88" },
    { label: "Đơn vị xây dựng", value: "An Phong & Wealthcons" },
    { label: "Diện tích", value: "11.8 ha" },
    { label: "Quy mô", value: "226 căn biệt thự, 617 căn hộ cao cấp." },
    { label: "Tiến độ xây dựng", value: "Đạt ̣98%. Đang hoàn hạ tầng, tiện ích, sản phẩm" },
    { label: "Kế hoạch bán hàng", value: "Kickoff ngày 09/07/2025\nKhai trương Nhà mẫu 20/07/2025\nBooking có hoàn lại 200 triệu" },
  ],
  imageUrl: "https://khangdienhcm.com/wp-content/uploads/2025/07/TONG-QUAN-DU-AN-GLADIA-KHANG-DIEN.jpg",
};
