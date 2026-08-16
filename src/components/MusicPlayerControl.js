import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function MusicPlayerControl() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check state periodically
    const interval = setInterval(() => {
      setIsPlaying(audioEngine.isPlaying);
      setIsMuted(audioEngine.isMuted);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    if (!audioEngine.isPlaying) {
      audioEngine.startBackgroundMusic();
      setIsPlaying(true);
    } else {
      const muted = audioEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className="glass-card"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 50,
        padding: '10px 18px',
        borderRadius: '30px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid rgba(255, 215, 0, 0.5)',
        background: 'rgba(25, 8, 38, 0.85)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease'
      }}
    >
      {/* Animated Sound Waves */}
      {isPlaying && !isMuted ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '16px' }}>
          {[0.6, 1, 0.4, 0.8].map((speed, i) => (
            <span
              key={i}
              style={{
                width: '3px',
                height: '100%',
                background: '#ffd700',
                borderRadius: '2px',
                animation: `soundWave ${speed}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </div>
      ) : (
        <Music size={18} color="#ffd700" />
      )}

      <span style={{ fontFamily: 'Outfit', fontSize: '0.85rem', color: '#fff' }}>
        {isPlaying && !isMuted ? 'Romantic Ambiance' : 'Play Music 🎵'}
      </span>

      {isMuted ? <VolumeX size={16} color="#ff758f" /> : <Volume2 size={16} color="#ffd700" />}

      <style>{`
        @keyframes soundWave {
          0% { height: 4px; }
          100% { height: 16px; }
        }
      `}</style>
    </div>
  );
}
