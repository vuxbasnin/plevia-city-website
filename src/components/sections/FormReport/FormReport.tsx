import React from "react";
import "./FormReport.css";

const FormReport = () => {
  return (
    <div className="formreport-container">
      <form className="formreport-form" onSubmit={e => e.preventDefault()}>
        <input className="formreport-input" type="text" placeholder="Tên" />
        <input className="formreport-input" type="email" placeholder="Email" />
        <textarea className="formreport-textarea" placeholder="Văn bản" rows={5} />
        <button className="formreport-btn" type="submit">Gửi</button>
      </form>
      <div className="formreport-info">
        <div className="formreport-info-title">
          Phòng Kinh Doanh Dự Án Gladia by The Waters Khang Điền
        </div>
        <div className="formreport-info-desc">
          Quý khách hàng có thể liên hệ trực tiếp với chúng tôi để được tư vấn hoặc quý khách hàng vui lòng điền thông tin vào mẫu bên cạnh. Chúng tôi sẽ liên hệ với quý khách hàng trong thời gian sớm nhất.
        </div>
        <div className="formreport-info-detail">
          <div>Địa chỉ: Tầng 11, Tòa nhà Saigon Centre, 67 Lê Lợi, P. Bến Nghé, Quận 1, TP. HCM</div>
          <div>Email: <a href="mailto:sale.khangdienhcm@gmail.com" className="formreport-link">sale.khangdienhcm@gmail.com</a></div>
          <div>Điện thoại: <a href="tel:0919399719" className="formreport-link">0919.399.719</a> – <a href="tel:0918780088" className="formreport-link">0918.78.0088</a></div>
        </div>
      </div>
    </div>
  );
};

export default FormReport;
