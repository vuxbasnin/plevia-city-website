import React from "react";
import "./TableLeftImageRight.css";

interface TableLeftImageRightProps {
  tableData: { [key: string]: string }[];
  imageUrl: string;
  title?: string;
}

const TableLeftImageRight: React.FC<TableLeftImageRightProps> = ({ tableData, imageUrl, title }) => {
  // Lấy danh sách keys cho header và cột
  const columnKeys = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="table-left-image-right__container">
      <div className="table-left-image-right__table-image-group">
        <div className="table-left-image-right__table-side">
          {title && (
            <div className="table-left-image-right__title">{title}</div>
          )}
          <div className="table-left-image-right__table-wrapper">
            <table className={`table-left-image-right__table table-left-image-right__col-${columnKeys.length}`}>
              <thead>
                <tr>
                  {columnKeys.map((key) => (
                    <th key={key} className={`table-left-image-right__header table-left-image-right__${key}`}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    {columnKeys.map((key) => (
                      <td key={key} className={`table-left-image-right__value table-left-image-right__${key}`}>
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="table-left-image-right__image-wrapper">
          <img src={imageUrl} alt="section" className="table-left-image-right__image" />
        </div>
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

export const tableLeftImageRightPriceExample = {
  title: "BẢNG GIÁ DỰ KIẾN DỰ ÁN GLADIA KHANG ĐIỀN – NĂM 2025",
  tableData: [
    { "Loại hình": "Biệt thự đơn lập", "Diện tích (m²)": "240 – 280", "Giá bán dự kiến (tỷ)": "60– 70" },
    { "Loại hình": "Biệt thự song lập", "Diện tích (m²)": "171", "Giá bán dự kiến (tỷ)": "42" },
    { "Loại hình": "Biệt thự tư lập", "Diện tích (m²)": "252", "Giá bán dự kiến (tỷ)": "63" },
    { "Loại hình": "Nhà phố liên kế", "Diện tích (m²)": "102 – 114", "Giá bán dự kiến (tỷ)": "27 – 28" },
  ],
  imageUrl: "https://khangdienhcm.com/wp-content/uploads/2025/07/CHINH-SACH-BAN-HANG-GLADIA-KHANG-DIEN.jpg",
};
