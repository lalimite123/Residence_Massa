import { readFileSync } from "node:fs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, context) => {
    // #region debug-point A:webpack-config
    try {
      const env = readFileSync(".dbg/next-build-wasmhash.env", "utf8")
      const url = env.match(/DEBUG_SERVER_URL=(.+)/)?.[1] || "http://127.0.0.1:7777/event"
      const sessionId = env.match(/DEBUG_SESSION_ID=(.+)/)?.[1] || "next-build-wasmhash"
      fetch(url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId,
          runId: "pre-fix",
          hypothesisId: "A",
          location: "next.config.mjs:webpack",
          msg: "[DEBUG] webpack config prepared",
          data: {
            dev: context.dev,
            isServer: context.isServer,
            nextRuntime: context.nextRuntime ?? null,
            mode: config.mode ?? null,
            pluginCount: Array.isArray(config.plugins) ? config.plugins.length : null,
            ruleCount: Array.isArray(config.module?.rules) ? config.module.rules.length : null,
            hasOptimization: Boolean(config.optimization),
            cacheType: config.cache && typeof config.cache === "object" ? config.cache.type ?? "object" : config.cache ?? null,
          },
          ts: Date.now(),
        }),
      }).catch(() => {})
    } catch {}
    // #endregion
    return config
  },
}

export default nextConfig
