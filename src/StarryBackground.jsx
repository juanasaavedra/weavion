import React, { useEffect, useRef } from 'react';

const StarryBackground = ({ opacity = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let constellations = [];
    let dpr = window.devicePixelRatio || 1;

    const initCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight * 3;

      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars(width, height);
      initConstellations(width, height);
    };

    const initStars = (width, height) => {
      stars = [];
      const numStars = Math.floor((width * height) / 2500);
      for (let i = 0; i < numStars; i++) {
        const big = Math.random() < 0.25; // un poco más de estrellas grandes
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: big ? Math.random() * 2 + 1 : Math.random() * 1.2 + 0.6,
          opacity: Math.random() * 0.4 + 0.2,
          pulse: Math.random() * 0.02 + 0.005,
          pulseFactor: Math.random() * Math.PI * 2,
          dx: (Math.random() - 0.5) * 0.1,
          dy: (Math.random() - 0.5) * 0.1,
          glow: Math.random() < 0.1
        });
      }
    };

    const initConstellations = (width, height) => {
      constellations = [];
      const numConstellations = Math.floor((width * height) / 150000);
      for (let i = 0; i < numConstellations; i++) {
        const starCount = Math.floor(Math.random() * 3) + 3; // 3-5 estrellas
        const constellationStars = [];
        const centerX = Math.random() * width;
        const centerY = Math.random() * height;
        const radius = Math.random() * 80 + 60;

        for (
          let j = 0,
          len = stars.length;
          j < len && constellationStars.length < starCount;
          j++
        ) {
          const star = stars[j];
          const dx = star.x - centerX;
          const dy = star.y - centerY;
          if (Math.sqrt(dx * dx + dy * dy) < radius) {
            constellationStars.push(star);
          }
        }
        if (constellationStars.length >= 3) {
          constellationStars.sort(
            (a, b) =>
              Math.atan2(a.y - centerY, a.x - centerX) -
              Math.atan2(b.y - centerY, b.x - centerX)
          );
          constellations.push({
            stars: constellationStars,
            centerX,
            centerY,
            radius,
          });
        }
      }
    };

    const draw = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x += star.dx;
        star.y += star.dy;
        star.pulseFactor += star.pulse;

        if (star.x < 0) star.x += width;
        if (star.x > width) star.x -= width;
        if (star.y < 0) star.y += height;
        if (star.y > height) star.y -= height;
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.35 * opacity})`;
      ctx.lineWidth = 1;
      for (const cluster of constellations) {
        const { stars: constellation, centerX, centerY, radius } = cluster;
        const inRange = constellation.every((star) => {
          const dx = star.x - centerX;
          const dy = star.y - centerY;
          return dx * dx + dy * dy <= radius * radius;
        });
        if (!inRange) continue;
        ctx.beginPath();
        ctx.moveTo(constellation[0].x, constellation[0].y);
        for (let i = 1; i < constellation.length; i++) {
          ctx.lineTo(constellation[i].x, constellation[i].y);
        }
        ctx.stroke();
      }

      for (const star of stars) {
        const pulseOpacity = 0.8 + Math.sin(star.pulseFactor) * 0.2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.opacity * pulseOpacity * opacity, 1)})`;
        ctx.fill();
        if (star.glow) {
          const gradient = ctx.createRadialGradient(
            star.x,
            star.y,
            0,
            star.x,
            star.y,
            star.radius * 4
          );
          gradient.addColorStop(0, `rgba(111, 71, 255, ${0.4 * opacity})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    initCanvas();
    draw();
    window.addEventListener('resize', initCanvas);

    return () => {
      window.removeEventListener('resize', initCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        opacity,
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
      }}
    />
  );
};

export default StarryBackground;
