'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto-play when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Autoplay prevented:', error);
        // If autoplay is blocked, we'll let the user click to play
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3; // Set to 30% volume
        if (!isPlaying) {
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <audio
        ref={audioRef}
        loop
        onPlay={handlePlay}
        onPause={handlePause}
      >
        {/* Placeholder - will use actual worship music */}
        <source src="/music/background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMute}
        className="bg-white/90 hover:bg-white backdrop-blur-sm p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 border-blue-100"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-600" />
        ) : (
          <Volume2 className="w-6 h-6 text-blue-600" />
        )}
      </button>
    </div>
  );
}
