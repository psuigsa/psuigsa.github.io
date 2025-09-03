import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  velocityX: number;
  velocityY: number;
  color: string;
  size: number;
  alpha: number;
}

export default function ParticleIndiaMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const [arrivalStart, setArrivalStart] = useState<number | null>(null);

  // Tunable physics settings
  const PHYSICS = {
    // Wobble speed (frequency): increase for faster oscillation
    stiffness: 0.06,
    // Stronger pull during the initial fly-in
    stiffnessArrive: 0.18,
    // Wobble count (persistence): closer to 1 = more bounces
    damping: 0.92,
    dampingArrive: 0.9,
    // Mouse interaction
    repelRadius: 120,
    repelForce: 0.8,
    // Arrival animation duration (ms)
    arrivalDuration: 3000,
  };

  // IGSA colors for particles
  const colors = [
    'rgba(255, 138, 0, 0.9)',    // igsa-saffron
    'rgba(255, 87, 51, 0.9)',    // igsa-orange  
    'rgba(34, 197, 94, 0.9)',    // igsa-green
    'rgba(59, 130, 246, 0.9)',   // igsa-blue
    'rgba(251, 191, 36, 0.9)',   // igsa-gold
  ];

  // Initialize particles from image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size first
    const updateCanvasSize = () => {
      const containerWidth = canvas.parentElement?.clientWidth || 800;
      const containerHeight = canvas.parentElement?.clientHeight || 600;
      
      canvas.width = containerWidth;
      canvas.height = containerHeight;
      
      setDebugInfo(`Canvas: ${containerWidth}x${containerHeight}`);
    };

    updateCanvasSize();

    // Helper: get a random off-screen spawn point
    const getSpawnPoint = (w: number, h: number) => {
      const side = Math.random();
      const overshoot = 0.2; // 20% outside
      if (side < 0.25) {
        // left
        return {
          x: -w * overshoot - Math.random() * w * 0.2,
          y: Math.random() * h * 1.2 - h * 0.1,
        };
      } else if (side < 0.5) {
        // right
        return {
          x: w * (1 + overshoot) + Math.random() * w * 0.2,
          y: Math.random() * h * 1.2 - h * 0.1,
        };
      } else if (side < 0.75) {
        // top
        return {
          x: Math.random() * w * 1.2 - w * 0.1,
          y: -h * overshoot - Math.random() * h * 0.2,
        };
      }
      // bottom
      return {
        x: Math.random() * w * 1.2 - w * 0.1,
        y: h * (1 + overshoot) + Math.random() * h * 0.2,
      };
    };

    // Create India-shaped particles directly (without depending on external image)
    const createIndiaParticles = () => {
      const containerWidth = canvas.width;
      const containerHeight = canvas.height;
      const newParticles: Particle[] = [];

      // Responsive sizing for mobile
      const isMobile = containerWidth < 768;
      const scaleFactor = isMobile ? 0.8 : 1;

      // Create particles based on India's approximate shape
      const centerX = containerWidth * 0.5;
      const centerY = containerHeight * (isMobile ? 0.35 : 0.45); // Higher on mobile
      const baseWidth = Math.min(containerWidth, containerHeight) * scaleFactor * 0.7;
      const baseHeight = baseWidth * 1.4; // India is taller than it is wide

      // Main triangular body of India
      const particleSpacing = isMobile ? 8 : 6; // Larger spacing on mobile for performance
      for (let y = 0; y < baseHeight; y += particleSpacing) {
        const normalizedY = y / baseHeight;
        
        // Create varying width based on India's shape
        let width;
        if (normalizedY < 0.2) {
          // Northern regions (wider)
          width = baseWidth * (0.8 + normalizedY * 0.5);
        } else if (normalizedY < 0.7) {
          // Central regions (medium width)
          width = baseWidth * (1.0 - normalizedY * 0.3);
        } else {
          // Southern regions (narrower, triangular)
          width = baseWidth * (1.2 - normalizedY);
        }

        for (let x = -width/2; x < width/2; x += particleSpacing) {
          // Add some randomness to create more organic shape
          if (Math.random() > 0.3) {
            const targetX = centerX + x + (Math.random() - 0.5) * 8;
            const targetY = centerY + y - baseHeight/2 + (Math.random() - 0.5) * 8;
            const spawn = getSpawnPoint(containerWidth, containerHeight);
            newParticles.push({
              x: spawn.x,
              y: spawn.y,
              originalX: targetX,
              originalY: targetY,
              velocityX: 0,
              velocityY: 0,
              color: colors[Math.floor(Math.random() * colors.length)],
              size: Math.random() * 2.5 + 1.5,
              alpha: 0.8 + Math.random() * 0.2
            });
          }
        }
      }

      // Add Sri Lanka (small cluster below)
      const sriLankaY = centerY + baseHeight/2 + 20;
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 8 + Math.random() * 6;
        const targetX = centerX + Math.cos(angle) * radius;
        const targetY = sriLankaY + Math.sin(angle) * radius * 0.7;
        const spawn = getSpawnPoint(containerWidth, containerHeight);
        newParticles.push({
          x: spawn.x,
          y: spawn.y,
          originalX: targetX,
          originalY: targetY,
          velocityX: 0,
          velocityY: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1,
          alpha: 0.7
        });
      }

      // Add northeastern states (smaller extension)
      const neX = centerX + baseWidth * 0.6;
      const neY = centerY - baseHeight * 0.2;
      for (let i = 0; i < 30; i++) {
        const targetX = neX + (Math.random() - 0.5) * 40;
        const targetY = neY + (Math.random() - 0.5) * 30;
        const spawn = getSpawnPoint(containerWidth, containerHeight);
        newParticles.push({
          x: spawn.x,
          y: spawn.y,
          originalX: targetX,
          originalY: targetY,
          velocityX: 0,
          velocityY: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1,
          alpha: 0.7
        });
      }

      setDebugInfo(`Generated ${newParticles.length} particles`);
      setParticles(newParticles);
      setArrivalStart(performance.now());
    };

    // Try to load the image first, but fallback to programmatic generation
    const image = new Image();
    image.crossOrigin = "anonymous";
    
    const timeout = setTimeout(() => {
      console.log("Image loading timeout, using fallback");
      createIndiaParticles();
    }, 3000);

    image.onload = () => {
      clearTimeout(timeout);
      console.log("Image loaded successfully", image.width, image.height);
      
      try {
        // Create temporary canvas to analyze image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) {
          createIndiaParticles();
          return;
        }

        const containerWidth = canvas.width;
        const containerHeight = canvas.height;
        
        // Calculate scale to fit image in canvas
        const scale = Math.min(
          (containerWidth * 1.12) / image.width,
          (containerHeight * 1.12) / image.height
        );
        
        const scaledWidth = Math.floor(image.width * scale);
        const scaledHeight = Math.floor(image.height * scale);
        const offsetX = (containerWidth - scaledWidth) / 2;
        const offsetY = (containerHeight - scaledHeight) / 2;

        tempCanvas.width = scaledWidth;
        tempCanvas.height = scaledHeight;
        tempCtx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        const imageData = tempCtx.getImageData(0, 0, scaledWidth, scaledHeight);
        const pixels = imageData.data;

        const newParticles: Particle[] = [];
        const particleSpacing = 5; // Denser particle spacing

        // Sample pixels to create particles
        for (let y = 0; y < scaledHeight; y += particleSpacing) {
          for (let x = 0; x < scaledWidth; x += particleSpacing) {
            const pixelIndex = (y * scaledWidth + x) * 4;
            const r = pixels[pixelIndex];
            const g = pixels[pixelIndex + 1];
            const b = pixels[pixelIndex + 2];
            const alpha = pixels[pixelIndex + 3];

            // Only create particles where there are visible pixels (not black background)
            if (alpha > 100 && (r > 50 || g > 50 || b > 50)) {
              const targetX = offsetX + x;
              const targetY = offsetY + y;
              const spawn = getSpawnPoint(containerWidth, containerHeight);
              newParticles.push({
                x: spawn.x,
                y: spawn.y,
                originalX: targetX,
                originalY: targetY,
                velocityX: 0,
                velocityY: 0,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 2.5 + 1,
                alpha: 0.8
              });
            }
          }
        }

        if (newParticles.length > 50) {
          setDebugInfo(`Image-based: ${newParticles.length} particles`);
          setParticles(newParticles);
          setArrivalStart(performance.now());
        } else {
          console.log("Not enough particles from image, using fallback");
          createIndiaParticles();
        }
      } catch (error) {
        console.error("Error processing image:", error);
        createIndiaParticles();
      }
    };

    image.onerror = () => {
      clearTimeout(timeout);
      console.log("Image failed to load, using fallback");
      createIndiaParticles();
    };

    // Start loading the image
    image.src = "https://cdn.builder.io/api/v1/image/assets%2F91e64948d08f43e3bd49e937f1b950f4%2Fa246b09ad7864c71a1d6df38b1cd1ba4?format=webp&width=800";

  }, []);

  // Handle mouse movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseEnter = () => setIsMouseOver(true);
    const handleMouseLeave = () => setIsMouseOver(false);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || particles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = performance.now();
      const arriving = arrivalStart !== null && now - arrivalStart < PHYSICS.arrivalDuration;

      particles.forEach((particle) => {
        if (isMouseOver && !arriving) {
          // Repulsion only after arrival
          const dx = particle.x - mousePos.x;
          const dy = particle.y - mousePos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = PHYSICS.repelRadius;

          if (distance < maxDistance && distance > 0) {
            const force = (1 - distance / maxDistance) * PHYSICS.repelForce;
            particle.velocityX += (dx / distance) * force;
            particle.velocityY += (dy / distance) * force;
          }
        } else {
          // Pull toward original position
          const returnForce = arriving ? PHYSICS.stiffnessArrive : PHYSICS.stiffness;
          particle.velocityX += (particle.originalX - particle.x) * returnForce;
          particle.velocityY += (particle.originalY - particle.y) * returnForce;
        }

        // Apply damping (controls bounce count)
        const friction = arriving ? PHYSICS.dampingArrive : PHYSICS.damping;
        particle.velocityX *= friction;
        particle.velocityY *= friction;

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePos, isMouseOver, arrivalStart]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      // Reset particles on resize
      setParticles([]);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-igsa-saffron/5 via-igsa-orange/3 to-igsa-green/5"></div>
      
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-none"
        style={{ background: 'transparent' }}
      />

      {/* Instructions */}
      {particles.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black/20 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm animate-fade-in z-10">
          <div>Move your mouse to interact with particles</div>
          <div className="text-xs opacity-70">{debugInfo}</div>
        </div>
      )}
    </div>
  );
}
