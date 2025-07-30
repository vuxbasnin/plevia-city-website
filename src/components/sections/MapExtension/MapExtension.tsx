'use client';

import React from 'react';
import Image from 'next/image';
import Title from '@/components/ui/Title/Title';
import './MapExtension.css';

interface MapExtensionMainTitleProps {
  title?: string;
}

export function MapExtensionMainTitle({ title = "KẾT NỐI VÙNG ĐỒNG BỘ – VỪA Ở VỪA SINH LỜI" }: MapExtensionMainTitleProps) {
  return (
    <div className="map-extension-header" style={{ marginTop: 48 }}>
      <Title variant="small" align="center">
        {title}
      </Title>
    </div>
  );
}

export default function MapExtension() {
  return (
    <section className="map-extension">
      {/* Main Title đã tách riêng, chỉ render component mới */}
      <MapExtensionMainTitle />
      <div className="map-extension-content">
        {/* Left Sidebar */}
        <div className="map-extension-sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">
              Country Club by InterContinental Plevia City Resort
            </h3>
            <div className="sidebar-image-container">
              <Image
                src="/images/country-club.jpg"
                alt="Country Club by InterContinental Plevia City Resort"
                width={400}
                height={300}
                className="sidebar-image"
              />
            </div>
            <p className="sidebar-description">
              Clubhouse quy mô nhất Việt Nam với diện tích 1,7ha, hơn 60 tiện ích dịch vụ đẳng cấp, 
              được quản lý vận hành bởi đội ngũ InterContinental Plevia City Resort
            </p>
            <button className="explore-button">
              Khám phá ngay →
            </button>
          </div>
        </div>
        {/* Right Map Area */}
        <div className="map-container">
          <Image
            src="/images/valley-map.jpg"
            alt="Bản đồ Plevia City Resort"
            width={1200}
            height={800}
            className="main-map-image"
          />
          {/* Map Labels */}
          <div className="map-labels">
            <div className="map-label trekking" data-label="Đường Trekking (5km)">
              <span className="label-text">Đường Trekking (5km)</span>
            </div>
            <div className="map-label residences" data-label="VALLEY PARK RESIDENCES">
              <span className="label-text">VALLEY PARK RESIDENCES</span>
            </div>
            <div className="map-label resort" data-label="InterContinental Plevia City Resort">
              <span className="label-text">InterContinental Plevia City Resort</span>
            </div>
            <div className="map-label valley-park" data-label="Valley Park">
              <span className="label-text">Valley Park</span>
            </div>
            <div className="map-label treewalk" data-label="Treewalk">
              <span className="label-text">Treewalk</span>
            </div>
            <div className="map-label country-club" data-label="Country Club by InterContinental Plevia City Resort">
              <span className="label-text">Country Club by InterContinental Plevia City Resort</span>
            </div>
            <div className="map-label sports-club" data-label="Sports Club">
              <span className="label-text">Sports Club</span>
            </div>
            <div className="map-label valley-complex" data-label="Valley Complex">
              <span className="label-text">Valley Complex</span>
            </div>
            <div className="map-label xuan-vi" data-label="Xuân Vi">
              <span className="label-text">Xuân Vi</span>
            </div>
            <div className="map-label orchard" data-label="ORCHARD RESIDENCES">
              <span className="label-text">ORCHARD RESIDENCES</span>
            </div>
            <div className="map-label valley-town" data-label="VALLEY TOWN">
              <span className="label-text">VALLEY TOWN</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

