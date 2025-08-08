import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import AutoplayVideo from './AutoplayVideo';

// Image URLs
const img1 = 'https://pleviacity.com.vn/demo/1.png';
const img2 = 'https://pleviacity.com.vn/demo/2.png';
const img3 = 'https://pleviacity.com.vn/demo/3.png';
const img4 = 'https://pleviacity.com.vn/demo/4.png';
const img6 = 'https://pleviacity.com.vn/demo/5.png';
const img7 = 'https://pleviacity.com.vn/demo/6.png';
const img8 = 'https://pleviacity.com.vn/demo/7.png';
const img9 = 'https://pleviacity.com.vn/demo/8.png';
const img10 = 'https://pleviacity.com.vn/demo/9.png';
const img11 = 'https://pleviacity.com.vn/demo/10.png';
const img12 = 'https://pleviacity.com.vn/demo/11.png';

// Video URLs
const video1 = 'https://pleviacity.com.vn/demo/1.mp4';
const video2 = 'https://pleviacity.com.vn/demo/2.mp4';
const video3 = 'https://pleviacity.com.vn/demo/3.mp4';
const video4 = 'https://pleviacity.com.vn/demo/4.mp4';
const video6 = 'https://pleviacity.com.vn/demo/5.mp4';
const video7 = 'https://pleviacity.com.vn/demo/6.mp4';
const video8 = 'https://pleviacity.com.vn/demo/7.mp4';
const video9 = 'https://pleviacity.com.vn/demo/8.mp4';
const video10 = 'https://pleviacity.com.vn/demo/9.mp4';
const video11 = 'https://pleviacity.com.vn/demo/10.mp4';
const video12 = 'https://pleviacity.com.vn/demo/11.mp4';
import TouchOverlay from './TouchOverlay';

const IoTPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeVideo, setActiveVideo] = useState(null);

  // Mouse movement tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Video management functions
  const handleVideoPlay = sectionId => {
    console.log('Video play callback:', sectionId);
    setActiveVideo(sectionId);
  };

  const handleVideoPause = sectionId => {
    console.log('Video pause callback:', sectionId);
    if (activeVideo === sectionId) {
      setActiveVideo(null);
    }
  };

  // Debug: Log imported videos
  console.log('Available videos:', {
    video1,
    video2,
    video3,
    video4,
    video6,
    video7,
    video8,
    video9,
    video10,
  });

  const iotSections = [
    {
      id: 10,
      title: 'An ninh đỉnh cao - Giá trị vượt thời gian',
      description:
        'Dự án đô thị thông minh với an ninh đỉnh cao qua hệ thống AI giám sát 24/7, camera nhận diện, cảnh báo tự động, kết hợp công nghệ IoT hiện đại tạo nên giá trị vượt thời gian cho cộng đồng cư dân thời đại số.',
      image: img11,
      video: video11,
      gradient: 'from-teal-500 to-green-600',
    },
    {
      id: 9,
      title: 'Thành phố tương lai - Kết nối vạn vật',
      description:
        'Tầm nhìn về một đô thị thông minh toàn diện - nơi AI không chỉ quản lý từng căn nhà mà còn kết nối toàn bộ hệ sinh thái. Từ drone giao hàng tự động đến robot dịch vụ cộng đồng, ứng dụng quản lý tài chính cá nhân đến hệ thống giao thông thông minh - tất cả hòa quyện tạo nên cuộc sống tiện nghi, an toàn và bền vững.',
      image: img10,
      video: video10,
      gradient: 'from-pink-500 to-red-600',
    },
    {
      id: 8,
      title: 'Cổng vào thông minh - Kiểm soát an ninh tự động 24/7',
      description:
        'Hệ thống AI Alert Station với khả năng nhận diện đa sinh trắc học, từ khuôn mặt đến giọng nói. Cư dân được chào đón cá nhân hóa, khách mời được xác thực nhanh chóng, tạo nên trải nghiệm ra vào thuận tiện nhưng an toàn tuyệt đối.',
      image: img9,
      video: video9,
      gradient: 'from-teal-500 to-green-600',
    },
    {
      id: 1,
      title: 'Không gian sống thông minh - Kết nối mọi trải nghiệm',
      description:
        'Chào mừng đến với tương lai của cuộc sống đô thị - nơi AI không chỉ là công nghệ mà còn là người bạn đồng hành. Hệ thống điều khiển giọng nói, mỗi căn nhà là một hệ sinh thái thông minh được cá nhân hóa theo nhu cầu của gia chủ.',
      image: img1,
      video: video1, // No video available for this section
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      id: 2,
      title: 'Hệ sinh thái đô thị thông minh',
      description:
        'Khu phố được trang bị hệ thống AI tích hợp quản lý rác thải thông minh, tối ưu hóa việc phân loại và thu gom. Màn hình tương tác cộng đồng cung cấp thông tin real-time về chất lượng không khí, giao thông và các dịch vụ tiện ích xung quanh.',
      image: img2,
      video: video2, // No video available for this section
      gradient: 'from-green-500 to-teal-600',
    },
    {
      id: 3,
      title: 'Thời tiết thông minh - Dự báo cá nhân hóa',
      description:
        'Hệ thống AI phân tích dữ liệu thời tiết kết hợp với lịch trình cá nhân để đưa ra khuyến nghị tối ưu. Từ việc nhắc nhở mang ô khi trời mưa đến điều chỉnh tự động hệ thống làm mát trong nhà, mọi thứ đều được dự đoán và chuẩn bị sẵn sàng.',
      image: img3,
      video: video3,
      gradient: 'from-orange-500 to-red-600',
    },
    {
      id: 4,
      title: 'IoT - Internet of Things',
      description:
        'Hệ thống IoT kết nối mọi thiết bị trong nhà, từ đèn chiếu sáng, điều hòa, đến các thiết bị gia dụng. Mọi thứ đều có thể được điều khiển từ xa qua ứng dụng di động, mang lại sự tiện lợi và tiết kiệm năng lượng.',
      image: img4,
      video: video4,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 5,
      title: 'Đỗ xe thông minh - Tối ưu không gian',
      description:
        'AI quản lý đỗ xe với khả năng nhận diện biển số, hướng dẫn tìm chỗ trống và thanh toán tự động. Hệ thống dự đoán nhu cầu đỗ xe theo thời gian thực, tối ưu hóa việc sử dụng không gian và giảm thiểu thời gian tìm kiếm.',
      image: img6,
      video: video6,
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      id: 6,
      title: 'AI hỗ trợ an ninh 24/7',
      description:
        'AI Absolute Security phát hiện ngã, nhận diện đám đông và cảnh báo cháy. Mỗi camera là trạm AI độc lập, phân tích thời gian thực và phản ứng trong 30 giây.',
      image: img7,
      video: video7,
      gradient: 'from-red-500 to-orange-600',
    },
    {
      id: 7,
      title: 'Phân tích hành vi - An ninh thông minh',
      description:
        'AI phân tích hành vi để phát hiện sớm các hoạt động bất thường, từ đó đảm bảo an ninh tuyệt đối cho cư dân. Hệ thống học hỏi liên tục, cập nhật thuật toán để thích ứng với các mối đe dọa mới. (cầm hung khí, bạo lực)',
      image: img8,
      video: video8,
      gradient: 'from-indigo-500 to-purple-600',
    },
    {
      id: 11,
      title: 'Thẻ cư dân - Thanh toán thông minh',
      description:
        'Thẻ cư dân tích hợp ví điện tử cho phép thanh toán nhanh chóng tại các cửa hàng. Tích lũy điểm thưởng, nhận ưu đãi độc quyền và trải nghiệm mua sắm thuận tiện chỉ với một chạm.',
      image: img12,
      video: video12,
      gradient: 'from-red-500 to-orange-600',
    },
  ];

  // Animation variants for enhanced effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      <TouchOverlay />
      {/* IoT Sections */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {iotSections.map((section, index) => (
            <motion.section
              key={section.id}
              className={`min-h-screen flex items-center relative overflow-hidden ${
                index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'
              }`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: 'spring',
                stiffness: 50,
                damping: 20,
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Enhanced Background with Multiple Layers */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-10`}
                animate={{
                  opacity: [0.1, 0.15, 0.1],
                  background: [
                    `linear-gradient(135deg, ${section.gradient
                      .replace('from-', '')
                      .replace('to-', ', ')})`,
                    `linear-gradient(225deg, ${section.gradient
                      .replace('from-', '')
                      .replace('to-', ', ')})`,
                    `linear-gradient(135deg, ${section.gradient
                      .replace('from-', '')
                      .replace('to-', ', ')})`,
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Animated Mesh Gradient Overlay */}
              <motion.div
                className="absolute inset-0 opacity-5"
                style={{
                  background: `radial-gradient(circle at ${50 + mousePosition.x}% ${
                    50 + mousePosition.y
                  }%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                }}
              />

              <div className="container mx-auto px-4 py-20">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}
                >
                  {/* Content Side */}
                  <motion.div
                    className={`space-y-6 ${
                      index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'
                    }`}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2
                      className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-white"
                      initial={{ y: 30, opacity: 0, scale: 0.9 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.4,
                        type: 'spring',
                        stiffness: 100,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                      }}
                    >
                      {section.title}
                    </motion.h2>

                    <motion.p
                      className="text-lg md:text-xl text-gray-300 leading-relaxed"
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {section.description.split(' ').map((word, wordIndex) => (
                        <motion.span
                          key={wordIndex}
                          className="inline-block mr-1"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.6 + wordIndex * 0.03,
                          }}
                          viewport={{ once: true }}
                        >
                          {word}
                        </motion.span>
                      ))}
                    </motion.p>
                  </motion.div>

                  {/* Image Side */}
                  <motion.div
                    className={`relative ${index % 2 === 0 ? '' : 'lg:col-start-1'}`}
                    initial={{
                      x: index % 2 === 0 ? 100 : -100,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 50 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="relative group perspective-1000"
                      whileHover={{
                        scale: 1.05,
                        z: 50,
                      }}
                    >
                      {/* Enhanced Glow Effect */}
                      <motion.div
                        className={`absolute -inset-2 bg-gradient-to-r ${section.gradient} rounded-2xl blur-xl opacity-20`}
                        animate={{
                          opacity: [0.2, 0.4, 0.6, 0.4, 0.2],
                          scale: [1, 1.05, 1.1, 1.05, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <div className="relative transform-gpu">
                        {section.video ? (
                          <AutoplayVideo
                            src={section.video}
                            poster={section.image}
                            alt={section.title}
                            sectionId={section.id}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                          />
                        ) : (
                          <motion.img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-[250px] lg:h-[500px] object-cover rounded-2xl shadow-2xl"
                            whileHover={{
                              filter: 'brightness(1.1) contrast(1.1)',
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default IoTPage;
