import React, { useState, useEffect, useRef } from 'react';
import { Heart, Volume2, VolumeX, Share2, Cookie } from 'lucide-react';

function App() {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [cookieClicks, setCookieClicks] = useState(0);
  const [cookieRotation, setCookieRotation] = useState(0);
  const [showCrumbs, setShowCrumbs] = useState<Array<{ id: number; left: number; top: number }>>([]);
  const [fortuneMessage, setFortuneMessage] = useState<string | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);

  const fortunes = [
    "Our next shared adventure will create memories to cherish forever 🌟",
    "A small gesture of love today will spark extraordinary joy ✨",
    "The laughter we share together will light up someone else's day 💫",
    "Trust your heart's whispers - they're leading you to deeper connection 💕",
    "A moment of vulnerability will strengthen your bond immensely 🤍",
    "Your love inspires others to believe in magic and possibility ✨",
    "bitch.",
    "An unexpected act of kindness will remind you why you fell in love 💝",
    "The challenges you overcome together make your love story unique 🌈",
    "A shared dream will soon become your beautiful reality 🌠",
    "Your patience and understanding will unlock new levels of intimacy 💫",
    "The little moments you share today will become tomorrow's treasures 💖",
    "Your love has the power to turn ordinary days into adventures ⭐",
    "A simple 'I love you' will mean more than ever today 💕",
    "The way you support each other's dreams makes your love extraordinary ✨",
    "Your love story is teaching others about the beauty of genuine connection 💫",
    "Today is the perfect day for a date. 💐"
  ];

  useEffect(() => {
    const startDate = new Date('2024-12-02T00:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      
      const years = Math.floor(days / 365);
      const months = Math.floor((days % 365) / 30);
      
      setTime({
        years,
        months,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio('https://audio.jukehost.co.uk/nA86pQoTN0tzqLj55izxUhIFBHyUkskY');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    
    setIsMuted(!isMuted);
    if (isMuted) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
        setIsMuted(true);
      });
    } else {
      audioRef.current.pause();
    }
  };

  const handleCookieClick = () => {
    // Increment click counter
    setCookieClicks(prev => prev + 1);
    
    // Rotate cookie
    setCookieRotation(prev => prev + 360);
    
    // Create crumb particles
    const newCrumbs = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 40 - 20, // Random spread
      top: Math.random() * 40 - 20,  // Random spread
    }));
    setShowCrumbs(newCrumbs);
    
    // Show fortune message
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortuneMessage(randomFortune);
    
    // Clear crumbs and fortune after animation
    setTimeout(() => {
      setShowCrumbs([]);
      setFortuneMessage(null);
    }, 2000);
  };

  const shareCounter = async () => {
    try {
      const message = "Look at what my beautiful, smart, talented, humble girlfriend just made: ";
      const shareUrl = window.location.href;
      const shareText = `${message}${shareUrl}`;

      // Check if device is mobile (where Web Share API is most commonly supported)
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile && navigator.share) {
        try {
          await navigator.share({
            title: 'Anniversary Tracker',
            text: message,
            url: shareUrl,
          });
          setShowShareToast(true);
        } catch (shareError) {
          // If share fails, fallback to clipboard
          await navigator.clipboard.writeText(shareText);
          setShowShareToast(true);
        }
      } else {
        // On desktop or when share API is not available, use clipboard
        await navigator.clipboard.writeText(shareText);
        setShowShareToast(true);
      }

      // Hide the toast after 3 seconds
      setTimeout(() => {
        setShowShareToast(false);
      }, 3000);
    } catch (error) {
      console.error('Error sharing:', error);
      // More user-friendly error message
      alert('Unable to share at the moment. Please try copying the link manually.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-red-200 flex flex-col items-center justify-center px-4 font-pixel relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl text-red-600 mb-4 animate-pulse">
            Anniversary tracker!
          </h1>
          <h2 className="text-2xl md:text-3xl text-pink-700 mb-8">
            so we both don't forget lol
          </h2>
        </div>

        <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg border-4 border-pink-400 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Heart className="w-12 h-12 text-red-500 animate-beat" fill="currentColor" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {Object.entries(time).map(([unit, value]) => (
              <div key={unit} className="bg-pink-100 rounded-lg p-4 border-2 border-pink-300">
                <div className="text-3xl md:text-4xl text-red-500 font-bold">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-pink-700 capitalize">{unit}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={toggleSound}
            className="p-3 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors relative group"
            title={isMuted ? "Play Music" : "Mute Music"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6 text-white" />
            ) : (
              <Volume2 className="w-6 h-6 text-white" />
            )}
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {isMuted ? "Play Music" : "Mute Music"}
            </span>
          </button>
          <button
            onClick={shareCounter}
            className="p-3 bg-pink-500 rounded-full hover:bg-pink-600 transition-colors relative group"
            title="Share me!"
            aria-label="Share me!"
          >
            <Share2 className="w-6 h-6 text-white" />
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Share me!
            </span>
          </button>
          
          {/* Magic Cookie Button */}
          <div className="relative group">
            <button
              onClick={handleCookieClick}
              className="p-3 bg-amber-400 rounded-full hover:bg-amber-500 transition-colors transform hover:scale-110"
              style={{
                transform: `rotate(${cookieRotation}deg)`,
                transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
              }}
              title="Sweet Fortune Cookie"
              aria-label="Click to reveal your love fortune"
            >
              <Cookie className="w-6 h-6 text-amber-900" />
              {showCrumbs.map(crumb => (
                <span
                  key={crumb.id}
                  className="absolute w-1 h-1 bg-amber-600 rounded-full animate-crumb"
                  style={{
                    left: `${crumb.left}px`,
                    top: `${crumb.top}px`,
                  }}
                />
              ))}
            </button>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-pink-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ✨ Fortune Count: ({cookieClicks}) ✨
            </span>
            {fortuneMessage && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white text-pink-600 text-sm px-3 py-1 rounded-full shadow-lg animate-fortune whitespace-nowrap">
                {fortuneMessage}
              </div>
            )}
          </div>
        </div>

        {/* Share Success Toast */}
        {showShareToast && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-toast">
            {navigator.share ? "Shared successfully!" : "Copied to clipboard!"}
          </div>
        )}

        <footer className="text-center mt-12 text-pink-700 text-xl">
          Love you forever - P <span className="inline-block">❤</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
