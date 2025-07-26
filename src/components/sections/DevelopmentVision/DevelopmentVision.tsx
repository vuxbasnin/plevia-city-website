import React from 'react';
import './DevelopmentVison.css';

const DevelopmentVision: React.FC = () => {
  return (
    <section className="development-vision">
      <div className="development-vision-container">
        {/* Title */}
        <h2 className="development-vision-title">
          TẦM NHÌN PHÁT TRIỂN PLEVIA CITY
        </h2>

        {/* Images Section */}
        <div className="development-vision-images">
          <div className="image-item">
            <div className="image-wrapper">
              <img 
                src="/images/development-vision/nature-boating.jpg" 
                alt="Nương vào thiên nhiên"
                className="vision-image"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }}
              />
              <div className="image-caption">
                <span>Nương vào thiên nhiên</span>
              </div>
            </div>
          </div>

          <div className="image-item">
            <div className="image-wrapper">
              <img 
                src="/images/development-vision/environment-friendly.jpg" 
                alt="Thân thiện với môi trường"
                className="vision-image"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }}
              />
              <div className="image-caption">
                <span>Thân thiện với môi trường</span>
              </div>
            </div>
          </div>

          <div className="image-item">
            <div className="image-wrapper">
              <img 
                src="/images/development-vision/health-care.jpg" 
                alt="Chăm sóc sức khỏe toàn diện"
                className="vision-image"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=450&fit=crop'; }}
              />
              <div className="image-caption">
                <span>Chăm sóc sức khỏe toàn diện</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="development-vision-description">
          <p>
            Plevia City là một không gian sống yên bình, tự nhiên và sang trọng, 
            được thiết kế để mang lại trải nghiệm sống hoàn hảo cho cư dân. 
            Với tầm nhìn phát triển bền vững, chúng tôi cam kết tạo ra một môi trường 
            sống hài hòa giữa con người và thiên nhiên.
          </p>
          <p>
            Dự án được xây dựng trên nền tảng của sự bền vững và đổi mới, 
            kết hợp giữa kiến trúc hiện đại và cảnh quan thiên nhiên tươi đẹp. 
            Mỗi chi tiết đều được chăm chút tỉ mỉ để đảm bảo chất lượng cuộc sống 
            tốt nhất cho cộng đồng cư dân.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentVision;
