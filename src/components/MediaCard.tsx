'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { PortfolioItem } from '@/data/portfolio';

interface MediaCardProps {
  item: PortfolioItem;
  onClick: () => void;
}

export default function MediaCard({ item, onClick }: MediaCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
    >
      {item.type === 'image' ? (
        <Image
          src={item.src}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <>
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <video
              src={item.src}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              muted
              playsInline
            />
          )}
          <div className="absolute right-3 top-3">
            <div className="flex items-center justify-center w-10 h-10 bg-black/70 backdrop-blur-sm rounded-full">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
          </div>
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-white font-bold text-lg mb-2">{item.title}</div>
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-white/90 text-xs bg-white/20 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
