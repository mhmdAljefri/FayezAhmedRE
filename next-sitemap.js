const siteUrl = "https://fayezahmed.com"
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/admin/*"],
  robotsTxtOptions: {
    additionalSitemaps: [
      siteUrl + "/server-sitemap.xml", // <==== Add here
    ],
  },
}
