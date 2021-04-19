const { sessionMiddleware, simpleRolesIsAuthorized } = require("blitz")
const withOffline = require("next-offline")
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(
  withOffline({
    middleware: [
      sessionMiddleware({
        isAuthorized: simpleRolesIsAuthorized,
      }),
    ],
    workboxOpts: {
      swDest: process.env.NEXT_EXPORT ? "service-worker.js" : "static/service-worker.js",
      maximumFileSizeToCacheInBytes: 50000000000,
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "offlineCache",
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    },
    async rewrites() {
      return [
        {
          source: "/service-worker.js",
          destination: "/_next/static/service-worker.js",
        },
      ]
    },
    async headers() {
      return [
        {
          // This works, and returns appropriate Response headers:
          source: "/(.*).jpg",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=18000, s-maxage=18000, stale-while-revalidate=18000",
            },
          ],
        },
        {
          // This doesn't work for 'Cache-Control' key (works for others though):
          source: "/_next/image(.*)",
          headers: [
            {
              key: "Cache-Control",
              // Instead of this value:
              value: "public, max-age=18000, s-maxage=18000, stale-while-revalidate=18000",
              // Cache-Control response header is `public, max-age=60` in production
              // and `public, max-age=0, must-revalidate` in development
            },
          ],
        },
      ]
    },

    images: {
      domains: ["fayezahmed.s3.ap-south-1.amazonaws.com"],
    },
  })
)
