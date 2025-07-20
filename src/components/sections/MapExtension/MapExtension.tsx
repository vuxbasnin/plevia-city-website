'use client';

import React from 'react';
import Image from 'next/image';
import Title from '@/components/ui/Title/Title';
import './MapExtension.css';

export default function MapExtension() {
  return (
    <section className="map-extension">
      {/* Main Title */}
      <div className="map-extension-header">
        <Title variant="large" align="center">
          BẢN ĐỒ TIỆN ÍCH
        </Title>
      </div>

      <div className="map-extension-content">
        {/* Left Sidebar */}
        <div className="map-extension-sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">
              Country Club by InterContinental Thanh Xuan Valley Resort
            </h3>
            
            <div className="sidebar-image-container">
              <Image
                src="/images/country-club.jpg"
                alt="Country Club by InterContinental Thanh Xuan Valley Resort"
                width={400}
                height={300}
                className="sidebar-image"
              />
            </div>
            
            <p className="sidebar-description">
              Clubhouse quy mô nhất Việt Nam với diện tích 1,7ha, hơn 60 tiện ích dịch vụ đẳng cấp, 
              được quản lý vận hành bởi đội ngũ InterContinental Thanh Xuan Valley Resort
            </p>
            
            <button className="explore-button">
              Khám phá ngay →
            </button>
          </div>
        </div>

        {/* Right Map Area */}
        <div className="map-extension-main">
          <div className="map-container">
            <Image
              src="/images/valley-map.jpg"
              alt="Bản đồ Thanh Xuan Valley Resort"
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
              
              <div className="map-label resort" data-label="InterContinental Thanh Xuan Valley Resort">
                <span className="label-text">InterContinental Thanh Xuan Valley Resort</span>
              </div>
              
              <div className="map-label valley-park" data-label="Valley Park">
                <span className="label-text">Valley Park</span>
              </div>
              
              <div className="map-label treewalk" data-label="Treewalk">
                <span className="label-text">Treewalk</span>
              </div>
              
              <div className="map-label country-club" data-label="Country Club by InterContinental Thanh Xuan Valley Resort">
                <span className="label-text">Country Club by InterContinental Thanh Xuan Valley Resort</span>
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
      </div>
    </section>
  );
}

