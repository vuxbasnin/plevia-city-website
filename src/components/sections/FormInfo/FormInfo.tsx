'use client';

import React, { useState } from 'react';
import './FormInfo.css';

interface FormData {
  name: string;
  email: string;
  content: string;
}

const FormInfo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      content: ''
    });
  };

  return (
    <div className="form-info-container">
      {/* Left Section - Information */}
      <div className="form-info-left">
        <div>
          <h2 className="form-info-heading">CÙNG KẾT NỐI</h2>
          <p className="form-info-subtext">
            Chào đón bạn đến với Thanh Xuan Valley.<br />
            Vui lòng để lại thông tin tại đây
          </p>
        </div>
        

      </div>

      {/* Right Section - Form */}
      <div className="form-info-right">
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">TÊN CỦA BẠN *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="form-label">EMAIL *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
          </div>
          
          <div className="form-field full-width">
            <label className="form-label">NỘI DUNG *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="form-textarea"
              required
            />
          </div>
          
          <button type="submit" className="form-submit">
            GỬI <span className="arrow-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInfo;
