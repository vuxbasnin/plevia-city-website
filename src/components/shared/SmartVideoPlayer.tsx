
"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface VideoSourceDetails {
  type: 'file' | 'youtube' | 'vimeo' | 'unknown';
  embedUrl?: string;
  fileType?: string;
}

export function getVideoPlayerDetails(src: string): VideoSourceDetails {
  if (!src) return { type: 'unknown' };

  // YouTube
  // Handles:
  // - https://www.youtube.com/watch?v=VIDEO_ID
  // - https://youtu.be/VIDEO_ID
  // - https://www.youtube.com/embed/VIDEO_ID
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = src.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  }

  // Vimeo
  // Handles:
  // - https://vimeo.com/VIDEO_ID
  // - https://player.vimeo.com/video/VIDEO_ID
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)?/;
  const vimeoMatch = src.match(vimeoRegex);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct video file or Blob URL
  if (src.startsWith('blob:') || src.match(/\.(mp4|webm|ogg)(\?.*)?$/i)) {
    const extensionMatch = src.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
    const extension = extensionMatch ? extensionMatch[1].toLowerCase() : null;
    let fileType = '';
    if (extension === 'mp4') fileType = 'video/mp4';
    else if (extension === 'webm') fileType = 'video/webm';
    else if (extension === 'ogg') fileType = 'video/ogg';
    
    // For blob URLs, fileType might not be inferable from extension if it's not standard.
    // The browser will attempt to determine it.
    return {
      type: 'file',
      embedUrl: src,
      fileType: fileType || undefined, // Pass undefined if not determined
    };
  }
  
  return { type: 'unknown', embedUrl: src };
}

interface SmartVideoPlayerProps {
  src: string;
  className?: string; 
  videoClassName?: string; 
  style?: React.CSSProperties;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto'; 
  fallbackMessage?: React.ReactNode;
  autoplay?: boolean; 
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  playsInline?: boolean;
}

const SmartVideoPlayer: React.FC<SmartVideoPlayerProps> = ({
  src,
  className,
  videoClassName,
  style,
  aspectRatio = '16/9',
  fallbackMessage = <p className="text-muted-foreground text-sm p-4 text-center">Không thể tải hoặc hiển thị video.</p>,
  autoplay = false,
  loop = false,
  muted = false,
  controls = true,
  playsInline = true,
}) => {
  const details = getVideoPlayerDetails(src);

  const aspectRatioClasses: Record<string, string> = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    'auto': '', // 'aspect-auto' might not always be desired; let natural size flow or parent define.
  };
  const aspectWrapperClass = aspectRatioClasses[aspectRatio] || aspectRatioClasses['16/9'];

  const basePlayerClasses = "absolute top-0 left-0 w-full h-full rounded-lg shadow-lg";
  const playerEffectiveClassName = cn(basePlayerClasses, videoClassName);

  const wrapperClasses = cn(
    'relative w-full overflow-hidden rounded-lg bg-black', // bg-black for letterboxing if needed
    aspectWrapperClass, 
    className
  );
  
  // If aspectRatio is 'auto', the wrapper shouldn't force an aspect ratio,
  // and the video/iframe itself will determine its dimensions or fit to parent.
  // However, for iframe, intrinsic size is hard without fixed dimensions.
  // For 'auto' with iframes, it might be better to not use absolute positioning for the player.
  // For simplicity, 'auto' will remove aspect ratio from wrapper, video/iframe will try to fill.
  const effectiveWrapperClasses = aspectRatio === 'auto' ? cn('relative w-full overflow-hidden rounded-lg bg-black', className) : wrapperClasses;


  if (details.type === 'file' && details.embedUrl) {
    return (
      <div className={effectiveWrapperClasses} style={style}>
        <video
          key={details.embedUrl} // Add key for re-renders if src changes
          src={details.embedUrl}
          className={playerEffectiveClassName}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted || autoplay} // Browsers often require muted for autoplay
          playsInline={playsInline} 
          {...(details.fileType && { type: details.fileType })}
        >
          {fallbackMessage}
        </video>
      </div>
    );
  }

  if (details.type === 'youtube' && details.embedUrl) {
    const finalEmbedUrl = `${details.embedUrl}${autoplay ? '?autoplay=1&mute=1' : ''}`;
    return (
      <div className={effectiveWrapperClasses} style={style}>
        <iframe
          key={finalEmbedUrl}
          src={finalEmbedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={playerEffectiveClassName}
        />
      </div>
    );
  }

  if (details.type === 'vimeo' && details.embedUrl) {
    const finalEmbedUrl = `${details.embedUrl}${autoplay ? '?autoplay=1&muted=1' : ''}`;
    return (
      <div className={effectiveWrapperClasses} style={style}>
        <iframe
          key={finalEmbedUrl}
          src={finalEmbedUrl}
          title="Vimeo video player"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className={playerEffectiveClassName}
        />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center w-full bg-muted rounded-lg', aspectWrapperClass, className)} style={style}>
      {fallbackMessage}
    </div>
  );
};

export default SmartVideoPlayer;
