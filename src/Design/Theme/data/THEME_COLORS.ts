/**
 * Per-mode ramps. Invariant: every `text.*` token must clear WCAG AA (4.5:1)
 * against its own mode's `base.background.primary`. In dark mode the module
 * accents are tints (light on black); in light mode they must be shades (dark
 * on white), never the same mid-tone — a mid-tone only ever passes on one side.
 */
export const THEME_COLORS = {
  dark: {
    base: {
      background: {
        primary: "#101010",
        secondary: "#1a1a1a",
        tertiary: "#252525",
        hover: "rgba(242, 242, 242, 0.06)",
      },
      text: {
        primary: "#f2f2f2",
        secondary: "rgba(242, 242, 242, 0.5)",
        onAccent: "#ffffff",
      },
      border: {
        primary: "rgba(242, 242, 242, 0.06)",
        secondary: "rgba(242, 242, 242, 0.12)",
        tertiary: "rgba(242, 242, 242, 0.2)",
      },
    },
    blue: {
      background: {
        primary: "#0f1a2e",
        secondary: "#3b82f6",
      },
      text: {
        primary: "#bfdbfe",
        secondary: "#93c5fd",
      },
      border: {
        primary: "rgba(59, 130, 246, 0.2)",
        secondary: "rgba(59, 130, 246, 0.5)",
      },
    },
    amber: {
      background: {
        primary: "#1a1308",
        secondary: "#f7931a",
      },
      text: {
        primary: "#fef3c7",
        secondary: "#fbbf24",
      },
      border: {
        primary: "rgba(247, 147, 26, 0.2)",
        secondary: "rgba(247, 147, 26, 0.5)",
      },
    },
    violet: {
      background: {
        primary: "#171028",
        secondary: "#8b5cf6",
      },
      text: {
        primary: "#ddd6fe",
        secondary: "#a78bfa",
      },
      border: {
        primary: "rgba(139, 92, 246, 0.2)",
        secondary: "rgba(139, 92, 246, 0.5)",
      },
    },
    boxShadow: {
      soft: "0 4px 12px rgba(0, 0, 0, 0.2)",
      strong: "0 10px 25px rgba(0, 0, 0, 0.35)",
      bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
    },
    semantic: {
      success: {
        text: "#34d399",
        border: "#059669",
        background: "rgba(5, 150, 105, 0.12)",
      },
      error: {
        text: "#fb7185",
        border: "#e11d48",
        background: "rgba(225, 29, 72, 0.12)",
      },
      info: {
        text: "#38bdf8",
        border: "#0284c7",
        background: "rgba(2, 132, 199, 0.12)",
      },
      warning: {
        text: "#fb923c",
        border: "#ea580c",
        background: "rgba(249, 115, 22, 0.12)",
      },
    },
  },
  light: {
    // Warm paper, not clinical white. The brand spec is "cream → bg in light"
    // (see BRAND.ts) but the theme had shipped pure #fff + cool slate ink —
    // maximum luminance + cold hue, which glares and fatigues the eye even at
    // high contrast. These are warm off-whites and a warm near-black; contrast
    // is preserved (all AA, guarded by THEME_COLORS.test.ts), the glare is not.
    base: {
      background: {
        primary: "#faf8f2",
        secondary: "#f3f0e7",
        tertiary: "#eae6da",
        hover: "rgba(43, 38, 32, 0.05)",
      },
      text: {
        primary: "#2a2620",
        // Warm-neutral gray. The prior #625b4e leaned olive-taupe (blue channel
        // dragged well below red/green), which read muddy; #605c57 keeps the
        // warmth but sits near-neutral, cleaner against the cream paper.
        secondary: "#605c57",
        onAccent: "#ffffff",
      },
      border: {
        primary: "#e7e1d4",
        secondary: "#d5ccba",
        tertiary: "#b0a793",
      },
    },
    blue: {
      background: {
        primary: "#eff6ff",
        secondary: "#2563eb",
      },
      text: {
        primary: "#1e40af",
        secondary: "#1d4ed8",
      },
      border: {
        primary: "#bfdbfe",
        secondary: "#2563eb",
      },
    },
    amber: {
      background: {
        primary: "#fffbeb",
        secondary: "#f7931a",
      },
      text: {
        primary: "#92400e",
        // Deepened from #b45309: burnt orange is the lightest accent, and on the
        // warm canvas (#f3f0e7) the old value fell to 4.41 — just under AA.
        secondary: "#9e4409",
      },
      border: {
        primary: "#fde68a",
        secondary: "#f7931a",
      },
    },
    violet: {
      background: {
        primary: "#f5f3ff",
        secondary: "#7c3aed",
      },
      text: {
        primary: "#5b21b6",
        secondary: "#6d28d9",
      },
      border: {
        primary: "#ddd6fe",
        secondary: "#6d28d9",
      },
    },
    boxShadow: {
      soft: "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
      strong:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
      bottom: "0 4px 6px -1px rgba(0, 0, 0, 0.08)",
    },
    semantic: {
      success: {
        text: "#047857",
        border: "#10b981",
        background: "rgba(16, 185, 129, 0.08)",
      },
      error: {
        text: "#be123c",
        border: "#f43f5e",
        background: "rgba(244, 63, 94, 0.08)",
      },
      info: {
        text: "#0369a1",
        border: "#38bdf8",
        background: "rgba(56, 189, 248, 0.08)",
      },
      warning: {
        text: "#c2410c",
        border: "#f97316",
        background: "rgba(249, 115, 22, 0.08)",
      },
    },
  },
};
