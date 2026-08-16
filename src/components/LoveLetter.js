import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function LoveLetter() {
  const [isOpened, setIsOpened] = useState(false);
  const [typedLength, setTypedLength] = useState(0);
  const [isTypewriting, setIsTypewriting] = useState(true);

  const fullLetter = `My Dearest Khushi,

From the moment you agreed to hold my hand and embark on this beautiful journey to become my wife, my life found its true meaning. Seeing you upset with me breaks something deep inside my heart, because making you smile is my favorite thing in the entire universe.

I want to look you in the eyes and say: I am genuinely, deeply sorry. 

I know that words alone cannot instantly undo the hurt or frustration, but please know that my intentions are always rooted in love and devotion to you. You are not just my fiancée; you are my greatest blessing, my confidante, my best friend, and my future.

I promise to listen with more patience, to cherish your feelings above all else, to understand you even in moments of silence, and to hold your hand tighter whenever life gets challenging. 

No argument, no disagreement, and no mistake is bigger than what we have together. You are my forever, Khushi.

With all my love, devotion, and a million apologies,
Yours Forever & Always ❤️`;

  useEffect(() => {
    if (isOpened && isTypewriting) {
      if (typedLength < fullLetter.length) {
        const timeout = setTimeout(() => {
          setTypedLength((prev) => prev + 2);
          if (typedLength % 20 === 0) {
            audioEngine.playHeartbeat();
          }
        }, 18);
        return () => clearTimeout(timeout);
      }
    }
  }, [isOpened, typedLength, isTypewriting, fullLetter.length]);

  const handleBreakSeal = () => {
    audioEngine.playGateOpenChime();
    setIsOpened(true);
  };

  const handleSkipTyping = () => {
    setTypedLength(fullLetter.length);
    setIsTypewriting(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10px' }}>
      {!isOpened ? (
        // CLOSED WAX SEALED ENVELOPE / SCROLL
        <div
          onClick={handleBreakSeal}
          className="glass-card animate-float"
          style={{
            padding: '50px 30px',
            textAlign: 'center',
            cursor: 'pointer',
            border: '2px solid rgba(255, 215, 0, 0.6)',
            background: 'linear-gradient(135deg, rgba(35, 12, 55, 0.9) 0%, rgba(20, 5, 32, 0.95) 100%)',
            boxShadow: '0 20px 60px rgba(212, 175, 55, 0.3)',
            transition: 'all 0.4s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            {/* Wax Seal */}
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #ff4d6d 0%, #a00d33 70%, #590d22 100%)',
                boxShadow: '0 0 25px rgba(255, 77, 109, 0.6), inset 0 2px 6px rgba(255, 255, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid #ffccd5',
                position: 'relative'
              }}
            >
              <Heart size={42} color="#fff" fill="#fff" />
              <div style={{ position: 'absolute', bottom: '-8px', fontSize: '0.75rem', fontFamily: 'Cinzel', color: '#ffd700', fontWeight: 'bold' }}>
                K & S
              </div>
            </div>
          </div>

          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.95rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            Confidential & Personal
          </p>

          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', marginBottom: '14px' }}>
            A Letter for Khushi
          </h2>

          <p className="font-serif" style={{ fontSize: '1.15rem', color: '#ffccd5', fontStyle: 'italic', marginBottom: '25px' }}>
            "Click on the wax seal to unfold my heartfelt apology and promises."
          </p>

          <button className="btn-gold-primary" style={{ padding: '12px 30px', fontSize: '1rem' }}>
            <Feather size={18} />
            <span>Break Seal & Read</span>
          </button>
        </div>
      ) : (
        // OPENED LUXURY PARCHMENT LETTER
        <div
          className="glass-card"
          style={{
            padding: '50px 40px',
            background: 'linear-gradient(135deg, rgba(255, 248, 230, 0.96) 0%, rgba(255, 238, 204, 0.94) 100%)',
            border: '3px solid #d4af37',
            borderRadius: '16px',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), inset 0 0 60px rgba(212, 175, 55, 0.25)',
            color: '#2a1505',
            position: 'relative',
            animation: 'fadeIn 1s ease'
          }}
        >
          {/* Ornate Gold Border Corners */}
          <div style={{ position: 'absolute', top: 12, left: 12, width: 36, height: 36, borderTop: '3px solid #b8860b', borderLeft: '3px solid #b8860b' }} />
          <div style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderTop: '3px solid #b8860b', borderRight: '3px solid #b8860b' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, width: 36, height: 36, borderBottom: '3px solid #b8860b', borderLeft: '3px solid #b8860b' }} />
          <div style={{ position: 'absolute', bottom: 12, right: 12, width: 36, height: 36, borderBottom: '3px solid #b8860b', borderRight: '3px solid #b8860b' }} />

          {/* Letter Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Cinzel', letterSpacing: '3px', fontSize: '0.85rem', color: '#8c6d1f', textTransform: 'uppercase', marginBottom: '4px' }}>
              Written from the depth of my heart
            </p>
            <h2 style={{ fontFamily: 'Cinzel Decorative', fontSize: '2rem', color: '#4a2505', margin: 0 }}>
              To My Beloved Fiancée
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '12px 0' }}>
              <div style={{ height: '1px', width: '60px', background: '#b8860b' }} />
              <Heart size={16} fill="#c9184a" color="#c9184a" />
              <div style={{ height: '1px', width: '60px', background: '#b8860b' }} />
            </div>
          </div>

          {/* Letter Body with Typewriter / Handwritten feel */}
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.22rem',
              lineHeight: 1.85,
              whiteSpace: 'pre-line',
              color: '#381c08',
              minHeight: '260px',
              fontStyle: 'normal'
            }}
          >
            {fullLetter.substring(0, typedLength)}
            {typedLength < fullLetter.length && (
              <span style={{ display: 'inline-block', width: '2px', height: '1.2rem', background: '#c9184a', marginLeft: '2px', animation: 'blink 0.8s infinite' }}>|</span>
            )}
          </div>

          {/* Bottom Controls & Interaction */}
          <div style={{ marginTop: '35px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(184, 134, 11, 0.3)', paddingTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7a5214', fontSize: '0.95rem', fontFamily: 'Cinzel' }}>
              <Sparkles size={18} color="#b8860b" />
              <span>Soulmate Vow</span>
            </div>

            {typedLength < fullLetter.length && (
              <button
                onClick={handleSkipTyping}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8c2538',
                  fontSize: '0.9rem',
                  fontFamily: 'Outfit',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Reveal Entire Letter
              </button>
            )}

            <button
              onClick={() => {
                audioEngine.playSparkle();
                alert("You just sent a shower of love straight to Soban's heart! 💖");
              }}
              style={{
                background: 'linear-gradient(135deg, #c9184a 0%, #800f2f 100%)',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                fontFamily: 'Outfit',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(201, 24, 74, 0.4)'
              }}
            >
              <Heart size={16} fill="#fff" />
              <span>I Forgive You Completely ❤️</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
