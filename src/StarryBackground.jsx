import React, { useEffect, useRef } from 'react';

const StarryBackground = ({ opacity = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    let constellations = [];

    // Configurar el canvas para que ocupe toda la pantalla
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Hacerlo más alto para cubrir todo el scroll
      initStars();
      initConstellations();
    };

    // Crear estrellas
    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 3000); // Más densidad de estrellas
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.8, // Estrellas más grandes
          opacity: Math.random() * 0.9 + 0.3, // Más brillantes
          pulse: Math.random() * 0.03 + 0.01,
          pulseFactor: 0
        });
      }
    };

      // Crear constelaciones (líneas entre algunas estrellas)
    const initConstellations = () => {
      constellations = [];
      const numConstellations = Math.floor(stars.length / 30); // Muchas más constelaciones
      
      for (let i = 0; i < numConstellations; i++) {
        const numStarsInConstellation = Math.floor(Math.random() * 6) + 5; // Más estrellas por constelación
        const constellationStars = [];
        
        // Elegir un área para la constelación
        const centerX = Math.random() * canvas.width;
        const centerY = Math.random() * canvas.height;
        const radius = Math.random() * 200 + 100; // Radio más grande para constelaciones más visibles        // Seleccionar estrellas cercanas al centro de la constelación
        for (let j = 0; j < stars.length && constellationStars.length < numStarsInConstellation; j++) {
          const star = stars[j];
          const distance = Math.sqrt(Math.pow(star.x - centerX, 2) + Math.pow(star.y - centerY, 2));
          
          if (distance < radius) {
            constellationStars.push(star);
          }
        }
        
        if (constellationStars.length >= 3) {
          constellations.push(constellationStars);
        }
      }
    };

      // Dibujar el cielo estrellado
    const drawStarryBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fondo oscuro para mejor contraste
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar las constelaciones
      for (const constellation of constellations) {
        // Dibujar líneas de constelación
        ctx.beginPath();
        ctx.moveTo(constellation[0].x, constellation[0].y);
        
        for (let i = 1; i < constellation.length; i++) {
          ctx.lineTo(constellation[i].x, constellation[i].y);
        }
        
        // Líneas más brillantes y visibles
        ctx.strokeStyle = `rgba(111, 71, 255, 0.6)`; 
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Resaltar los puntos de unión de las constelaciones
        for (const star of constellation) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(111, 71, 255, 0.8)';
          ctx.fill();
        }
      }      // Dibujar las estrellas
      for (const star of stars) {
        star.pulseFactor += star.pulse;
        const pulseOpacity = 0.8 + Math.sin(star.pulseFactor) * 0.2;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.opacity * pulseOpacity * 1.5, 1.0)})`; // Estrellas más brillantes
        ctx.fill();
        
        // Añadir brillo para estrellas más grandes
        if (star.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.3})`;
          ctx.fill();
        }
      }
      
      animationFrameId = window.requestAnimationFrame(drawStarryBackground);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    drawStarryBackground();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [opacity]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none" 
      style={{ 
        opacity: 1,
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      }}
    />
  );
};

export default StarryBackground;
