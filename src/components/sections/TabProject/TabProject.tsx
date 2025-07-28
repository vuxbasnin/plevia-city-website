import React from "react";
import "./TabProject.css";

const TabProject = () => {
  return (
    <div className="tab-project-container">
      <div className="tab-both-wrapper">
        <div className="tab-content tab-content-left">
          <b>QUY MÔ DỰ ÁN PLEVIA CITY:</b>
          <ul>
            <li>Phân khu <b>The Grand</b> – Biệt thự Đơn Lập và Tứ Lập</li>
            <li>Phân khu <b>The Grace</b> – Biệt thự Song Lập – Đơn Lập</li>
            <li>Phân khu <b>The Posh</b> – Nhà phố liền kề vườn</li>
            <li>Phân khu <b>Cao tầng</b> – 2 Block cao 25 tầng, 617 căn hộ.</li>
            <li>Dự án <b>Plevia City mở rộng</b> – diện tích 6ha</li>
          </ul>
          <div className="tab-desc">
            Dự án bao gồm: <b>86 căn nhà phố liền kề, 16 căn biệt thự tứ lập, 64 căn biệt thự song lập, 60 căn biệt thự đơn lập và 617 căn hộ cao cấp</b>.
          </div>
        </div>
        <div className="tab-content tab-content-right">
          <b>THÔNG TIN SẢN PHẨM:</b>
          <ul>
            <li>Mẫu nhà góc 6m 2 mặt tiền trục chính tuyến đường 19.5m</li>
            <li>Mẫu nhà 5m liền kề trục đường 11.5m</li>
            <li>Mẫu nhà góc 2 mặt tiền trục đường nhỏ 11.5m</li>
            <li>Mẫu nhà góc trục đường 14m</li>
            <li>Mẫu nhà 5m liền kề trục đường 14m</li>
            <li>Mẫu nhà 5m liền kề bán hầm Block G</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabProject;
