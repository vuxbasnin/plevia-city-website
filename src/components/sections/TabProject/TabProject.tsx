import React from "react";
import "./TabProject.css";

const TabProject = () => {
  return (
    <div className="tab-project-container">
      <div className="tab-both-wrapper">
        <div className="tab-content tab-content-left">
          <b>QUY MÔ DỰ ÁN GLADIA:</b>
          <ul>
            <li>Phân khu <b>The Grand</b> – Biệt thự Đơn Lập và Tứ Lập</li>
            <li>Phân khu <b>The Grace</b> – Biệt thự Song Lập – Đơn Lập</li>
            <li>Phân khu <b>The Posh</b> – Nhà phố liền kề vườn</li>
            <li>Phân khu <b>Cao tầng</b> – 2 Block cao 25 tầng, 617 căn hộ.</li>
            <li>Dự án <b>Gladia mở rộng</b> – diện tích 6ha</li>
          </ul>
          <div className="tab-desc">
            Dự án bao gồm: <b>86 căn nhà phố liền kề, 16 căn biệt thự tứ lập, 64 căn biệt thự song lập, 60 căn biệt thự đơn lập và 617 căn hộ cao cấp</b>.
          </div>
        </div>
        <div className="tab-content tab-content-right">
          <b>THÔNG TIN SẢN PHẨM:</b>
          <ul>
            <li><b>Biệt thự đơn lập Gladia:</b> 12-14 x 18-20m. Diện tích đất từ 240 – 280m2. Xây dựng 1 trệt 2 lầu.</li>
            <li><b>Biệt thự song lập Gladia:</b> 9×17, 9 x19m. Diện tích đất: 171m2. Xây dựng 1 trệt 3 lầu.</li>
            <li><b>Biệt thự tứ lập Gladia:</b> 14x18m. Diện tích đất : 252m2. Xây dựng 1 trệt 3 lầu.</li>
            <li><b>Nhà phố liền kề:</b> 6x17m, 6x19m. Diện tích đất: 102 – 114m2. Xây dựng 1 trệt 3 lầu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabProject;
