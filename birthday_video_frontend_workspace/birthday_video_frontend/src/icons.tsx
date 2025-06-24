import React from "react";

// PUBLIC_INTERFACE
export const IconGift: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <span
    role="img"
    aria-label="gift"
    style={{
      fontSize: size,
      verticalAlign: "middle",
      lineHeight: 1,
      display: "inline-block",
      filter: "drop-shadow(0 2px 2px #fff6)"
    }}
  >
    🎁
  </span>
);

// PUBLIC_INTERFACE
export const IconDownload: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    stroke="none"
    fill="#F472B6"
    viewBox="0 0 20 20"
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M10 2a1 1 0 0 1 1 1v8.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L9 11.586V3a1 1 0 0 1 1-1zm8 14a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2h16z"/>
  </svg>
);
