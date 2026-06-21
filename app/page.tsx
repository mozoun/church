import Link from 'next/link';
import Image from 'next/image';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
      {/* Background Image with Spiritual Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/WhatsApp Image 2026-06-04 at 4.50.37 PM.jpeg"
          alt="Church Community"
          fill
          className="object-cover brightness-[0.35]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-violet-900/40 to-purple-950/60" />
        {/* Spiritual glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Church Logo/Cross Icon with Golden Glow */}
        <div className="mb-12 flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-400/20 to-purple-500/20 backdrop-blur-md flex items-center justify-center border-2 border-amber-300/30 shadow-2xl shadow-amber-500/20 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/10 to-transparent animate-pulse" />
            <div className="text-7xl text-amber-100 relative" style={{textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'}}>✟</div>
          </div>
        </div>

        {/* Church Name with Elegant Typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wide leading-tight" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'}}>
          Rivers of Living Waters
        </h1>
        <h2 className="text-3xl md:text-5xl font-light text-purple-200 mb-10" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', letterSpacing: '0.1em'}}>
          Ministry
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
          <div className="w-2 h-2 rounded-full bg-amber-400/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        {/* Verse with Beautiful Styling */}
        <p className="text-xl md:text-2xl text-purple-100 mb-3 max-w-3xl mx-auto italic leading-relaxed" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
          &quot;Whoever believes in me, as Scripture has said,<br className="hidden md:block" /> rivers of living water will flow from within them.&quot;
        </p>
        <p className="text-sm md:text-base text-amber-300 mb-12 font-medium tracking-wide">
          — JOHN 7:38
        </p>

        {/* Elegant Enter Button with Gold Accent */}
        <Link
          href="/about"
          className="group relative inline-block"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <div className="relative px-14 py-5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full text-white font-semibold text-lg tracking-wide shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-amber-500/50">
            Enter Our Community
          </div>
        </Link>

        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <p className="text-purple-300/80 text-sm tracking-widest uppercase">
            Welcome Home
          </p>
        </div>
      </div>

      {/* Music Player */}
      <MusicPlayer />
    </main>
  );
}
