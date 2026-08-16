import React, { useState } from 'react';
import { CloudRain, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

const CLOUDS = [
  { id: 1, label: "Anger & Grudges", note: "Dissolving anger into 10,000 gentle cuddles! 🫂" },
  { id: 2, label: "Silent Treatment", note: "Replacing silence with endless laughing memories! ✨" },
  { id: 3, label: "Doubts & Worries", note: "You are the only one in my eyes, forever and always! 💖" },
  { id: 4, label: "Sad Moments", note: "I promise to be your personal sunshine and peace! ☀️" },
  { id: 5, label: "Frustrations", note: "Turning every frown upside down into your cutest smile! 🌹" }
];

export default function AngerBuster() {
  const [poppedIds, setPoppedIds] = useState([]);

  const handlePop = (id) => {
    if (poppedIds.includes(id)) return;
    audioEngine.playPop();
    audioEngine.playSparkle();

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff85a1', '#ffd700']
    });

    const updated = [...poppedIds, id];
    setPoppedIds(updated);

    if (updated.length === CLOUDS.length) {
      setTimeout(() => {
        audioEngine.playGateOpenChime();
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#ffd700', '#ff4d6d', '#ffffff']
        });
      }, 300);
    }
  };

  const isAllCleared = poppedIds.length === CLOUDS.length;

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '10px' }}>
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
            <CloudRain size={28} color="#ff758f" style={{ filter: 'drop-shadow(0 0 10px #ff758f)' }} />
          </div>
          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            Mood Transformation
          </p>
          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>
            Pop Away Any Lingering Anger
          </h2>
          <p className="font-serif" style={{ color: '#ffccd5', fontSize: '1.1rem', marginTop: '8px' }}>
            "Click on the moody clouds to burst them into love notes and pure sunshine."
          </p>
        </div>

        {/* Progress Tracker */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <span style={{ fontFamily: 'Cinzel', color: '#ffd700', fontSize: '0.95rem' }}>
            Storm Clouds Cleared: {poppedIds.length} / {CLOUDS.length}
          </span>
          <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', margin: '8px auto', overflow: 'hidden' }}>
            <div
              style={{
                width: `${(poppedIds.length / CLOUDS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ff4d6d, #ffd700)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Cloud Bubbles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {CLOUDS.map((c) => {
            const isPopped = poppedIds.includes(c.id);
            return (
              <div
                key={c.id}
                onClick={() => handlePop(c.id)}
                className="glass-card-interactive"
                style={{
                  padding: '20px 16px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  cursor: isPopped ? 'default' : 'pointer',
                  background: isPopped
                    ? 'linear-gradient(135deg, rgba(255, 77, 109, 0.25) 0%, rgba(212, 175, 55, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(30, 10, 45, 0.75) 0%, rgba(15, 5, 25, 0.85) 100%)',
                  border: isPopped ? '1.5px solid #ff758f' : '1.5px solid rgba(255, 215, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  transform: isPopped ? 'scale(0.98)' : 'scale(1)'
                }}
              >
                {!isPopped ? (
                  <div>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }}>
                      ☁️
                    </div>
                    <h4 style={{ fontFamily: 'Cinzel', color: '#ffb3c1', fontSize: '1rem', margin: '0 0 6px 0' }}>
                      {c.label}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#aaa', margin: 0, fontFamily: 'Outfit' }}>
                      Tap to pop with love!
                    </p>
                  </div>
                ) : (
                  <div style={{ animation: 'fadeIn 0.5s ease' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '6px' }}>
                      💖
                    </div>
                    <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '0.95rem', color: '#fff', margin: 0, lineHeight: 1.5 }}>
                      {c.note}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Full Cleared Celebration Banner */}
        {isAllCleared && (
          <div
            className="animate-pulse-glow"
            style={{
              marginTop: '30px',
              padding: '24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.25) 0%, rgba(255, 77, 109, 0.25) 100%)',
              border: '2px solid #ffd700',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Sun size={28} color="#ffd700" />
              <h3 className="font-decorative text-gold-gradient" style={{ fontSize: '1.6rem', margin: 0 }}>
                Storm Clouds Cleared Completely!
              </h3>
              <Sun size={28} color="#ffd700" />
            </div>
            <p className="font-serif" style={{ fontSize: '1.15rem', color: '#fff', margin: 0 }}>
              "Only sunshine, endless affection, and smiles from this moment forward for my Khushi!"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
