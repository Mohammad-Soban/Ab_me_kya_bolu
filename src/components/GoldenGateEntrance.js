import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';
import { Heart, Sparkles, Crown, Smile } from 'lucide-react';

export default function GoldenGateEntrance({ onGateOpened }) {
  const [isOpening, setIsOpening] = useState(false);
  const [madAttemptCount, setMadAttemptCount] = useState(0);
  const [showMadModal, setShowMadModal] = useState(false);
  const [madModalMessage, setMadModalMessage] = useState('');
  const [stillMadBtnPos, setStillMadBtnPos] = useState({ x: 0, y: 0 });

  const cuteMadMessages = [
    "Wait, my dearest Khushi! Can I offer 1,000 warm hugs and infinite forehead kisses first? 🥺",
    "What if I promise to get your absolute favorite snacks & dessert whenever you crave them? 🍰",
    "Look at how much I adore you! You look too breathtaking when you smile to stay mad at me 💖",
    "My heart is literally incomplete without your laughter... please give your boy one chance? 🌹",
    "I vow to listen more, hold you tighter, and be the best husband-to-be in the world! 💍",
    "No matter what, I will never stop trying to make you smile every single day. I love you! ✨"
  ];

  const handleForgive = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio effects
    audioEngine.playGateOpenChime();
    audioEngine.startBackgroundMusic();

    // Golden & Rose Confetti bursts
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#ffd700', '#ff4d6d', '#ffffff', '#ffb3c1']
    });
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6, x: 0.8 },
        colors: ['#ffd700', '#f3cf7a', '#ff758f', '#ffffff']
      });
    }, 400);

    // After gate swing finishes, notify parent to reveal sanctuary
    setTimeout(() => {
      if (onGateOpened) onGateOpened();
    }, 2800);
  };

  const handleStillMad = () => {
    audioEngine.playPop();
    const nextCount = madAttemptCount + 1;
    setMadAttemptCount(nextCount);
    setMadModalMessage(cuteMadMessages[(nextCount - 1) % cuteMadMessages.length]);
    setShowMadModal(true);

    // Playfully shift button slightly
    const randomX = (Math.random() - 0.5) * 120;
    const randomY = (Math.random() - 0.5) * 40;
    setStillMadBtnPos({ x: randomX, y: randomY });
  };

  return (
    <div className="gate-perspective-container">
      {/* Ambient background glow */}
      <div className="sanctuary-light-burst active" style={{ opacity: isOpening ? 1 : 0.25 }} />

      {/* LEFT GOLDEN GATE WING */}
      <div className={`gate-wing gate-wing-left ${isOpening ? 'gate-open' : ''}`}>
        <div className="gate-mesh">
          {/* Ornate Golden Baroque Filigree (SVG) */}
          <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 500 1000" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <linearGradient id="goldGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff2a3" />
                <stop offset="40%" stopColor="#ffd700" />
                <stop offset="80%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
              <filter id="goldGlowL" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Vertical Golden Bars */}
            {[60, 120, 180, 240, 300, 360, 420, 470].map((x) => (
              <g key={`bar-${x}`}>
                <line x1={x} y1="30" x2={x} y2="970" stroke="url(#goldGradL)" strokeWidth="4" filter="url(#goldGlowL)" />
                {/* Decorative Spearhead finials */}
                <polygon points={`${x},15 ${x-8},35 ${x+8},35`} fill="url(#goldGradL)" />
                <polygon points={`${x},985 ${x-8},965 ${x+8},965`} fill="url(#goldGradL)" />
              </g>
            ))}

            {/* Arched Top Golden Rail */}
            <path d="M 30,120 Q 250,20 480,120" fill="none" stroke="url(#goldGradL)" strokeWidth="10" />
            <path d="M 30,160 Q 250,60 480,160" fill="none" stroke="url(#goldGradL)" strokeWidth="6" />

            {/* Baroque Scrollwork & Swirls */}
            <path d="M 480,140 C 350,140 300,280 220,280 C 140,280 100,190 60,190" fill="none" stroke="url(#goldGradL)" strokeWidth="6" />
            <path d="M 480,450 C 320,450 300,320 200,320 C 100,320 80,420 50,420" fill="none" stroke="url(#goldGradL)" strokeWidth="5" />
            <path d="M 480,550 C 320,550 300,680 200,680 C 100,680 80,580 50,580" fill="none" stroke="url(#goldGradL)" strokeWidth="5" />
            <path d="M 480,850 C 350,850 300,720 220,720 C 140,720 100,810 60,810" fill="none" stroke="url(#goldGradL)" strokeWidth="6" />

            {/* Bottom Rail */}
            <path d="M 30,880 L 480,880" fill="none" stroke="url(#goldGradL)" strokeWidth="8" />
            <path d="M 30,940 L 480,940" fill="none" stroke="url(#goldGradL)" strokeWidth="10" />

            {/* Center Filigree Medallion half */}
            <circle cx="480" cy="500" r="110" fill="none" stroke="url(#goldGradL)" strokeWidth="8" />
            <circle cx="480" cy="500" r="85" fill="rgba(35, 12, 55, 0.6)" stroke="url(#goldGradL)" strokeWidth="4" />
          </svg>

          {/* Golden Lantern on Left Wall */}
          <div style={{ position: 'absolute', top: '15%', left: '20px', zIndex: 12 }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#fff3b0', boxShadow: '0 0 30px 15px rgba(255, 215, 0, 0.8)'
            }} />
          </div>
        </div>
      </div>

      {/* RIGHT GOLDEN GATE WING */}
      <div className={`gate-wing gate-wing-right ${isOpening ? 'gate-open' : ''}`}>
        <div className="gate-mesh">
          {/* Ornate Golden Baroque Filigree (SVG) */}
          <svg className="w-full h-full" width="100%" height="100%" viewBox="0 0 500 1000" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              <linearGradient id="goldGradR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fff2a3" />
                <stop offset="40%" stopColor="#ffd700" />
                <stop offset="80%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
              <filter id="goldGlowR" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Vertical Golden Bars */}
            {[30, 80, 140, 200, 260, 320, 380, 440].map((x) => (
              <g key={`bar-r-${x}`}>
                <line x1={x} y1="30" x2={x} y2="970" stroke="url(#goldGradR)" strokeWidth="4" filter="url(#goldGlowR)" />
                <polygon points={`${x},15 ${x-8},35 ${x+8},35`} fill="url(#goldGradR)" />
                <polygon points={`${x},985 ${x-8},965 ${x+8},965`} fill="url(#goldGradR)" />
              </g>
            ))}

            {/* Arched Top Golden Rail */}
            <path d="M 20,120 Q 250,20 470,120" fill="none" stroke="url(#goldGradR)" strokeWidth="10" />
            <path d="M 20,160 Q 250,60 470,160" fill="none" stroke="url(#goldGradR)" strokeWidth="6" />

            {/* Baroque Scrollwork & Swirls */}
            <path d="M 20,140 C 150,140 200,280 280,280 C 360,280 400,190 440,190" fill="none" stroke="url(#goldGradR)" strokeWidth="6" />
            <path d="M 20,450 C 180,450 200,320 300,320 C 400,320 420,420 450,420" fill="none" stroke="url(#goldGradR)" strokeWidth="5" />
            <path d="M 20,550 C 180,550 200,680 300,680 C 400,680 420,580 450,580" fill="none" stroke="url(#goldGradR)" strokeWidth="5" />
            <path d="M 20,850 C 150,850 200,720 280,720 C 360,720 400,810 440,810" fill="none" stroke="url(#goldGradR)" strokeWidth="6" />

            {/* Bottom Rail */}
            <path d="M 20,880 L 470,880" fill="none" stroke="url(#goldGradR)" strokeWidth="8" />
            <path d="M 20,940 L 470,940" fill="none" stroke="url(#goldGradR)" strokeWidth="10" />

            {/* Center Filigree Medallion half */}
            <circle cx="20" cy="500" r="110" fill="none" stroke="url(#goldGradR)" strokeWidth="8" />
            <circle cx="20" cy="500" r="85" fill="rgba(35, 12, 55, 0.6)" stroke="url(#goldGradR)" strokeWidth="4" />
          </svg>

          {/* Golden Lantern on Right Wall */}
          <div style={{ position: 'absolute', top: '15%', right: '20px', zIndex: 12 }}>
            <div style={{
              width: '16px', height: '16px', borderRadius: '50%',
              background: '#fff3b0', boxShadow: '0 0 30px 15px rgba(255, 215, 0, 0.8)'
            }} />
          </div>
        </div>
      </div>

      {/* CENTER GOLDEN LOCK & ROYAL INVITATION CARD */}
      <div className={`gate-central-lock ${isOpening ? 'unlocked' : ''}`}>
        <div
          className="glass-card animate-pulse-glow"
          style={{
            maxWidth: '520px',
            width: '90vw',
            padding: '36px 28px',
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(30, 8, 45, 0.92) 0%, rgba(15, 4, 25, 0.95) 100%)',
            border: '2px solid rgba(255, 215, 0, 0.75)',
            boxShadow: '0 0 50px rgba(212, 175, 55, 0.5), inset 0 0 30px rgba(255, 215, 0, 0.15)',
            position: 'relative'
          }}
        >
          {/* Royal Crown Crest */}
          <div className="flex justify-center items-center mb-3" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <Crown size={32} color="#ffd700" style={{ filter: 'drop-shadow(0 0 10px #ffd700)' }} />
          </div>

          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '8px' }}>
            Royal Sanctuary of Love
          </p>

          <h1 className="font-decorative text-gold-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px', lineHeight: 1.2 }}>
            Dearest Khushi
          </h1>

          <div className="filigree-divider">
            <Heart size={18} fill="#ff4d6d" color="#ff4d6d" />
          </div>

          <p className="font-serif" style={{ fontSize: '1.15rem', color: '#ffe5ec', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>
            "My world loses all its colors when you are upset with me.
            I made a mistake, and I am truly, deeply sorry from the bottom of my heart.
            Will you turn the key and open the gates of your heart?"
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
            <button
              onClick={handleForgive}
              disabled={isOpening}
              className="btn-gold-primary"
              style={{
                width: '100%',
                maxWidth: '320px',
                fontSize: '1.15rem',
                padding: '16px 28px'
              }}
            >
              <Sparkles size={22} />
              <span>I Forgive You</span>
              <Heart size={20} fill="#1a0826" color="#1a0826" />
            </button>

            <button
              onClick={handleStillMad}
              className="btn-outline-gold"
              style={{
                transform: `translate(${stillMadBtnPos.x}px, ${stillMadBtnPos.y}px)`,
                transition: 'transform 0.2s ease',
                fontSize: '0.95rem',
                padding: '10px 20px',
                opacity: 0.85
              }}
            >
              <Smile size={18} />
              <span>Still a bit mad 😤</span>
            </button>
          </div>

          {/* Golden Corner Accents */}
          <div style={{ position: 'absolute', top: 8, left: 8, width: 24, height: 24, borderTop: '2px solid #ffd700', borderLeft: '2px solid #ffd700' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, width: 24, height: 24, borderTop: '2px solid #ffd700', borderRight: '2px solid #ffd700' }} />
          <div style={{ position: 'absolute', bottom: 8, left: 8, width: 24, height: 24, borderBottom: '2px solid #ffd700', borderLeft: '2px solid #ffd700' }} />
          <div style={{ position: 'absolute', bottom: 8, right: 8, width: 24, height: 24, borderBottom: '2px solid #ffd700', borderRight: '2px solid #ffd700' }} />
        </div>
      </div>

      {/* SWEET / CHEEKY APOLOGY MODAL */}
      {showMadModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(10, 2, 20, 0.8)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '20px'
          }}
        >
          <div
            className="glass-card animate-float"
            style={{
              maxWidth: '460px',
              width: '100%',
              padding: '32px 24px',
              textAlign: 'center',
              border: '2px solid #ff758f',
              boxShadow: '0 0 40px rgba(255, 77, 109, 0.4)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Heart size={44} color="#ff4d6d" fill="#ff4d6d" style={{ filter: 'drop-shadow(0 0 15px #ff4d6d)' }} />
            </div>

            <h3 className="font-decorative text-rose-gradient" style={{ fontSize: '1.6rem', marginBottom: '14px' }}>
              Khushi, Please Wait!
            </h3>

            <p className="font-serif" style={{ fontSize: '1.2rem', color: '#fff', lineHeight: 1.6, marginBottom: '24px' }}>
              {madModalMessage}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowMadModal(false);
                  handleForgive();
                }}
                className="btn-gold-primary"
                style={{ width: '100%', fontSize: '1.05rem' }}
              >
                <Sparkles size={20} />
                <span>Okay fine, I forgive you! 💕</span>
              </button>

              <button
                onClick={() => setShowMadModal(false)}
                className="btn-outline-gold"
                style={{ width: '100%', fontSize: '0.9rem', borderColor: '#ff758f', color: '#ffb3c1' }}
              >
                Let me think for 2 seconds...
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
