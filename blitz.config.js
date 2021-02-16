const { sessionMiddleware, simpleRolesIsAuthorized } = require("@blitzjs/server")
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

    images: {
      domains: ["res.cloudinary.com", "fayezahmed.s3.ap-south-1.amazonaws.com"],

      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
  })
)
