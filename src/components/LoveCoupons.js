import React, { useState } from 'react';
import { Ticket, CheckCircle2, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

const INITIAL_COUPONS = [
  {
    id: 1,
    title: "👑 Queen For A Weekend",
    tagline: "VIP Royal Treatment",
    desc: "Valid for 48 hours of 100% pampering, zero disagreements, and whatever Khushi says goes!",
    emoji: "👑",
    redeemed: false
  },
  {
    id: 2,
    title: "🍨 Midnight Ice Cream Run",
    tagline: "Sweet Tooth Rescue",
    desc: "Redeemable at any hour of the night for your favorite dessert, pastry, or ice cream tub.",
    emoji: "🍧",
    redeemed: false
  },
  {
    id: 3,
    title: "🫂 Emergency Warm Tight Hug",
    tagline: "Anytime, Anywhere",
    desc: "Guarantees a silent, warm 10-minute bear hug with gentle back pats until you feel calm and safe.",
    emoji: "💖",
    redeemed: false
  },
  {
    id: 4,
    title: "💆‍♀️ Relaxation Head Massage",
    tagline: "Stress Relief Pass",
    desc: "A soothing head and shoulder massage with scented oils and your favorite relaxing songs.",
    emoji: "✨",
    redeemed: false
  },
  {
    id: 5,
    title: "🍕 Dinner of Your Choice",
    tagline: "Feast on Demand",
    desc: "No 'what should we eat' debates! I will cook or take you anywhere you point your finger.",
    emoji: "🍝",
    redeemed: false
  },
  {
    id: 6,
    title: "🏆 'You Are Right' Golden Pass",
    tagline: "Instant Victory Token",
    desc: "Show this coupon to instantly win any lighthearted debate and receive an unconditional apology.",
    emoji: "🌟",
    redeemed: false
  }
];

export default function LoveCoupons() {
  const [coupons, setCoupons] = useState(INITIAL_COUPONS);

  const handleRedeem = (id) => {
    audioEngine.playGateOpenChime();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ffd700', '#ff4d6d', '#ffffff']
    });

    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '10px' }}>
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
            <Gift size={28} color="#ffd700" style={{ filter: 'drop-shadow(0 0 10px #ffd700)' }} />
          </div>
          <p className="font-royal text-gold-gradient" style={{ letterSpacing: '3px', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '6px' }}>
            Exclusive Perks For Khushi
          </p>
          <h2 className="font-decorative text-gold-gradient" style={{ fontSize: '2.2rem', margin: 0 }}>
            Redeemable Love Tokens
          </h2>
          <p className="font-serif" style={{ color: '#ffccd5', fontSize: '1.1rem', marginTop: '8px' }}>
            "No expiry date, unlimited validity, strictly non-refundable with eternal love."
          </p>
        </div>

        {/* Coupons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {coupons.map((c) => (
            <div
              key={c.id}
              className="glass-card-interactive"
              style={{
                position: 'relative',
                background: c.redeemed
                  ? 'linear-gradient(135deg, rgba(40, 20, 60, 0.6) 0%, rgba(20, 5, 30, 0.7) 100%)'
                  : 'linear-gradient(135deg, rgba(50, 18, 75, 0.75) 0%, rgba(25, 8, 40, 0.85) 100%)',
                border: c.redeemed ? '1.5px solid rgba(100, 200, 100, 0.5)' : '1.5px solid rgba(255, 215, 0, 0.45)',
                borderRadius: '16px',
                padding: '24px 20px',
                overflow: 'hidden'
              }}
            >
              {/* Ticket Notches */}
              <div style={{ position: 'absolute', top: '50%', left: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: '#0a0314', transform: 'translateY(-50%)' }} />
              <div style={{ position: 'absolute', top: '50%', right: '-10px', width: '20px', height: '20px', borderRadius: '50%', background: '#0a0314', transform: 'translateY(-50%)' }} />

              {/* Tagline Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'Cinzel',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: c.redeemed ? 'rgba(46, 125, 50, 0.3)' : 'rgba(212, 175, 55, 0.2)',
                    color: c.redeemed ? '#81c784' : '#ffd700',
                    border: c.redeemed ? '1px solid #4caf50' : '1px solid rgba(212, 175, 55, 0.4)'
                  }}
                >
                  {c.tagline}
                </span>
                <span style={{ fontSize: '1.4rem' }}>{c.emoji}</span>
              </div>

              {/* Title & Desc */}
              <h3 style={{ fontFamily: 'Cinzel', fontSize: '1.15rem', color: '#fff', margin: '0 0 8px 0' }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: 'Outfit', fontSize: '0.9rem', color: '#e0d0e8', lineHeight: 1.5, margin: '0 0 18px 0' }}>
                {c.desc}
              </p>

              {/* Redeem Button */}
              {c.redeemed ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    borderRadius: '30px',
                    background: 'rgba(46, 125, 50, 0.25)',
                    color: '#81c784',
                    fontFamily: 'Cinzel',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    border: '1px solid rgba(129, 199, 132, 0.4)'
                  }}
                >
                  <CheckCircle2 size={16} />
                  <span>SEALED & HONORED ❤️</span>
                </div>
              ) : (
                <button
                  onClick={() => handleRedeem(c.id)}
                  className="btn-gold-primary"
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    fontSize: '0.9rem',
                    borderRadius: '30px'
                  }}
                >
                  <Ticket size={16} />
                  <span>Redeem This Coupon</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
