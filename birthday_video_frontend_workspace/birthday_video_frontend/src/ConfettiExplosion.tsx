import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

// Utility: get random pastel color from a theme
const CONFETTI_COLORS = [
  "#F472B6", // accent
  "#7DD3FC", // primary
  "#FDE68A", // secondary
  "#f9a8d4", // pink-300
  "#a7f3d0", // teal-200
  "#c7d2fe", // violet-200
  "#fff1f2", // rose-50
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

type Particle = {
  x: number;
  y: number;
  r: number;
  color: string;
  speed: number;
  angle: number;
  spin: number;
};

function generateParticles(intensity: number, width: number, height: number) {
  // 60 ~ 140
  const count = Math.floor(48 * intensity + 16);
  const arr: Particle[] = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      x: width / 2 + randomBetween(-40, 40),
      y: height / 2 + randomBetween(-30, 30),
      r: randomBetween(7, 22),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speed: randomBetween(18, 27) * intensity,
      angle: randomBetween(-95, 95),
      spin: randomBetween(0, 360),
    });
  }
  return arr;
}

/**
 * ConfettiExplosion - animated festive particles for celebratory scenes
 * @param intensity How strong the burst (1=normal, 2=huge)
 */
export const ConfettiExplosion: React.FC<{ intensity?: number }> = ({
  intensity = 1,
}) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Generate on mount only
  const particles = React.useMemo(() => generateParticles(intensity, width, height), [
    intensity,
    width,
    height,
  ]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {particles.map((p, i) => {
          const time = frame / fps;

          // Animate falling
          const angleRad = (p.angle * Math.PI) / 180;
          const vx = Math.cos(angleRad) * p.speed;
          const vy = Math.sin(angleRad) * p.speed;

          // Particle movement: up (first 0.3s), inflect, then down (simulate gravity)
          let yDisplacement = vy * time + 0.45 * 980 * Math.pow(time, 2) * 0.004; // simplified gravity
          let xDisplacement = vx * time * 0.65;

          // Fade out and shrink at the end
          const fade = interpolate(frame, [14, 44], [1, 0], {
            extrapolateLeft: "clamp",
          });
          const shrink = interpolate(frame, [23, 44], [1, 0.66], {
            extrapolateLeft: "clamp",
          });

          return (
            <ellipse
              key={i}
              cx={p.x + xDisplacement}
              cy={p.y + yDisplacement}
              rx={p.r * (0.7 + shrink * 0.4)}
              ry={p.r * (0.55 + shrink * 0.2)}
              fill={p.color}
              fillOpacity={0.68 * fade}
              transform={`rotate(${p.spin + frame * 4}, ${p.x + xDisplacement},
                ${p.y + yDisplacement})`}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
