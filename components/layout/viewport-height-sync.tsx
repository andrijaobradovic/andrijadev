"use client";

import { useEffect } from "react";

const STYLE_ID = "app-vh-style";

function syncViewportHeight() {
  const height = window.visualViewport?.height ?? window.innerHeight;
  let style = document.getElementById(STYLE_ID);

  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }

  style.textContent = `:root{--app-vh:${height}px}`;
}

export function ViewportHeightSync() {
  useEffect(() => {
    syncViewportHeight();

    window.visualViewport?.addEventListener("resize", syncViewportHeight);
    window.visualViewport?.addEventListener("scroll", syncViewportHeight);
    window.addEventListener("resize", syncViewportHeight);

    return () => {
      window.visualViewport?.removeEventListener("resize", syncViewportHeight);
      window.visualViewport?.removeEventListener("scroll", syncViewportHeight);
      window.removeEventListener("resize", syncViewportHeight);
    };
  }, []);

  return null;
}
