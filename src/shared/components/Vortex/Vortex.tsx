import { cn } from "@shared/utils/cn";
import { useEffect, useRef, type ReactNode } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef(null);
  // Store the animation frame ID so we can cancel it on unmount
  const animationFrameRef = useRef<number>(0);
  // Store tick in a ref to survive across renders without stale closure issues
  const tickRef = useRef<number>(0);

  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const baseHue = props.baseHue || 220;
  const rangeHue = 100;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 0.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const backgroundColor = props.backgroundColor || "#0e1627ff";
  const noise3D = createNoise3D();
  let particleProps = new Float32Array(particlePropsLength);
  const center: [number, number] = [0, 0];

  const TAU: number = 2 * Math.PI;
  const rand = (n: number): number => n * Math.random();
  const fadeInOut = (t: number, m: number): number => {
    const hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1: number, n2: number, speed: number): number =>
    (1 - speed) * n1 + speed * n2;

  const setup = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    resize(canvas);
    initParticles();
    draw(canvas, ctx);
  };

  const initParticles = () => {
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = rand(canvas.width);
    const y = rand(canvas.height);
    const vx = 0;
    const vy = 0;
    const life = 0;
    const ttl = 100 + rand(150);
    const speed = baseSpeed + rand(rangeSpeed);
    const radius = baseRadius + rand(rangeRadius);
    const hue = baseHue + rand(rangeHue);

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    tickRef.current++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawParticles(ctx);
    renderGlow(canvas, ctx);

    // Store the frame ID so the cleanup function can cancel it
    animationFrameRef.current = requestAnimationFrame(() => draw(canvas, ctx));
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let x = particleProps[i];
    let y = particleProps[i + 1];
    let vx = particleProps[i + 2];
    let vy = particleProps[i + 3];
    let life = particleProps[i + 4];
    const ttl = particleProps[i + 5];
    const speed = particleProps[i + 6];
    const radius = particleProps[i + 7];
    const hue = particleProps[i + 8];

    const n = noise3D(x * 0.00125, y * 0.00125, tickRef.current * 0.0005) * TAU * 2;
    vx = lerp(vx, Math.cos(n), 0.5);
    vy = lerp(vy, Math.sin(n), 0.5);
    x += vx * speed;
    y += vy * speed;
    life++;

    if (checkBounds(x, y, canvas) || life > ttl) {
      initParticle(i);
    } else {
      particleProps[i] = x;
      particleProps[i + 1] = y;
      particleProps[i + 2] = vx;
      particleProps[i + 3] = vy;
      particleProps[i + 4] = life;

      drawParticle(x, y, x + vx, y + vy, life, ttl, radius, hue, ctx);
    }
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  };

  const checkBounds = (x: number, y: number, canvas: HTMLCanvasElement) => {
    return x > canvas.width || x < 0 || y > canvas.height || y < 0;
  };

  const resize = (canvas: HTMLCanvasElement) => {
    const { innerWidth, innerHeight } = window;

    canvas.width = innerWidth;
    canvas.height = innerHeight;

    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
  };

  const renderGlow = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  useEffect(() => {
    setup();
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        resize(canvas);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      // CRITICAL: Cancel the animation frame loop on unmount/refresh
      // Without this, the loop keeps running after the component is destroyed,
      // causing "Cannot read properties of null" crashes.
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("relative h-full w-full", props.containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        style={{ backgroundColor }}
        className="absolute inset-0 z-0 h-full w-full flex items-center justify-center"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>

      <div className={cn("relative z-10 h-full w-full", props.className)}>
        {props.children}
      </div>
    </div>
  );
};
