"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
  bx: number;
  by: number;
  label?: string;
  labelTimer?: number;
};

type Packet = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

const CODE_LABELS = [
  "api.call()",
  "crm.sync()",
  "db.query()",
  "event.push()",
  "auth.ok",
  "data.merge()",
  "users.upsert()",
  "bp.trigger()",
  "cache.hit",
  "deploy:ok",
  "webhook.in",
  "sheet → crm",
];

export function NodesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let scan = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(22, Math.floor((width * height) / 11000));
      nodes = Array.from({ length: count }, (_, i) => {
        const hub = i % 5 === 0;
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          bx: x,
          by: y,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          r: hub ? 2.8 : 1.6,
          hub,
        };
      });

      packets = [];
    };

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      let a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (a === b) b = (b + 1) % nodes.length;
      // prefer shorter edges
      const na = nodes[a];
      const nb = nodes[b];
      const d = Math.hypot(na.x - nb.x, na.y - nb.y);
      const maxD = Math.min(width, height) * 0.45;
      if (d > maxD) return;
      packets.push({ a, b, t: 0, speed: 0.006 + Math.random() * 0.01 });
    };

    const spawnLabel = () => {
      const hubs = nodes.filter((n) => n.hub);
      if (hubs.length === 0) return;
      const n = hubs[Math.floor(Math.random() * hubs.length)];
      n.label = CODE_LABELS[Math.floor(Math.random() * CODE_LABELS.length)];
      n.labelTimer = 1;
    };

    let lastPacket = 0;
    let lastLabel = 0;

    const step = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // background grid with scan line
      if (!prefersReduced) scan = (scan + 0.45) % height;
      drawGrid(ctx, width, height, scan);

      const maxDist = Math.min(width, height) * 0.32;

      // edges
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const t = 1 - dist / maxDist;
            let hotness = 0;
            if (pointer.active) {
              const da = Math.hypot(a.x - pointer.x, a.y - pointer.y);
              const db = Math.hypot(b.x - pointer.x, b.y - pointer.y);
              const nearest = Math.min(da, db);
              const reach = Math.min(width, height) * 0.38;
              if (nearest < reach) hotness = 1 - nearest / reach;
            }
            ctx.strokeStyle = `rgba(139, 139, 147, ${0.1 * t})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (hotness > 0.02) {
              ctx.strokeStyle = `rgba(99, 102, 241, ${0.45 * t * hotness})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // spawn packets/labels periodically
      if (!prefersReduced) {
        if (now - lastPacket > 140) {
          spawnPacket();
          lastPacket = now;
        }
        if (now - lastLabel > 1400) {
          spawnLabel();
          lastLabel = now;
        }
      }

      // update + draw packets
      packets = packets.filter((p) => {
        if (!prefersReduced) p.t += p.speed;
        if (p.t >= 1) return false;
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) return false;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        // trail
        const trailLen = 0.12;
        const t0 = Math.max(0, p.t - trailLen);
        const tx = a.x + (b.x - a.x) * t0;
        const ty = a.y + (b.y - a.y) * t0;
        const grd = ctx.createLinearGradient(tx, ty, x, y);
        grd.addColorStop(0, "rgba(99, 102, 241, 0)");
        grd.addColorStop(1, "rgba(129, 140, 248, 0.9)");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = "rgba(165, 175, 255, 0.95)";
        ctx.shadowColor = "rgba(99, 102, 241, 0.8)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // nodes
      for (const n of nodes) {
        if (!prefersReduced) {
          n.bx += n.vx;
          n.by += n.vy;
          if (n.bx < 0 || n.bx > width) n.vx *= -1;
          if (n.by < 0 || n.by > height) n.vy *= -1;

          let tx = n.bx;
          let ty = n.by;
          if (pointer.active) {
            const dx = pointer.x - n.bx;
            const dy = pointer.y - n.by;
            const d = Math.hypot(dx, dy);
            const reach = Math.min(width, height) * 0.4;
            if (d < reach && d > 0.01) {
              const pull = (1 - d / reach) * (n.hub ? 28 : 18);
              tx += (dx / d) * pull;
              ty += (dy / d) * pull;
            }
          }
          n.x += (tx - n.x) * 0.08;
          n.y += (ty - n.y) * 0.08;
        }

        let hotness = 0;
        if (pointer.active) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          const reach = Math.min(width, height) * 0.35;
          if (d < reach) hotness = 1 - d / reach;
        }

        if (n.hub) {
          ctx.fillStyle = "rgba(79, 70, 229, 0.9)";
          ctx.shadowColor = "rgba(79, 70, 229, 0.7)";
          ctx.shadowBlur = 14 + hotness * 18;
        } else {
          ctx.fillStyle =
            hotness > 0.1
              ? `rgba(129, 140, 248, ${Math.min(1, 0.7 + hotness * 0.3)})`
              : "rgba(232, 232, 236, 0.55)";
          ctx.shadowBlur = hotness > 0.2 ? 8 : 0;
          ctx.shadowColor = "rgba(99, 102, 241, 0.6)";
        }
        ctx.beginPath();
        ctx.arc(
          n.x,
          n.y,
          n.r + (n.hub ? hotness * 1.2 : hotness * 0.8),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // label bubble
        if (n.hub && n.label && n.labelTimer !== undefined) {
          if (!prefersReduced) n.labelTimer -= 0.006;
          if (n.labelTimer <= 0) {
            n.label = undefined;
            n.labelTimer = undefined;
          } else {
            const alpha = Math.min(1, n.labelTimer * 2);
            ctx.shadowBlur = 0;
            ctx.font =
              "10px ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace";
            const text = n.label;
            const w = ctx.measureText(text).width + 10;
            const h = 18;
            const lx = n.x + 8;
            const ly = n.y - 22;
            ctx.fillStyle = `rgba(22, 22, 26, ${0.75 * alpha})`;
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.45 * alpha})`;
            ctx.lineWidth = 1;
            roundRect(ctx, lx, ly, w, h, 4);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = `rgba(232, 232, 236, ${alpha})`;
            ctx.textBaseline = "middle";
            ctx.fillText(text, lx + 5, ly + h / 2);
          }
        }
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(step);
    };

    const drawGrid = (
      ctx: CanvasRenderingContext2D,
      w: number,
      h: number,
      scanY: number,
    ) => {
      const step = 40;
      ctx.strokeStyle = "rgba(38, 38, 44, 0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // scan line
      const g = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      g.addColorStop(0, "rgba(79, 70, 229, 0)");
      g.addColorStop(0.5, "rgba(79, 70, 229, 0.07)");
      g.addColorStop(1, "rgba(79, 70, 229, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, scanY - 40, w, 80);
    };

    const roundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    reset();

    let visible = true;
    const start = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(step);
    };
    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    start();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting;
          if (visible) start();
          else stop();
        }
      },
      { rootMargin: "100px 0px 100px 0px" },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else if (visible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const ro = new ResizeObserver(() => {
      reset();
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
