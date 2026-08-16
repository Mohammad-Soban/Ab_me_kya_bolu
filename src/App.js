import React, { useState } from 'react';
import GoldenGateEntrance from './components/GoldenGateEntrance';
import RosePetalsCanvas from './components/RosePetalsCanvas';
import LoveLetter from './components/LoveLetter';
import VirtualBouquet from './components/VirtualBouquet';
import SkyLanterns from './components/SkyLanterns';
import LoveCoupons from './components/LoveCoupons';
import AngerBuster from './components/AngerBuster';
import ForeverPromise from './components/ForeverPromise';
import MusicPlayerControl from './components/MusicPlayerControl';
import { Heart, Scroll, Flower2, Moon, Ticket, CloudRain, Infinity as InfinityIcon } from 'lucide-react';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [gateOpened, setGateOpened] = useState(false);
  const [activeTab, setActiveTab] = useState('letter');

  const tabs = [
    { id: 'letter', label: 'Apology Letter', icon: Scroll, emoji: '📜' },
    { id: 'bouquet', label: 'Virtual Bouquet', icon: Flower2, emoji: '🌸' },
    { id: 'lanterns', label: 'Sky Lanterns', icon: Moon, emoji: '🏮' },
    { id: 'coupons', label: 'Love Coupons', icon: Ticket, emoji: '🎟️' },
    { id: 'anger', label: 'Anger Buster', icon: CloudRain, emoji: '☁️' },
    { id: 'promise', label: 'Forever Vow', icon: InfinityIcon, emoji: '💍' }
  ];

  const handleTabChange = (tabId) => {
    audioEngine.playSparkle();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark-1)', overflowX: 'hidden' }}>
      {/* Dynamic Falling Rose Petals & Twinkling Starlight Canvas */}
      <RosePetalsCanvas density={gateOpened ? 50 : 25} />

      {/* Floating Audio Controller */}
      <MusicPlayerControl />

      {!gateOpened ? (
        // STAGE 1: CLOSED ROYAL GOLDEN GATES WITH "I FORGIVE" ACTION
        <GoldenGateEntrance onGateOpened={() => setGateOpened(true)} />
      ) : (
        // STAGE 2: THE ENCHANTED SANCTUARY (REVEALED THROUGH GATES)
        <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', paddingBottom: '80px', animation: 'fadeIn 1.2s ease' }}>
          {/* Top Royal Sanctuary Header */}
          <header
            style={{
              padding: '24px 20px 14px 20px',
              textAlign: 'center',
              borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
              background: 'linear-gradient(180deg, rgba(30, 8, 45, 0.85) 0%, rgba(10, 3, 20, 0.4) 100%)',
              backdropFilter: 'blur(12px)'
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 18px', borderRadius: '30px', background: 'rgba(255, 77, 109, 0.15)', border: '1px solid rgba(255, 77, 109, 0.4)', marginBottom: '8px' }}>
              <Heart size={14} fill="#ff4d6d" color="#ff4d6d" />
              <span className="font-royal text-gold-gradient" style={{ fontSize: '0.85rem', letterSpacing: '2px' }}>
                Soban & Khushi
              </span>
              <Heart size={14} fill="#ff4d6d" color="#ff4d6d" />
            </div>

            <h1 className="font-decorative text-gold-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: '4px 0 6px 0' }}>
              Enchanted Sanctuary of Love
            </h1>

            <p className="font-serif" style={{ color: '#ffb3c1', fontSize: '1.05rem', margin: 0, fontStyle: 'italic' }}>
              "Thank you for forgiving me and holding my heart in your hands."
            </p>

            {/* Navigation Tabs Bar */}
            <nav
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '22px',
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              {tabs.map((t) => {
                const isActive = activeTab === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 18px',
                      borderRadius: '25px',
                      border: isActive ? '1.5px solid #ffd700' : '1px solid rgba(212, 175, 55, 0.3)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(255, 77, 109, 0.3) 100%)'
                        : 'rgba(30, 10, 45, 0.5)',
                      color: isActive ? '#fff' : '#e0d0e8',
                      fontFamily: 'Cinzel',
                      fontSize: '0.88rem',
                      fontWeight: isActive ? '700' : '500',
                      cursor: 'pointer',
                      boxShadow: isActive ? '0 0 20px rgba(212, 175, 55, 0.35)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Icon size={16} color={isActive ? '#ffd700' : '#ff85a1'} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </nav>
          </header>


          {/* Active Feature Experience Container */}
          <main style={{ marginTop: '30px', padding: '0 16px' }}>
            {activeTab === 'letter' && <LoveLetter />}
            {activeTab === 'bouquet' && <VirtualBouquet />}
            {activeTab === 'lanterns' && <SkyLanterns />}
            {activeTab === 'coupons' && <LoveCoupons />}
            {activeTab === 'anger' && <AngerBuster />}
            {activeTab === 'promise' && <ForeverPromise />}
          </main>

          {/* Loving Footer */}
          <footer style={{ textAlign: 'center', marginTop: '60px', padding: '20px', color: '#ffb3c1', fontSize: '0.9rem', fontFamily: 'Playfair Display' }}>
            <p style={{ margin: 0 }}>
              Crafted with all my heart and endless love for my fiancée, Khushi 💖
            </p>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#888', fontFamily: 'Outfit' }}>
              Forever your partner, your listener, and your biggest admirer.
            </p>
          </footer>
        </div>
      )}

      {/* Global CSS helper for fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}