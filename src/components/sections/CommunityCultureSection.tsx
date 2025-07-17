
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getCommunityCultureSectionData } from '@/lib/firestoreService';
import type { CommunityCultureSectionData, CultureImageItem } from '@/types/landingPageAdmin';
import { defaultCommunityCultureSectionData } from '@/types/landingPageAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import DynamicLucideIcon from '@/components/shared/DynamicLucideIcon';
import SmartVideoPlayer from '@/components/shared/SmartVideoPlayer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';


const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const featureCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 }
  })
};

const sliderVariants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

type MediaItem =
  | { type: 'image'; data: CultureImageItem }
  | { type: 'video'; data: { videoUrl: string; id: string } };

export default function CommunityCultureSection() {
  const [cultureData, setCultureData] = useState<CommunityCultureSectionData>(defaultCommunityCultureSectionData);
  const [isLoading, setIsLoading] = useState(true);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [[page, direction], setPage] = useState([0, 0]); // page is currentIndex

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await getCommunityCultureSectionData();
        const loadedData = data || defaultCommunityCultureSectionData;
        setCultureData(loadedData);

        const items: MediaItem[] = [];
        if (loadedData.videoUrl) {
          items.push({ type: 'video', data: { videoUrl: loadedData.videoUrl, id: 'video-main' } });
        }
        const gallery = loadedData.gallery && loadedData.gallery.length > 0 ? loadedData.gallery : defaultCommunityCultureSectionData.gallery;
        gallery.forEach(img => {
          if (img.imageUrl) { // Only add images with a URL
            items.push({ type: 'image', data: img });
          }
        });
        setMediaItems(items);

      } catch (error) {
        console.error("Error loading community culture data:", error);
        setCultureData(defaultCommunityCultureSectionData);
        const items: MediaItem[] = [];
        if (defaultCommunityCultureSectionData.videoUrl) {
          items.push({ type: 'video', data: { videoUrl: defaultCommunityCultureSectionData.videoUrl, id: 'video-main-default' } });
        }
        defaultCommunityCultureSectionData.gallery.forEach(img => {
          if (img.imageUrl) {
            items.push({ type: 'image', data: img });
          }
        });
        setMediaItems(items);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const paginate = (newDirection: number) => {
    setPage(([prevPage, _]) => {
      let nextPage = prevPage + newDirection;
      if (nextPage < 0) {
        nextPage = mediaItems.length - 1;
      } else if (nextPage >= mediaItems.length) {
        nextPage = 0;
      }
      return [nextPage, newDirection];
    });
  };

  const goToSlide = (slideIndex: number) => {
    const newDirection = slideIndex > page ? 1 : -1;
    setPage([slideIndex, newDirection]);
  };


  if (isLoading) {
    return (
      <section id="community-culture" className="py-16 sm:py-24 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start mb-12 lg:mb-20">
            <div>
              <Skeleton className="h-8 w-2/3 mb-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <Skeleton className="h-20 w-full rounded-lg mb-6" />
            </div>
            <Skeleton className="aspect-video w-full rounded-lg" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg">
                <Skeleton className="w-12 h-12 rounded-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const { mainText, quote, quoteAuthor, features } = cultureData;
  const displayFeatures = features && features.length > 0 ? features : defaultCommunityCultureSectionData.features;
  const currentMediaItem = mediaItems[page];

  return (
    <section id="community-culture" className="py-16 sm:py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Văn Hóa <span className="text-primary">Cộng Đồng</span> Sôi Nổi & Sáng Tạo
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Khám phá một môi trường làm việc thân thiện, đầy cảm hứng, nơi sự hợp tác, đổi mới và phát triển cá nhân được đặt lên hàng đầu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-start mb-12 lg:mb-20">
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-headline text-2xl lg:text-3xl font-semibold text-foreground mb-6">Không Gian Của Sự Sáng Tạo và Kết Nối Bền Vững</h3>
            <p className="text-muted-foreground mb-4 leading-relaxed text-base lg:text-lg">
              {mainText || defaultCommunityCultureSectionData.mainText}
            </p>
            {(quote || defaultCommunityCultureSectionData.quote) && (
              <blockquote className="border-l-4 border-primary pl-6 py-3 italic text-muted-foreground my-8 bg-card/50 rounded-r-lg">
                <p className="mb-2 text-base lg:text-lg">&ldquo;{quote || defaultCommunityCultureSectionData.quote}&rdquo;</p>
                <cite className="font-semibold text-foreground not-italic">- {quoteAuthor || defaultCommunityCultureSectionData.quoteAuthor}</cite>
              </blockquote>
            )}
          </motion.div>

          {/* Right Column: Media Slider */}
          {mediaItems.length > 0 ? (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl bg-black">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30, duration: 0.5 },
                    opacity: { duration: 0.3 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  {currentMediaItem.type === 'video' && (
                    <SmartVideoPlayer
                      src={currentMediaItem.data.videoUrl}
                      className="w-full h-full"
                      videoClassName="object-contain" // Ensure video fits within container
                      aspectRatio="auto" // Let SmartVideoPlayer's internal aspect take over or fill
                      controls={true}
                      fallbackMessage={<p className="text-white p-4 text-center">Không thể hiển thị video.</p>}
                    />
                  )}
                  {currentMediaItem.type === 'image' && (
                    <Image
                      src={currentMediaItem.data.imageUrl || 'https://placehold.co/800x450.png?text=No+Image'}
                      alt={currentMediaItem.data.description}
                      fill
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      className="object-cover"
                      data-ai-hint={currentMediaItem.data.description.toLowerCase().split(' ').slice(0, 2).join(' ') || "culture event"}
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/800x450.png?text=Error"; }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {mediaItems.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 -translate-y-1/2 left-2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    onClick={() => paginate(-1)}
                    aria-label="Ảnh hoặc video trước"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 -translate-y-1/2 right-2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full"
                    onClick={() => paginate(1)}
                    aria-label="Ảnh hoặc video kế tiếp"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {mediaItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-300",
                          page === index ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Chuyển đến mục ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Không có ảnh hoặc video để hiển thị.</p>
            </div>
          )}
        </div>

        {displayFeatures.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {displayFeatures.map((feature, i) => (
              <motion.div
                key={feature.id || i}
                custom={i}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <DynamicLucideIcon name={feature.icon} className="w-12 h-12 text-primary mb-4 object-contain" />
                <h4 className="font-headline text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


