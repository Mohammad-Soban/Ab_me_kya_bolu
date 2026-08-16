import React, { useState } from 'react';
import { Flame, Moon } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

const PRESET_WISHES = [
  "Endless laughter, gentle patience, and zero more misunderstandings.",
  "May our love grow deeper, calmer, and more magical each day.",
  "A lifetime of late-night conversations and being each other's safest home.",
  "To always choose each other, forgive quickly, and hold each other tight.",
  "For Khushi's eyes to only shine with tears of pure joy."
];

export default function SkyLanterns() {
  const [lanterns, setLanterns] = useState([]);
  const [customWish, setCustomWish] = useState('');


  const handleReleaseLantern = (wishText) => {
    const textToRelease = wishText || customWish || PRESET_WISHES[0];
    if (!textToRelease.trim()) return;

    audioEngine.playSparkle();

    const newLantern = {
      id: Date.now() + Math.random(),
      text: textToRelease,
      startX: Math.random() * 60 + 20, // 20% to 80% screen width
      speed: Math.random() * 8 + 12, // 12-20s float time
      size: Math.random() * 20 + 70,
      glowColor: Math.random() > 0.3 ? '#ff9e00' : '#ff5400'
    };

    setLanterns((prev) => [...prev, newLantern]);
    setCustomWish('');

    // Remove lantern after float animation ends
    setTimeout(() => {
      setLanterns((prev) => prev.filter((l) => l.id !== newLantern.id));
    }, (newLantern.speed + 1) * 1000);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '10px', position: 'relative' }}>
      {/* FLOATING LANTERNS OVERLAY */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 4, overflow: 'hidden' }}>
        {lanterns.map((l) => (
          <div
            key={l.id}
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: `${l.startX}vw`,
              animation: `riseLantern ${l.speed}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: `${l.size}px`
            }}
          >
            {/* Lantern Shape & Glow */}
            <div
              style={{
                width: '100%',
                height: `${l.size * 1.3}px`,
                background: 'radial-gradient(ellipse at 50% 60%, #fff3b0 0%, #ffaa00 50%, #d00000 100%)',
                borderRadius: '24px 24px 12px 12px',
                boxShadow: `0 0 40px 15px ${l.glowColor}, inset 0 0 20px #fff`,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 235, 150, 0.8)'
              }}
            >
              {/* Flame core */}
              <div
                style={{
                  width: '16px',
                  height: '24px',
                  background: '#ffffff',
                  borderRadius: '50% 50% 20% 20%',
                  boxShadow: '0 0 20px 8px #ffd000',
                  animation: 'pulseGlow 1s infinite alternate'
                }}
              />
            </div>
            {/* Lantern Wish Label */}
            <div
              style={{
                marginTop: '8px',
                background: 'rgba(20, 5, 30, 0.85)',
                border: '1px solid rgba(255, 215, 0, 0.4)',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.75rem',
                color: '#fff',
                fontFamily: 'Playfair Display',
                textAlign: 'center',
                maxWidth: '160px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {l.text}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes riseLantern {
          0% {
            transform: translateY(0) scale(0.9) rotate(0deg);
            opacity: 0.95;
          }
          50% {
            transform: translateY(-55vh) scale(0.85) rotate(3deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-115vh) scale(0.65) rotate(-2deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* LANTERN RELEASE CONTROLS */}
      <div
        className="glass-card"
        style={{
          padding: '40px 30px',
          border: '1px solid rgba(255, 215, 0, 0.4)',
          background: 'linear-gradient(145deg, rgba(28, 9, 42, 0.9) 0%, rgba(16, 4, 25, 0.95) 100%)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
            <Moon size={28} color="#ffd700" style={{ filter: 'drop-shadow(0 0 10px #ffd700)' }} />
          </div>
          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            Celestial Wishes & Vows
          </p>
          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>
            Sky Lanterns of Peace & Love
          </h2>
          <p className="font-serif" style={{ color: '#ffccd5', fontSize: '1.1rem', marginTop: '8px' }}>
            "Ignite a warm lantern with our prayer and watch it carry our love into the heavens."
          </p>
        </div>

        {/* Preset Wishes Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {PRESET_WISHES.map((wish, idx) => (
            <div
              key={idx}
              onClick={() => handleReleaseLantern(wish)}
              className="glass-card-interactive"
              style={{
                background: 'rgba(40, 14, 60, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '14px',
                padding: '16px 20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '15px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>🏮</span>
                <p style={{ color: '#fff', fontSize: '1rem', margin: 0, fontFamily: 'Playfair Display' }}>
                  "{wish}"
                </p>
              </div>
              <button
                className="btn-outline-gold"
                style={{ fontSize: '0.8rem', padding: '8px 16px', flexShrink: 0 }}
              >
                <Flame size={15} color="#ffd700" />
                <span>Light & Release</span>
              </button>
            </div>
          ))}
        </div>

        {/* Custom Wish Input */}
        <div style={{ background: 'rgba(20, 5, 30, 0.7)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
          <label style={{ display: 'block', color: '#ffd700', fontFamily: 'Cinzel', fontSize: '0.9rem', marginBottom: '10px' }}>
            Write Your Own Wish for Our Future:
          </label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="e.g. Always holding hands through every storm..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customWish.trim()) {
                  handleReleaseLantern(customWish);
                }
              }}
              style={{
                flex: '1 1 280px',
                background: 'rgba(45, 15, 65, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                borderRadius: '30px',
                padding: '12px 20px',
                color: '#fff',
                fontFamily: 'Outfit',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => handleReleaseLantern(customWish)}
              disabled={!customWish.trim()}
              className="btn-gold-primary"
              style={{ padding: '12px 26px', fontSize: '0.95rem' }}
            >
              <Flame size={18} />
              <span>Release into Sky</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
