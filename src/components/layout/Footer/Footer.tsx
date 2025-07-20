
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { Mail, Phone, MapPin, Facebook, Youtube, RotateCcw, MapPin as MapPinIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSiteSettingsData } from '@/lib/firestoreService';
import type { SiteSettingsData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import './Footer.css';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);

  useEffect(() => {
    async function loadSiteSettings() {
      setIsLoadingSettings(true);
      try {
        const settings = await getSiteSettingsData();
        setSiteSettings(settings || null);
      } catch (error) {
        console.error("Error loading site settings for Footer:", error);
        setSiteSettings(null);
      }
      setIsLoadingSettings(false);
    }
    loadSiteSettings();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: ĐƠN VỊ PHÁT TRIỂN */}
          <div className="footer-column">
            <h5 className="footer-title">Đơn vị phát triển</h5>
            <div className="bim-logo">
              <span className="bim-logo-main">BIM</span>
              <span className="bim-logo-sub">Land</span>
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
            <h5 className="footer-title-bold">Ghé thăm thung lũng</h5>
            <p className="footer-address">
              Địa chỉ: Thanh Xuan Valley, Phường Xuân Hòa, Tỉnh Phú Thọ
            </p>
            <button className="footer-button">
              Đặt lịch hẹn
            </button>
          </div>

          {/* Column 3: Tham quan Sales Gallery */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Tham quan Sales Gallery</h5>
            <div className="footer-text">
              <p>1/ Tại dự án: Khu Valley Center</p>
              <p>2/ Tại Hà Nội: Tầng 1, BIM Gallery, Tòa nhà Aqua Central - 44 Yên Phụ, Ba Đình, Hà Nội</p>
            </div>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Liên hệ</h5>
            <div className="footer-contact-info">
              <p>cskh-bimland@bimgroup.com</p>
              <div className="footer-hotline">
                <span>Hotline: </span>
                <span className="footer-hotline-number">19004791</span>
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
            &copy; {new Date().getFullYear()} BIM Land. Đã đăng ký Bản quyền.
          </div>
        </div>
      </div>
    </footer>
  );
}

