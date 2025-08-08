import React from "react";
import "./TabProject.css";

const TabProject = () => {
  return (
    <div className="tab-project-container">
      <div className="tab-both-wrapper">
        <div className="tab-content tab-content-left">
          <b>QUY MÔ DỰ ÁN PLEVIA CITY:</b>
          <div className="tab-desc">
            <b>Phân khu</b>

          <ul>
            <li>86 liền kề và shophouse</li>
            <li>110 m2 đến 120 m2</li>
          </ul>
            <b>Dự án Plevia City mở rộng</b> – diện tích 7ha
          </div>
          <div className="tab-desc">
            <b>Dự án bao gồm:</b> 86 căn nhà phố liền kề và shophouse cao cấp.
          </div>
        </div>
        <div className="tab-content tab-content-right">
          <b>THÔNG TIN SẢN PHẨM:</b>
          <ul>
            <li>Mẫu nhà góc 6m 2 mặt tiền trục chính tuyến đường 19.5m</li>
            <li>Mẫu nhà 5m liền kề trục đường 11.5m</li>
            <li>Mẫu nhà góc 2 mặt tiền trục đường nhỏ 11.5m</li>
            <li>Mẫu nhà góc trục đường 14m</li>
            <li>Mẫu nhà 5m liền kề trục đường 14m</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabProject;
