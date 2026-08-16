import React, { useState } from 'react';
import { Heart, ShieldCheck, Infinity as InfinityIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

const VOWS = [
  "To always prioritize your happiness and peace above all else.",
  "To listen with empathy before speaking, and comfort you when you're overwhelmed.",
  "To celebrate your wins, wipe your tears, and never let you feel alone.",
  "To cherish and honor you as my wife and life partner through every season of life."
];

export default function ForeverPromise() {
  const [holdingProgress, setHoldingProgress] = useState(0);
  const [isPromised, setIsPromised] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startHold = () => {
    if (isPromised) return;
    audioEngine.playHeartbeat();
    const id = setInterval(() => {
      setHoldingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(id);
          setIsPromised(true);
          audioEngine.playGateOpenChime();
          confetti({
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ff4d6d', '#ffffff', '#ffccd5']
          });
          return 100;
        }
        return prev + 4;
      });
    }, 50);
    setIntervalId(id);
  };

  const endHold = () => {
    if (isPromised) return;
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setHoldingProgress(0);
  };

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
            <InfinityIcon size={32} color="#ffd700" style={{ filter: 'drop-shadow(0 0 10px #ffd700)' }} />
          </div>
          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            The Eternal Vow
          </p>
          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>
            My Promises to My Fiancée
          </h2>
          <p className="font-serif" style={{ color: '#ffccd5', fontSize: '1.1rem', marginTop: '8px' }}>
            "Written in stone, sealed by heart, and honored forever."
          </p>
        </div>

        {/* Vows List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '30px' }}>
          {VOWS.map((vow, i) => (
            <div
              key={i}
              className="glass-card-interactive"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '16px 20px',
                background: 'rgba(38, 12, 58, 0.65)',
                border: '1px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '14px'
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffd700, #aa7c11)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#1a0826',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  fontSize: '0.9rem'
                }}
              >
                {i + 1}
              </div>
              <p style={{ margin: 0, fontFamily: 'Playfair Display', fontSize: '1.05rem', color: '#fff', lineHeight: 1.5 }}>
                {vow}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Pinky Promise / Hold Hands Seal */}
        <div style={{ textAlign: 'center', background: 'rgba(20, 5, 30, 0.7)', borderRadius: '20px', padding: '30px 20px', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
          {!isPromised ? (
            <div>
              <p className="font-royal" style={{ color: '#ffd700', fontSize: '1rem', marginBottom: '12px' }}>
                Touch & Hold To Seal Our Pinky Promise:
              </p>

              <button
                onMouseDown={startHold}
                onMouseUp={endHold}
                onTouchStart={startHold}
                onTouchEnd={endHold}
                className="btn-gold-primary animate-pulse-glow"
                style={{
                  padding: '20px 45px',
                  fontSize: '1.2rem',
                  borderRadius: '50px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Hold Progress Fill */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${holdingProgress}%`,
                    background: 'rgba(255, 77, 109, 0.85)',
                    transition: 'width 0.05s linear',
                    zIndex: 1
                  }}
                />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Heart size={22} fill="#1a0826" />
                  <span>{holdingProgress > 0 ? `Sealing... ${holdingProgress}%` : 'Hold to Promise Forever'}</span>
                </div>
              </button>
              <p style={{ color: '#aaa', fontSize: '0.8rem', marginTop: '10px', fontFamily: 'Outfit' }}>
                (Hold down button for 2 seconds)
              </p>
            </div>
          ) : (
            <div className="animate-pulse-glow" style={{ padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <ShieldCheck size={50} color="#ffd700" style={{ filter: 'drop-shadow(0 0 15px #ffd700)' }} />
              </div>
              <h3 className="font-decorative text-gold-gradient" style={{ fontSize: '1.8rem', margin: '0 0 8px 0' }}>
                Sealed In The Stars Forever
              </h3>
              <p className="font-serif" style={{ fontSize: '1.2rem', color: '#ffccd5', margin: 0 }}>
                "Soban & Khushi — A bond that will never break, no matter what."
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
