import Link from 'next/link';
import Image from 'next/image';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/WhatsApp Image 2026-06-04 at 4.50.37 PM.jpeg"
          alt="Church Community"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-purple-900/30 to-blue-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Church Logo/Cross Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
            <div className="text-6xl text-white">✟</div>
          </div>
        </div>

        {/* Church Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Rivers of Living Waters
        </h1>
        <h2 className="text-3xl md:text-4xl font-light text-blue-100 mb-8">
          Ministry
        </h2>

        {/* Verse or Tagline */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light italic">
          &quot;Whoever believes in me, as Scripture has said, rivers of living water will flow from within them.&quot;
          <span className="block text-sm mt-2 text-blue-200">- John 7:38</span>
        </p>

        {/* Enter Button */}
        <Link
          href="/about"
          className="inline-block px-12 py-4 text-lg font-semibold text-blue-900 bg-white rounded-full hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-2xl"
        >
          Enter
        </Link>

        {/* Scroll Indicator */}
        <div className="mt-16 animate-bounce">
          <p className="text-white/60 text-sm">Welcome to our community</p>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  );
}
