
import { motion } from 'framer-motion';
import Link from 'next/link';
import NextImage from 'next/image';
import { Mail, Phone, MapPin, Facebook, Youtube, RotateCcw, MapPin as MapPinIcon, MessageSquare, Instagram } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Social links data
  const socialLinks = [
    {
      id: 'facebook',
      platformName: 'Facebook',
      iconName: 'Facebook',
      url: 'https://www.facebook.com/pleviacity',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'zalo',
      platformName: 'Zalo',
      iconName: 'MessageSquare',
      url: 'https://zalo.me/1501497019270466512',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'youtube',
      platformName: 'YouTube',
      iconName: 'Youtube',
      url: 'https://www.youtube.com/@pleviacity',
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-grid">
          {/* Column 1: Chủ đầu tư */}
          <div className="footer-column">
            <h5 className="footer-title">Chủ đầu tư</h5>
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
            <div className="footer-text">
              <p>Trụ sở chính: Tòa nhà TM & DV Galaxy, Tố Hữu, Vạn Phúc, Hà Ðông, Hà Nội</p>
            </div>
          </div>

          {/* Column 2: Dự án */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Dự án</h5>
            <ul className="footer-page-links">
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
                <Link href="/iot" className="footer-page-link">
                  Công nghệ IoT & AI
                </Link>
              </li>
              <li>
                <Link href="/news" className="footer-page-link">
                  Tin tức
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tham quan */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Tham quan dự án</h5>
            <div className="footer-text">
              <p>Văn phòng tư vấn dự án Plevia City</p>
              <p>63 Lý Nam Đế, phường Hội Phú, tỉnh Gia Lai</p>
            </div>
            <div className="footer-button-container">
              <Button className="footer-button">
                Đặt lịch tham quan
              </Button>
            </div>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="footer-column">
            <h5 className="footer-title-bold">Liên hệ</h5>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <span>hotro@tapdoanbachai.vn</span>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon" />
                <div className="footer-hotline">
                  <span>Hotline: </span>
                  <span className="footer-hotline-number">07.67.67.67.72</span>
                </div>
              </div>
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon" />
                <span>Gia Lai, Việt Nam</span>
              </div>
            </div>
            
            {/* Social Media Buttons */}
            <div className="footer-social-buttons">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "footer-social-button",
                    social.color
                  )}
                  aria-label={social.platformName}
                  title={social.platformName}
                >
                  {social.iconName === 'Facebook' && <Facebook className="h-4 w-4" />}
                  {social.iconName === 'MessageSquare' && <MessageSquare className="h-4 w-4" />}
                  {social.iconName === 'Youtube' && <Youtube className="h-4 w-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; {currentYear} <strong>BẮC HẢI</strong>. Đã đăng ký Bản quyền. | 
            <Link href="/privacy" className="footer-bottom-link"> Chính sách bảo mật</Link> | 
            <Link href="/terms" className="footer-bottom-link"> Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

