'use client';

import { useState, useEffect } from 'react';
import GalleryLightbox from '@/components/GalleryLightbox';
import FadeIn from '@/components/animations/FadeIn';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string | null;
}

export default function GalleryTab() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery images');
        const data = await response.json();
        setGalleryImages(data || []);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const formattedImages = galleryImages.map(img => ({
    id: img.id,
    url: img.imageUrl,
    caption: img.description ? `${img.title} - ${img.description}` : img.title,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <FadeIn>
        <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
          Photo Gallery
        </h2>
        <p className="mb-8" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
          Moments from our church community
        </p>
      </FadeIn>

      {/* Gallery Grid */}
      {galleryImages.length === 0 ? (
        <div className="text-center py-12">
          <p style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
            No photos have been added yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <FadeIn key={image.id} delay={index * 0.05} direction="up">
              <div
                onClick={() => openLightbox(index)}
                className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-bold text-xl mb-1" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-purple-100" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
                {/* Hover indicator */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

      {/* New Lightbox */}
      <GalleryLightbox
        images={formattedImages}
        currentIndex={selectedImage || 0}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />

      {/* Bible Verse */}
      <FadeIn delay={0.5}>
        <div className="mt-12 bg-gradient-to-br from-amber-50 to-purple-50 rounded-2xl p-6 border-2 border-amber-200/50 shadow-lg">
          <div className="text-center">
            <p className="text-lg italic mb-2" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#7C3AED'}}>
              &ldquo;Every good and perfect gift is from above, coming down from the Father of the heavenly lights.&rdquo;
            </p>
            <p className="text-sm font-semibold" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#A16207'}}>
              — JAMES 1:17
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
