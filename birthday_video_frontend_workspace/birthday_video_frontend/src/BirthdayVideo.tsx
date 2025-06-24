import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import { ConfettiExplosion } from "./ConfettiExplosion";
import { DEFAULT_BIRTHDAY_COLORS } from "./BirthdayVideo/constants";

// PUBLIC_INTERFACE
export const BirthdayVideo: React.FC<{
  name: string;
  primary?: string;
  secondary?: string;
  accent?: string;
}> = ({
  name,
  primary = DEFAULT_BIRTHDAY_COLORS.primary,
  secondary = DEFAULT_BIRTHDAY_COLORS.secondary,
  accent = DEFAULT_BIRTHDAY_COLORS.accent,
}) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames, fps } = useVideoConfig();

  // Scenes: 0-2s: fade festive message | 2-6s: Happy Birthday + name | 6-10s: burst/balloon pop, confetti shower, closing
  const sceneSwitch1 = Math.floor(fps * 2);
  const sceneSwitch2 = Math.floor(fps * 6);

  // General colors
  const pastelGradient = `linear-gradient(120deg, ${primary} 0%, ${accent} 75%, ${secondary} 100%)`;

  return (
    <AbsoluteFill
      style={{
        background: pastelGradient,
        transition: "background 1s",
        overflow: "hidden",
        borderRadius: "1.8rem"
      }}
    >
      {/* Festive Welcome (Scene 1) */}
      <Sequence from={0} durationInFrames={sceneSwitch1}>
        <FestiveIntro />
      </Sequence>
      {/* Animated "Happy Birthday [Name]!" (Scene 2) */}
      <Sequence from={sceneSwitch1} durationInFrames={sceneSwitch2 - sceneSwitch1}>
        <BirthdayGreeting name={name} primary={primary} accent={accent} />
      </Sequence>
      {/* Confetti Finale with Cake (Scene 3) */}
      <Sequence from={sceneSwitch2} durationInFrames={durationInFrames - sceneSwitch2}>
        <CakeWithConfetti name={name} />
      </Sequence>
      {/* Confetti overlays */}
      <Sequence from={sceneSwitch1 + 7} durationInFrames={28}>
        <ConfettiExplosion intensity={1} />
      </Sequence>
      <Sequence from={sceneSwitch2 + 3} durationInFrames={45}>
        <ConfettiExplosion intensity={1.7} />
      </Sequence>
      {/* Fade-out to white */}
      <FadeOutOverlay
        frame={frame}
        fadeStart={durationInFrames - 18}
        duration={18}
        width={width}
        height={height}
      />
    </AbsoluteFill>
  );
};

// Festive animated intro card: "Let's Celebrate!"
const FestiveIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const fadeIn = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [Math.floor(durationInFrames / 2), durationInFrames - 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = spring({ frame, fps, config: { mass: 0.4, damping: 80 } });

  return (
    <div
      className="flex flex-col justify-center items-center h-full"
      style={{
        opacity: fadeIn * fadeOut,
        transform: `scale(${0.93 + 0.07 * scale})`,
      }}
    >
      <span
        className="block text-4xl md:text-5xl font-extrabold text-white drop-shadow-md"
        style={{
          background: "linear-gradient(90deg, #F472B6, #7DD3FC 80%, #FDE68A 100%)",
          color: "transparent",
          WebkitBackgroundClip: "text",
          backgroundClip: "text"
        }}
      >
        Let&apos;s Celebrate!
      </span>
      <span className="mt-3 text-2xl md:text-3xl font-semibold text-sky-900 bg-white bg-opacity-40 px-4 py-2 rounded-lg shadow-sm">
        A special birthday video just for you
      </span>
    </div>
  );
};

// Animated "Happy Birthday [Name]" scene
const BirthdayGreeting: React.FC<{
  name: string;
  primary: string;
  accent: string;
}> = ({ name, primary, accent }) => (
  <div className="flex flex-col h-full w-full items-center justify-center">
    <div className="mt-16 mb-2">
      <AnimatedWords
        text="Happy Birthday"
        color={accent}
        bounceDelay={0}
        fontSize={70}
      />
    </div>
    <AnimatedWords
      text={name ? `${name}!` : "To You!"}
      color={primary}
      bounceDelay={9}
      fontSize={58}
    />
    <div className="mt-5">
      <EmojiRow />
    </div>
  </div>
);

const EmojiRow: React.FC = () => (
  <div className="flex items-center justify-center gap-2 text-4xl mt-2 z-10 drop-shadow">
    <span>🎂</span>
    <span>🥳</span>
    <span>🎉</span>
    <span>✨</span>
    <span>🎁</span>
  </div>
);

const CakeWithConfetti: React.FC<{
  name: string;
}> = ({ name }) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [3, 26], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div
      className="flex flex-col items-center justify-center h-full opacity-95"
      style={{
        opacity: fadeIn,
      }}
    >
      <div className="block text-7xl md:text-8xl mb-4" style={{ textShadow: "0 8px 20px #ffe9" }}>
        🎂
      </div>
      <div className="rounded-xl px-7 py-4 bg-white bg-opacity-90 drop-shadow-lg text-3xl font-bold text-center text-pink-500 mt-4" style={{
        background: "linear-gradient(125deg, #FFF9F3 60%, #FDE68A 100%)"
      }}>
        {name ? `Enjoy your day, ${name}!` : "Enjoy your day!"}
      </div>
      <div className="mt-10 flex gap-2">
        <span className="text-4xl animate-bounce">🎈</span>
        <span className="text-4xl animate-bounce delay-150">🎈</span>
        <span className="text-4xl animate-bounce delay-300">🎈</span>
      </div>
    </div>
  );
};

// Bounce animated words: spring-in by character/word
const AnimatedWords: React.FC<{
  text: string;
  color: string;
  bounceDelay?: number;
  fontSize?: number;
}> = ({ text, color, bounceDelay = 0, fontSize = 64 }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const words = text.trim().split(" ");
  return (
    <div className="font-extrabold" style={{ fontSize }}>
      {words.map((word, wordIdx) => {
        const showFrame = bounceDelay + wordIdx * 6;
        const localFrame = Math.max(0, frame - showFrame);
        // Bouncy: scale spring in
        const scale = spring({
          fps,
          frame: localFrame,
          config: { damping: 150, mass: 0.7 }
        });
        return (
          <span key={word + wordIdx}
            style={{
              color,
              marginRight: 12,
              marginLeft: 6,
              display: "inline-block",
              transform: `scale(${0.1 + 0.92 * scale})`,
              textShadow: "0 2px 8px #fff7, 0 4px 12px #b1beda78",
              transition: "color 0.2s"
            }}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

// White fade-out at the end of the video
const FadeOutOverlay: React.FC<{
  frame: number;
  fadeStart: number;
  duration: number;
  width: number;
  height: number;
}> = ({ frame, fadeStart, duration, width, height }) => {
  const fade = interpolate(
    frame,
    [fadeStart, fadeStart + duration],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 0, top: 0, width, height,
        background: "white",
        opacity: fade,
        pointerEvents: "none",
        zIndex: 999
      }}
      aria-hidden
    />
  );
};
