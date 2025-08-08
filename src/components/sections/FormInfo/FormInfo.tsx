'use client';

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Lưu vào Firestore collection connect_signups
      await addDoc(collection(db, "connect_signups"), {
        fullName: formData.name,
        email: formData.email,
        message: formData.content,
        createdAt: serverTimestamp(),
        status: "pending",
        source: "form_info" // Đánh dấu nguồn từ FormInfo
      });

      toast({
        title: "Đã gửi thành công!",
        description: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ sớm phản hồi.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        content: ''
      });
    } catch (error) {
      console.error("Failed to submit form to Firestore:", error);
      toast({
        title: "Gửi thất bại!",
        description: "Đã có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="form-info-container">
      {/* Left Section - Information */}
      <div className="form-info-left">
        <div>
          <h2 className="form-info-heading">NHẬN TÀI LIỆU THÔNG TIN DỰ ÁN</h2>
          <p className="form-info-subtext">
            Xin vui lòng điền đầy đủ thông tin để nhận tài liệu.<br/>
            Tài liệu thông tin dự án sẽ được gửi về email của bạn trong thời gian sớm nhất!
          </p>
        </div>
        

      </div>

      {/* Right Section - Form */}
      <div className="form-info-right">
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">TÊN *</label>
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
              <label className="form-label">Số điện thoại *</label>
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
            <label className="form-label">Email *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="form-textarea"
              required
            />
          </div>
          
          <button type="submit" className="form-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ĐANG GỬI...
              </>
            ) : (
              <>
                NHẬN TÀI LIỆU <span className="arrow-icon">→</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormInfo;
