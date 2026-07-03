import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  speed: number;
  phase: number;
}

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const scrollRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const initParticles = () => {
      const count = 35;
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(Math.random() * 0.4 + 0.1),
        size: Math.random() * 3 + 1.5,
        opacity: Math.random() * 0.4 + 0.1,
        speed: Math.random() * 0.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    resize();
    initParticles();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = () => {
      frameRef.current++;
      const t = frameRef.current * 0.016;
      const scrollY = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // ── Waveform river (top) ──
      const topRiverY = 160;
      if (scrollY < 600) {
        const alpha = Math.max(0, 1 - scrollY / 600) * 0.15;
        for (let wave = 0; wave < 5; wave++) {
          const waveOffset = wave * 20;
          const waveColor = wave < 3 ? "249,115,22" : "234,88,12";
          const waveAlpha = alpha * (1 - wave * 0.15);

          ctx.beginPath();
          for (let x = 0; x <= width; x += 2) {
            const mouseInfluence = mx > 0 ? Math.sin((x - mx) * 0.002) * 15 * Math.exp(-((x - mx) ** 2) / 80000) : 0;
            const y =
              topRiverY +
              waveOffset +
              Math.sin(x * 0.008 + t * 0.7 + wave * 0.6) * 30 +
              Math.sin(x * 0.015 + t * 1.1 + wave) * 15 +
              Math.sin(x * 0.003 + t * 0.3) * 25 +
              mouseInfluence;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${waveColor},${waveAlpha})`;
          ctx.lineWidth = wave < 3 ? 1.2 : 0.8;
          ctx.stroke();
        }
      }

      // ── Waveform river (bottom of hero) ──
      const bottomRiverBase = 650;
      if (scrollY < 700) {
        const alpha = Math.max(0, 1 - scrollY / 700) * 0.12;
        for (let wave = 0; wave < 4; wave++) {
          const waveOffset = wave * 22;
          const waveColor = "249,115,22";
          const waveAlpha = alpha * (1 - wave * 0.18);

          ctx.beginPath();
          for (let x = 0; x <= width; x += 2) {
            const mouseInfluence = mx > 0 ? Math.cos((x - mx) * 0.003) * 12 * Math.exp(-((x - mx) ** 2) / 70000) : 0;
            const y =
              bottomRiverBase +
              waveOffset +
              Math.cos(x * 0.01 + t * 0.5 + wave) * 25 +
              Math.sin(x * 0.018 + t * 0.8 + wave * 1.5) * 18 +
              Math.cos(x * 0.005 + t * 0.35) * 20 +
              mouseInfluence;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(${waveColor},${waveAlpha})`;
          ctx.lineWidth = wave < 3 ? 1 : 0.7;
          ctx.stroke();
        }
      }

      // ── Particles ──
      for (const p of particlesRef.current) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        // Scroll boost
        p.vy -= 0.0004;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Gentle upward drift
        p.vy -= p.speed * 0.004;

        // Wrap
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = -(Math.random() * 0.4 + 0.1);
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        // Draw
        const pAlpha = p.opacity * (0.6 + 0.4 * Math.sin(t * 2 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${pAlpha})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
