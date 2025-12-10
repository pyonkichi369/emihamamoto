'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Users, Sparkles, Play, Instagram, X, ChevronLeft, ChevronRight, Volume2, VolumeX, ExternalLink, Loader2, Video, Camera } from 'lucide-react';
import { profile, portfolioItems, PortfolioItem, CategoryType } from '@/data/portfolio';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// TikTokアイコン（lucide-reactに含まれていないため）
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

const ITEMS_PER_PAGE = 4;

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

function VideoCard({
  item,
  onClick
}: {
  item: PortfolioItem;
  onClick: () => void;
}) {
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

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* サムネイル */}
      <div className="relative overflow-hidden rounded-xl mb-3 aspect-[9/16] bg-gray-900">
        {isVideo ? (
          <video
            ref={videoRef}
            src={item.src}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Image
            src={item.thumbnail || item.src}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        )}

        {/* Play overlay */}
        {!isHovering && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-80">
              <Play className="w-5 h-5 text-gray-900 ml-0.5" />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <Play className="w-12 h-12 text-white" fill="white" />
        </div>

        {item.tags && item.tags[0] && (
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-black text-xs px-2 py-1 rounded font-semibold">
              {item.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* ビデオ情報 */}
      <div>
        <h4 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-gray-600 transition">
          {item.title}
        </h4>
        {item.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
        )}
        {item.tags && (
          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {item.affiliateProduct && (
          <div className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
            <p className="text-xs text-gray-600 mb-0.5">おすすめ商品</p>
            <p className="text-xs font-semibold text-gray-800 line-clamp-1">
              {item.affiliateProduct}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<CategoryType>('works');
  const [displayedItems, setDisplayedItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const tabs: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'works', label: '制作物', icon: <Video className="w-4 h-4" /> },
    { id: 'model', label: 'モデル', icon: <Camera className="w-4 h-4" /> },
  ];

  // カテゴリでフィルタされたアイテム
  const filteredItems = portfolioItems.filter(item => item.category === activeTab);

  const skills = [
    '縦型動画制作',
    'TikTok',
    'Instagram Reels',
    'YouTube Shorts',
    'カラーグレーディング',
    'SNSコンテンツ',
  ];

  const experience = [
    {
      year: '2024 - 現在',
      title: 'フリーランス ビデオクリエイター',
      description: '縦型動画・ショートムービーを中心とした映像制作。企業・ブランドのSNSコンテンツ制作を担当。',
    },
    {
      year: '2023',
      title: '映像制作会社',
      description: 'プロモーション動画の企画・撮影・編集を経験。SNS向けコンテンツ制作のノウハウを習得。',
    },
    {
      year: '2022',
      title: 'クリエイティブ活動開始',
      description: 'TikTok、Instagram Reelsでの動画投稿を開始。独自のスタイルを確立。',
    },
  ];

  const specialty = '縦型動画 / ショートムービー制作';

  // タブ切り替え時にリセット
  useEffect(() => {
    const items = portfolioItems.filter(item => item.category === activeTab);
    setDisplayedItems(items.slice(0, ITEMS_PER_PAGE));
    setHasMore(items.length > ITEMS_PER_PAGE);
    setSelectedIndex(null);
  }, [activeTab]);

  // 追加ロード
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // ローディング演出のため少し遅延
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const nextItems = filteredItems.slice(currentLength, currentLength + ITEMS_PER_PAGE);

      setDisplayedItems(prev => [...prev, ...nextItems]);
      setHasMore(currentLength + ITEMS_PER_PAGE < filteredItems.length);
      setIsLoading(false);
    }, 500);
  }, [displayedItems.length, isLoading, hasMore, filteredItems]);

  // Intersection Observer で無限スクロール
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // モーダル用ナビゲーション
  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? displayedItems.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === displayedItems.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* メインコンテンツ */}
      <div className="pt-32 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* 左側: プロフィール */}
          <div className="lg:col-span-1">
            <div>
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl mb-6">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="text-sm text-gray-500 mb-2">Freelance</div>
              <h2 className="text-4xl font-bold mb-4">{profile.name}</h2>
              <div className="flex items-center gap-2 text-xl text-gray-600 mb-6">
                <Users className="w-5 h-5" />
                <span>Japan</span>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">スキル・得意分野</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700">専門: <strong>{specialty}</strong></span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                TikTok、Instagram Reels、YouTube Shortsなど、各プラットフォームに最適化した縦型動画を制作しています。
                ブランドの魅力を短い時間で効果的に伝えるショートムービーが得意です。
                企画から撮影、編集まで一貫して対応いたします。
              </p>

              {/* 経歴セクション */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">経歴</h3>
                <div className="space-y-4">
                  {experience.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100"
                    >
                      <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold mb-2">
                        {item.year}
                      </span>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={profile.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition w-full flex items-center justify-center gap-2"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
                <a
                  href={profile.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition w-full flex items-center justify-center gap-2"
                >
                  <TikTokIcon className="w-5 h-5" />
                  TikTok
                </a>
              </div>
            </div>
          </div>

          {/* 右側: ポートフォリオ一覧 */}
          <div className="lg:col-span-2">
            {/* タブ切り替え */}
            <div className="flex gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {displayedItems.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {displayedItems.map((item, index) => (
                    <VideoCard
                      key={item.id}
                      item={item}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
                </div>

                {/* ローディング / もっと読み込むトリガー */}
                <div ref={loadMoreRef} className="mt-8 flex justify-center">
                  {isLoading && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>読み込み中...</span>
                    </div>
                  )}
                  {!hasMore && displayedItems.length > 0 && (
                    <p className="text-gray-400 text-sm">すべての作品を表示しました</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">コンテンツがありません</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* モーダル */}
      {selectedIndex !== null && displayedItems[selectedIndex] && (
        <VideoModal
          item={displayedItems[selectedIndex]}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={selectedIndex}
          totalItems={displayedItems.length}
        />
      )}

      <Footer />
    </div>
  );
}
