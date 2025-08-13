
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
              <NextImage
                src="/assets/logo_bachai_golden.png"
                alt="Logo Bắc Hải"
                width={120}
                height={120}
                className="bim-logo-image"
                priority
              />
              <span className="bim-logo-main">Công ty Cổ phần Tập đoàn Đầu tư Bắc Hải</span>
            </div>
            <ul className="footer-text">
              <li>
                <p>Trụ sở: Tầng 04, tòa nhà Thương mại và dịch vụ B-CC, Dự án khu nhà ở Ngân Hà Vạn Phúc, Phố Tố Hữu, Phường Hà Đông, Thành phố Hà Nội, Việt Nam</p>
              </li>
            </ul>
          </div>

          {/* Column 2: CÁC PAGE CON */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Trang chủ</h5>
            <ul className="footer-page-links">
              <li>
                <Link href="/" className="footer-page-link">
                  Homepage
                </Link>
              </li>
              <li>
                <Link href="/storyline" className="footer-page-link">
                  Câu chuyện kiến tạo
                </Link>
              </li>
              <li>
                <Link href="/location" className="footer-page-link">
                  Kết nối & Tiện ích
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="footer-page-link">
                  Phong cách sống
                </Link>
              </li>
              <li>
                <Link href="/news" className="footer-page-link">
                  Tin tức
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tham quan Sales Gallery */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Tham quan dự án</h5>
            <div className="footer-text">
              <p>Khu đô thị Plevia City: 63–65 Lý Nam Đế, phường Hội Phú, tỉnh Gia Lai</p>
            </div>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Liên hệ</h5>
            <div className="footer-contact-info">
              <p>hotro@tapdoanbachai.vn</p>
              <p>
              </p>
              <div className="footer-hotline">
                <span>Hotline: </span>
                <span className="footer-hotline-number">07.67.67.67.72</span>
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

