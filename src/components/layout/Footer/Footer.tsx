
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { Mail, Phone, MapPin, Facebook, Youtube, RotateCcw, MapPin as MapPinIcon } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import './Footer.css';

export default function Footer() {
  const { siteSettings, isLoading: isLoadingSettings } = useSiteSettings();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: ĐƠN VỊ PHÁT TRIỂN */}
          <div className="footer-column">
            <h5 className="footer-title">Đơn vị phát triển</h5>
            <div className="bim-logo">
              <span className="bim-logo-main">BẮC HẢI</span>
            </div>
            <ul className="footer-links">
              <li>
                <Link href="#" className="footer-link">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="#" className="footer-link">
                  Tin tức
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Ghé thăm thung lũng */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Ghé thăm </h5>
            <p className="footer-address">
              Địa chỉ: 63-65 Lý Nam Đế, phường Hội Phú, tỉnh Gia Lai
            </p>
            <button className="footer-button">
              Đặt lịch hẹn
            </button>
          </div>

          {/* Column 3: Tham quan Sales Gallery */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Tham quan Dự án</h5>
            <div className="footer-text">
              <p>1/ Tại dự án: Khu đô thị Plevia City</p>
              <p>2/ Tại Hà Nội: Tầng 04, tòa nhà Thương mại và dịch vụ B-CC, Dự án khu nhà ở Ngân Hà Vạn Phúc, Phố Tố Hữu, Phường Hà Đông, Thành phố Hà Nội, Việt Nam</p>
            </div>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Liên hệ</h5>
            <div className="footer-contact-info">
              <p>hotro@tapdoanbachai.vn</p>
              <div className="footer-hotline">
                <span>Hotline: </span>
                <span className="footer-hotline-number">0923.15.3939</span>
              </div>
            </div>
            <div className="footer-social-icons">
              <div className="social-icon">
                <Facebook />
              </div>
              <div className="social-icon">
                <Youtube />
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} BẮC HẢI. Đã đăng ký Bản quyền.
          </div>
        </div>
      </div>
    </footer>
  );
}

