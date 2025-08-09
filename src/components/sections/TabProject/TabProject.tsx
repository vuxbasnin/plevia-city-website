import React from "react";
import "./TabProject.css";

const TabProject = () => {
    return (<div className="tab-project-container">
        <div className="tab-both-wrapper">
            <div className="tab-content tab-content-left">
                <b>QUY MÔ DỰ ÁN PLEVIA CITY:</b>
                <div className="tab-desc">
                    <b>Diện tích dự án:</b> ~ 7ha
                </div>
                <div className="tab-desc">
                    <b>Dự án bao gồm</b>
                    <ul>
                        <li>9 phân khu</li>
                        <li>368 căn liền kề & shophouse</li>
                        <li>Diện tích: 110 - 120m2</li>
                        <li>Số lượng sản phẩm hoàn thiện bên ngoài, xây thô bên trong: 209</li>
                    </ul>
                </div>

            </div>
            {/*<div className="tab-content tab-content-right">*/}
            {/*  <b>THÔNG TIN SẢN PHẨM:</b>*/}
            {/*  <ul>*/}
            {/*    <li>Mẫu nhà góc 6m 2 mặt tiền trục chính tuyến đường 19.5m</li>*/}
            {/*    <li>Mẫu nhà 5m liền kề trục đường 11.5m</li>*/}
            {/*    <li>Mẫu nhà góc 2 mặt tiền trục đường nhỏ 11.5m</li>*/}
            {/*    <li>Mẫu nhà góc trục đường 14m</li>*/}
            {/*    <li>Mẫu nhà 5m liền kề trục đường 14m</li>*/}
            {/*  </ul>*/}
            {/*</div>*/}
            <div className="tab-content tab-content-right">
                <b>KẾ HOẠCH MỞ BÁN:</b>
                <div className="tab-desc">
                    <b>Giai đoạn 1</b>
                    <ul>
                        <li>86 căn liền kề & shophouse</li>
                        <li>Diện tích: 110 - 120m2</li>
                    </ul>
                    {/*<b>Dự án Plevia City mở rộng</b> – diện tích 7ha*/}
                </div>
                {/*<div className="tab-desc">*/}
                {/*    <b>Dự án bao gồm:</b> 86 căn nhà phố liền kề và shophouse cao cấp.*/}
                {/*</div>*/}
            </div>
        </div>
    </div>);
};

export default TabProject;
