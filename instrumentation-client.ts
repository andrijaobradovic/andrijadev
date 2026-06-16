// Dev-only workaround for a known Next.js 16 + Turbopack + React 19 bug where
// calling `notFound()` / `redirect()` makes React's performance tracking call
// `performance.measure()` with a negative start time, throwing:
// "Failed to execute 'measure' on 'Performance': '...' cannot have a negative time stamp."
// The 404/redirect itself works fine; this only silences the spurious dev console error.
// Next.js automatically loads this file on the client before the app starts.
// Tracking: https://github.com/vercel/next.js/issues/86060
if (process.env.NODE_ENV === "development" && typeof performance !== "undefined") {
  const perf = performance as Performance & { __measurePatched?: boolean };

  if (!perf.__measurePatched && typeof perf.measure === "function") {
    const originalMeasure = perf.measure.bind(perf);

    perf.measure = function patchedMeasure(
      ...args: Parameters<Performance["measure"]>
    ): PerformanceMeasure {
      try {
        return originalMeasure(...args);
      } catch (error) {
        const message = error instanceof Error ? error.message : "";
        const name = error instanceof Error ? error.name : "";

        if (
          message.includes("negative time stamp") ||
          name === "InvalidAccessError" ||
          name === "SyntaxError"
        ) {
          return {
            name: typeof args[0] === "string" ? args[0] : "",
            entryType: "measure",
            startTime: 0,
            duration: 0,
            detail: null,
            toJSON: () => ({}),
          } as PerformanceMeasure;
        }

        throw error;
      }
    };

    perf.__measurePatched = true;
  }
}
