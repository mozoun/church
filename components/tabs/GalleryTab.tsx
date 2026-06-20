'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// For now, we'll use the images from the public/images folder
// Later, these can be loaded from Supabase
const galleryImages = [
  {
    id: 1,
    src: '/images/WhatsApp Image 2026-06-04 at 4.50.37 PM.jpeg',
    title: 'Church Community',
    description: 'Our vibrant church family gathering together',
  },
  {
    id: 2,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.24 AM.jpeg',
    title: 'Baptism Ceremony',
    description: 'Celebrating new believers in Christ',
  },
  {
    id: 3,
    src: '/images/WhatsApp Image 2026-06-04 at 4.50.44 PM.jpeg',
    title: 'Recognition Service',
    description: 'Honoring faithful servants',
  },
  {
    id: 4,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.27 AM.jpeg',
    title: 'Worship Service',
    description: 'Praising God together',
  },
  {
    id: 5,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.25 AM.jpeg',
    title: 'Youth Ministry',
    description: 'Empowering the next generation',
  },
  {
    id: 6,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.25 AM (1).jpeg',
    title: 'Fellowship',
    description: 'Building relationships in Christ',
  },
  {
    id: 7,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.26 AM.jpeg',
    title: 'Community Gathering',
    description: 'United in faith and love',
  },
  {
    id: 8,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.26 AM (1).jpeg',
    title: 'Special Event',
    description: 'Celebrating God\'s goodness',
  },
  {
    id: 9,
    src: '/images/WhatsApp Image 2026-06-08 at 1.48.26 AM (2).jpeg',
    title: 'Ministry Outreach',
    description: 'Serving our community with love',
  },
];

export default function GalleryTab() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const showPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const showNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevious();
        if (e.key === 'ArrowRight') showNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Photo Gallery</h2>
      <p className="text-gray-600 mb-8">Moments from our church community</p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={showPrevious}
            className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-4">
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">
              {galleryImages[selectedImage].title}
            </h3>
            <p className="text-gray-300">
              {galleryImages[selectedImage].description}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {selectedImage + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
