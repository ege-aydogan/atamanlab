'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex items-center justify-center aspect-[4/3] bg-surface-container-low rounded-xl">
        <Icon name="image" className="text-6xl text-on-surface-variant/30" />
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnail strip */}
      <div className="flex flex-col gap-2 shrink-0">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
              idx === selectedIndex ? 'border-secondary' : 'border-transparent'
            }`}
            aria-label={`${productName} görsel ${idx + 1}`}
          >
            <Image
              src={src}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden bg-surface-container-low">
        <Image
          src={images[selectedIndex]}
          alt={productName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          priority
        />
      </div>
    </div>
  );
}

export { ImageGallery };
export type { ImageGalleryProps };
