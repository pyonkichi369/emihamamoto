'use client';

import { useState } from 'react';
import MediaCard from './MediaCard';
import Modal from './Modal';
import { PortfolioItem } from '@/data/portfolio';

interface GalleryProps {
  items: PortfolioItem[];
}

export default function Gallery({ items }: GalleryProps) {
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <MediaCard
            key={item.id}
            item={item}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <Modal
        item={selectedIndex !== null ? items[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
