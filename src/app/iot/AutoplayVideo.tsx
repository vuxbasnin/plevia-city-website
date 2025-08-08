import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AutoplayVideo = ({
  src,
  poster,
  alt,
  className = '',
  onPlay = () => {},
  onPause = () => {},
  sectionId,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    console.log('Setting up observer for video:', sectionId);
    console.log(`Attempting to play video ${sectionId}`);
    // Small delay to ensure video is ready
    setTimeout(() => {
      if (video && video.paused) {
        video
          .play()
          .then(() => {
            console.log(`Video ${sectionId} started playing`);
            setIsPlaying(true);
            setHasPlayedOnce(true);
            onPlay(sectionId);
          })
          .catch(error => {
            console.error(`Video ${sectionId} autoplay failed:`, error);
            // Try playing with a user interaction hint
            console.log('Video autoplay blocked, user interaction required');
          });
      }
    }, 500);
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    console.log(`Manual ${isPlaying ? 'pause' : 'play'} for video ${sectionId}`);

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      onPause(sectionId);
    } else {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
          onPlay(sectionId);
        })
        .catch(error => {
          console.error(`Manual video play failed for ${sectionId}:`, error);
        });
    }
  };

  return (
    <div ref={containerRef} className="relative group cursor-pointer">
      <motion.video
        ref={videoRef}
        className={`w-full h-[250px] lg:h-[500px] object-cover rounded-2xl shadow-2xl transition-all duration-300 ${className}`}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        onClick={handleVideoClick}
        onLoadedData={() => console.log(`Video ${sectionId} loaded`)}
        onCanPlay={() => console.log(`Video ${sectionId} can play`)}
        onError={e => console.error(`Video ${sectionId} error:`, e)}
        whileHover={{
          filter: 'brightness(1.1) contrast(1.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>

      {/* Play/Pause Overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </motion.div>
      </motion.div>

      {/* Autoplay failed message */}
      {isInView && !isPlaying && !hasPlayedOnce && (
        <motion.div
          className="absolute bottom-4 left-4 bg-yellow-500/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          Click to play
        </motion.div>
      )}
    </div>
  );
};

export default AutoplayVideo;
