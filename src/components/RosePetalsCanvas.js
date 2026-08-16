import React, { useEffect, useRef } from 'react';

export default function RosePetalsCanvas({ density = 45, interactive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates & sparkle dust
    const mouse = { x: -1000, y: -1000, active: false };
    const dustParticles = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Add sparkling fairy dust trail
      if (Math.random() < 0.6) {
        dustParticles.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          size: Math.random() * 3 + 1,
          alpha: 1,
          color: Math.random() > 0.4 ? '#ffd700' : '#ff85a1',
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          decay: Math.random() * 0.02 + 0.015
        });
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);
    }

    // --- Rose Petal Objects ---
    const petalColors = [
      { r: 255, g: 77, b: 109 },  // Rose Red
      { r: 235, g: 45, b: 85 },   // Crimson
      { r: 255, g: 117, b: 143 }, // Soft Pink
      { r: 255, g: 175, b: 190 }, // Pale Rose
      { r: 255, g: 215, b: 0 }    // Rare Golden Petal
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -20 - Math.random() * 50;
        this.size = Math.random() * 14 + 10;
        this.speedY = Math.random() * 1.2 + 0.8;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.03;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = Math.random() * 0.03 + 0.01;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.opacity = Math.random() * 0.4 + 0.5;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
        this.swayOffset = Math.random() * Math.PI * 2;
      }

      update(time) {
        this.angle += this.spin;
        this.flip += this.flipSpeed;
        this.x += this.speedX + Math.sin(time * this.swaySpeed + this.swayOffset) * 0.7;
        this.y += this.speedY;

        // Repel gently from mouse
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            this.x += (dx / dist) * force * 3;
            this.y += (dy / dist) * force * 3;
          }
        }

        if (this.y > height + 30 || this.x < -40 || this.x > width + 40) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.scale(1, Math.sin(this.flip));

        // Draw organic petal curve
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, -this.size / 3, this.size, this.size / 2);
        ctx.bezierCurveTo(this.size, this.size, this.size / 2, this.size * 1.2, 0, this.size * 1.5);
        ctx.bezierCurveTo(-this.size / 2, this.size * 1.2, -this.size, this.size, -this.size, this.size / 2);
        ctx.bezierCurveTo(-this.size, -this.size / 3, -this.size / 2, -this.size / 2, 0, 0);

        const grad = ctx.createLinearGradient(0, -this.size / 2, 0, this.size * 1.5);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.95})`);
        grad.addColorStop(1, `rgba(${Math.max(0, this.color.r - 50)}, ${Math.max(0, this.color.g - 30)}, ${Math.max(0, this.color.b - 20)}, ${this.opacity * 0.7})`);

        ctx.fillStyle = grad;
        ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    }

    // --- Background Twinkling Stars ---
    const stars = Array.from({ length: 70 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinkleOffset: Math.random() * Math.PI * 2,
      isGold: Math.random() > 0.5
    }));

    const petals = Array.from({ length: density }).map(() => new Petal());

    let startTime = performance.now();

    const render = (timeNow) => {
      const elapsed = (timeNow - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Star Sparkles
      stars.forEach((s) => {
        const alpha = 0.3 + 0.6 * Math.sin(elapsed * 2 * s.twinkleSpeed * 50 + s.twinkleOffset);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.isGold ? `rgba(255, 224, 130, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        ctx.shadowColor = s.isGold ? '#ffd700' : '#ffffff';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      // 2. Draw & Update Petals
      petals.forEach((petal) => {
        petal.update(elapsed);
        petal.draw();
      });

      // 3. Draw Fairy Dust from mouse
      for (let i = dustParticles.length - 1; i >= 0; i--) {
        const d = dustParticles[i];
        d.x += d.vx;
        d.y += d.vy;
        d.alpha -= d.decay;

        if (d.alpha <= 0) {
          dustParticles.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.globalAlpha = d.alpha;
          ctx.shadowColor = d.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}
