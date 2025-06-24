import React, { useCallback, useState } from "react";
import { Player, RenderPoster } from "@remotion/player";
import { BirthdayVideo } from "./BirthdayVideo";
import { IconGift, IconDownload } from "./icons";

// Tailwind color palette for hover/focus/gradient backgrounds
const COLORS = {
  primary: "#7DD3FC",
  secondary: "#FDE68A",
  accent: "#F472B6",
};

const GRADIENT =
  "bg-gradient-to-br from-sky-300 via-pink-200 via-50% to-amber-100";

const CONTAINER =
  "min-h-screen flex flex-col items-center justify-center px-2 py-6 " +
  GRADIENT;

const TITLE =
  "font-extrabold text-5xl text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-sky-500 to-amber-300 drop-shadow-xl mb-2";

const SUBTITLE =
  "text-lg text-center font-medium text-gray-600 bg-white bg-opacity-60 rounded-lg px-4 py-2 shadow-md mb-10";

const FORM =
  "flex flex-col items-center gap-4 w-full max-w-md bg-white bg-opacity-60 rounded-xl shadow-xl py-8 px-6 mb-10";

const LABEL =
  "font-semibold text-gray-700 text-lg tracking-wide mb-2";

const INPUT =
  "transition border-none rounded-xl px-3 py-3 text-xl font-bold w-full focus:ring-2 ring-pink-400 outline-none bg-sky-50 text-gray-900 shadow placeholder:italic placeholder:text-gray-400";

const BUTTON =
  "flex items-center gap-2 justify-center w-full rounded-xl transition px-5 py-3 font-bold text-lg shadow bg-gradient-to-tr from-sky-300 via-pink-200 to-amber-100 hover:from-sky-200 hover:to-pink-100 hover:scale-[1.03] focus:ring-2 ring-pink-400 text-gray-800 duration-200";

const PLAYER_CONTAINER =
  "bg-white bg-opacity-80 rounded-2xl p-3 shadow-md max-w-[95vw] w-[420px] md:w-[630px] mx-auto mb-4 grow flex flex-col items-center justify-center";

const EXPORT_HINT =
  "text-sm text-center text-gray-500 mb-8 mt-2 mx-auto max-w-xs select-none";

const VIDEO_OPTIONS = {
  durationInFrames: 300,
  fps: 30,
  width: 720,
  height: 1280, // Portrait for mobile aesthetics
};

import { isBrowser } from "./isBrowser";

export const App: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  // For controlling animation: re-render on name change
  const [playbackKey, setPlaybackKey] = useState(0);

  const handleNameChange = (e: React.ChangeEvent<any>) => {
    setName(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setPlaybackKey((k) => k + 1);
  };

  const handleEdit = () => {
    setSubmitted(false);
    // Instantly re-render the preview (no animation delay in SSR-safe context)
    setPlaybackKey((k) => k + 1);
  };

  // Video Export handler (shows info message, no browser API called)
  const handleExport = useCallback(() => {
    // Could show modal/instructions in real browser context
    // Here, does nothing for SSR/build-safe code
  }, []);

  return (
    <div className={CONTAINER} style={{ minHeight: "100dvh" }}>
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        <h1 className={TITLE}>
          <span
            className="inline-flex items-baseline"
            style={{ letterSpacing: 0.01 }}
          >
            🎉 Birthday Video Maker
          </span>
        </h1>
        <div className={SUBTITLE}>
          Create personalized animated birthday wishes with your name!
        </div>
        {!submitted && (
          <form
            className={FORM}
            style={{ minWidth: 270, marginTop: 0 }}
            onSubmit={handleFormSubmit}
          >
            <label className={LABEL} htmlFor="name-input">
              Recipient's Name
            </label>
            <input
              id="name-input"
              className={INPUT}
              placeholder="e.g. Alex"
              maxLength={21}
              autoFocus
              autoComplete="off"
              required
              spellCheck="false"
              value={name}
              onChange={handleNameChange}
              style={{
                border: "none",
                boxShadow: "0 1px 2px #7DD3FC33",
              }}
            />
            <button
              type="submit"
              className={BUTTON}
              disabled={name.trim().length === 0}
              aria-label="Preview video"
            >
              <IconGift />
              Preview Animated Video
            </button>
          </form>
        )}
        {submitted && (
          <div className="w-full flex flex-col items-center">
            <div className={PLAYER_CONTAINER}>
              <Player
                key={playbackKey}
                component={BirthdayVideo}
                durationInFrames={VIDEO_OPTIONS.durationInFrames}
                fps={VIDEO_OPTIONS.fps}
                compositionWidth={VIDEO_OPTIONS.width}
                compositionHeight={VIDEO_OPTIONS.height}
                controls
                style={{
                  width: "100%",
                  maxWidth: 410,
                  borderRadius: "1.25rem",
                  border: "none",
                  boxShadow: "0 2px 18px #0001,0 0px 0px #FFF3",
                  background: "#7DD3FC" // subtle
                }}
                inputProps={{
                  name: name.trim(),
                  ...COLORS,
                }}
              />
            </div>
            <div className={EXPORT_HINT}>
              <strong>Happy with your video?</strong>
              <br />
              Download via Remotion Studio/CLI:
              <br />
              <RenderPoster
                component={BirthdayVideo}
                durationInFrames={VIDEO_OPTIONS.durationInFrames}
                inputProps={{
                  name: name.trim(),
                  ...COLORS,
                }}
                compositionHeight={VIDEO_OPTIONS.height}
                compositionWidth={VIDEO_OPTIONS.width}
                fps={VIDEO_OPTIONS.fps}
              />
              <br />
              <span className="opacity-70">
                For full export: use <code>npx remotion render ...</code> in the terminal/CLI for best results.
              </span>
            </div>
            <div className="flex w-full gap-3 mt-4">
              <button
                className={BUTTON + " bg-sky-100"}
                onClick={handleEdit}
                aria-label="Edit name"
              >
                Edit Name
              </button>
              <button
                className={BUTTON + " bg-pink-50"}
                type="button"
                onClick={handleExport}
                aria-label="Export video"
              >
                <IconDownload />
                How to Export
              </button>
            </div>
          </div>
        )}
        <footer className="w-full pt-8 pb-2 text-xs text-center text-gray-400 select-none opacity-60">
          &copy; {new Date().getFullYear()} Birthday Video by Remotion + React. 
        </footer>
      </div>
    </div>
  );
};
