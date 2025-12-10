'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Play, X, ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { PortfolioItem } from '@/data/portfolio';

interface VerticalVideoGalleryProps {
  items: PortfolioItem[];
}

function VideoCard({ item, onClick }: { item: PortfolioItem; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovering]);

  const isVideo = item.type === 'video' && /\.(mp4|webm|mov|m4v)$/i.test(item.src);
  const thumbnailSrc = item.thumbnail || item.src;

  return (
    <div
      className="group relative aspect-[9/16] rounded-2xl cursor-pointer overflow-hidden bg-gray-900"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* 動画/画像 */}
      {isVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <Image
          src={thumbnailSrc}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      )}

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* 再生ボタン */}
      {!isHovering && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
            <Play className="w-6 h-6 text-gray-900 ml-1" />
          </div>
        </div>
      )}

      {/* テキスト */}
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
        {item.tags && (
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-white/80">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function VideoModal({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalItems,
}: {
  item: PortfolioItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const isVideo = item.type === 'video' && /\.(mp4|webm|mov|m4v)$/i.test(item.src);

  useEffect(() => {
    if (videoRef.current && isVideo) {
      videoRef.current.play().catch(() => {});
    }
  }, [item, isVideo]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === ' ') {
      e.preventDefault();
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <button
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition"
        onClick={onClose}
      >
        <X className="w-8 h-8" />
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div
        className="relative max-h-[90vh] aspect-[9/16] rounded-2xl overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              className="w-full h-full object-cover"
              loop
              playsInline
              autoPlay
              onClick={togglePlay}
            />
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-gray-900 ml-1" />
                </div>
              </div>
            )}
          </>
        ) : (
          <Image
            src={item.thumbnail || item.src}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 50vw"
            priority
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
          {item.description && (
            <p className="text-white/80 text-sm mb-3">{item.description}</p>
          )}
          {item.tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 rounded-full text-xs text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {item.affiliateProduct && (
            <div
              className="p-3 bg-gradient-to-r from-purple-500/30 to-pink-500/30 backdrop-blur-sm rounded-lg border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs text-white/70 mb-1">おすすめ商品</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white flex-1 line-clamp-1">
                  {item.affiliateProduct}
                </p>
                {item.affiliateLink && (
                  <a
                    href={item.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 font-semibold ml-2 transition"
                  >
                    詳細
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {currentIndex + 1} / {totalItems}
      </div>
    </div>
  );
}

export default function VerticalVideoGallery({ items }: VerticalVideoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <VideoCard
            key={item.id}
            item={item}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <VideoModal
          item={items[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={selectedIndex}
          totalItems={items.length}
        />
      )}
    </>
  );
}
