import React, { useState } from 'react';
import { Sparkles, Heart, Plus, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

const AVAILABLE_FLOWERS = [
  { id: 'rose_red', name: 'Crimson Velvet Rose', symbol: '🌹', meaning: 'Deep Eternal Love & Passion', color: '#ff1493' },
  { id: 'rose_pink', name: 'Blush Pink Peony', symbol: '🌸', meaning: 'Gentleness, Grace & Apology', color: '#ff85a1' },
  { id: 'lily_gold', name: 'Golden Royal Lily', symbol: '✨', meaning: 'Devotion & Prosperity', color: '#ffd700' },
  { id: 'orchid_white', name: 'Pure White Orchid', symbol: '💮', meaning: 'Sincerity & Pure Intentions', color: '#ffffff' },
  { id: 'tulip_purple', name: 'Mystic Purple Tulip', symbol: '🌷', meaning: 'Unconditional Forgiveness', color: '#b5179e' },
  { id: 'sunflower', name: 'Radiant Sunflower', symbol: '🌻', meaning: 'Joy, Warmth & Your Bright Smile', color: '#ffb703' }
];

export default function VirtualBouquet() {
  const [selectedFlowers, setSelectedFlowers] = useState([
    AVAILABLE_FLOWERS[0],
    AVAILABLE_FLOWERS[1],
    AVAILABLE_FLOWERS[2]
  ]);
  const [ribbonColor, setRibbonColor] = useState('#ffd700');
  const [personalDedication] = useState('For Khushi, the most precious flower in the universe.');
  const [isAssembled, setIsAssembled] = useState(false);


  const addFlower = (flower) => {
    if (selectedFlowers.length >= 8) {
      alert("Your bouquet is full of love! You can assemble it now.");
      return;
    }
    audioEngine.playSparkle();
    setSelectedFlowers([...selectedFlowers, flower]);
  };

  const removeFlower = (index) => {
    audioEngine.playPop();
    const updated = [...selectedFlowers];
    updated.splice(index, 1);
    setSelectedFlowers(updated);
  };

  const handleAssemble = () => {
    audioEngine.playGateOpenChime();
    setIsAssembled(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ffd700', '#ff85a1', '#ffffff']
    });
  };

  const handleReset = () => {
    setIsAssembled(false);
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
          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            Handpicked Blooms For You
          </p>
          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>
            Bouquet of Sincere Love
          </h2>
          <p className="font-serif" style={{ color: '#ffccd5', fontSize: '1.1rem', marginTop: '8px' }}>
            "Each bloom carries a special reason why you mean everything to me."
          </p>
        </div>

        {!isAssembled ? (
          <div>
            {/* Flower Picker Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '24px' }}>
              {AVAILABLE_FLOWERS.map((f) => (
                <div
                  key={f.id}
                  onClick={() => addFlower(f)}
                  className="glass-card-interactive"
                  style={{
                    background: 'rgba(45, 15, 65, 0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '14px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <span style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}>{f.symbol}</span>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontFamily: 'Outfit' }}>{f.name}</h4>
                    <p style={{ color: '#f3cf7a', fontSize: '0.8rem', margin: '4px 0 0 0', fontFamily: 'Playfair Display' }}>{f.meaning}</p>
                  </div>
                  <Plus size={18} color="#ffd700" style={{ marginLeft: 'auto' }} />
                </div>
              ))}
            </div>

            {/* Currently Selected Stems */}
            <div style={{ background: 'rgba(20, 5, 30, 0.7)', borderRadius: '16px', padding: '20px', border: '1px dashed rgba(212, 175, 55, 0.5)', marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'Cinzel', color: '#ffd700', fontSize: '0.95rem' }}>
                  Bouquet Stems ({selectedFlowers.length}/8):
                </span>
                <span style={{ fontSize: '0.85rem', color: '#ffb3c1' }}>Tap flower to remove</span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', minHeight: '60px', alignItems: 'center' }}>
                {selectedFlowers.length === 0 ? (
                  <p style={{ color: '#aaa', fontSize: '0.9rem', fontStyle: 'italic' }}>Pick flowers from above to start creating...</p>
                ) : (
                  selectedFlowers.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => removeFlower(i)}
                      style={{
                        background: 'rgba(255, 77, 109, 0.2)',
                        border: '1px solid #ff758f',
                        borderRadius: '30px',
                        padding: '6px 14px',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        fontFamily: 'Outfit',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span>{f.symbol}</span>
                      <span>{f.name.split(' ')[0]}</span>
                      <span style={{ color: '#ff4d6d', fontWeight: 'bold' }}>×</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Satin Ribbon Picker */}
            <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Cinzel', color: '#f3cf7a', fontSize: '0.95rem' }}>Silk Ribbon Color:</span>
              {[
                { color: '#ffd700', label: 'Imperial Gold' },
                { color: '#ff4d6d', label: 'Crimson Passion' },
                { color: '#ffffff', label: 'Bridal Pearl' },
                { color: '#9d4edd', label: 'Royal Velvet' }
              ].map((r) => (
                <button
                  key={r.color}
                  onClick={() => {
                    audioEngine.playSparkle();
                    setRibbonColor(r.color);
                  }}
                  style={{
                    background: ribbonColor === r.color ? r.color : 'transparent',
                    color: ribbonColor === r.color ? (r.color === '#ffffff' || r.color === '#ffd700' ? '#111' : '#fff') : '#fff',
                    border: `1.5px solid ${r.color}`,
                    borderRadius: '20px',
                    padding: '6px 16px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontFamily: 'Outfit'
                  }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Assemble Action */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleAssemble}
                disabled={selectedFlowers.length === 0}
                className="btn-gold-primary"
                style={{ padding: '14px 40px', fontSize: '1.1rem' }}
              >
                <Sparkles size={20} />
                <span>Present Bouquet to Khushi</span>
                <Heart size={18} fill="#1a0826" />
              </button>
            </div>
          </div>
        ) : (
          // ASSEMBLED GLORIOUS BOUQUET PRESENTATION
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.8s ease' }}>
            <div
              className="animate-float"
              style={{
                position: 'relative',
                display: 'inline-block',
                padding: '40px 30px',
                background: 'radial-gradient(circle at center, rgba(255, 117, 143, 0.25) 0%, rgba(20, 5, 30, 0) 70%)',
                borderRadius: '50%'
              }}
            >
              {/* Fluttering Decorative Flowers */}
              <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '320px', gap: '8px', margin: '0 auto 20px auto' }}>
                {selectedFlowers.map((f, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '3.2rem',
                      display: 'inline-block',
                      transform: `rotate(${(i - selectedFlowers.length / 2) * 12}deg) translateY(${Math.abs(i - selectedFlowers.length / 2) * 5}px)`,
                      filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))',
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {f.symbol}
                  </span>
                ))}
              </div>

              {/* Silk Ribbon Bow */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', color: ribbonColor, fontSize: '1.4rem' }}>
                <span style={{ fontSize: '2rem' }}>🎀</span>
                <span style={{ fontFamily: 'Cinzel', fontSize: '1.1rem', fontWeight: 'bold' }}>Tied with Endless Devotion</span>
              </div>
            </div>

            {/* Ribbon & Card */}
            <div
              className="glass-card"
              style={{
                maxWidth: '520px',
                margin: '20px auto',
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(255, 248, 230, 0.95) 0%, rgba(255, 235, 200, 0.95) 100%)',
                color: '#2a1205',
                border: `2px solid ${ribbonColor}`,
                borderRadius: '16px'
              }}
            >
              <h3 style={{ fontFamily: 'Cinzel Decorative', fontSize: '1.4rem', color: '#590d22', margin: '0 0 8px 0' }}>
                My Personal Dedication
              </h3>
              <p style={{ fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '1.15rem', lineHeight: 1.6, margin: 0 }}>
                "{personalDedication}"
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.85rem', fontFamily: 'Outfit', color: '#7a4214' }}>
                🌸 Handcrafted with all my love for my dearest Khushi
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '20px' }}>
              <button
                onClick={handleReset}
                className="btn-outline-gold"
                style={{ fontSize: '0.9rem', padding: '10px 22px' }}
              >
                <RefreshCw size={16} />
                <span>Rearrange Bouquet</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
