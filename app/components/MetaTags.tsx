import { Head } from "blitz"
import React from "react"

let hydrated = false

export default function MetaTags({ title }) {
  const hydratedRef = React.useRef(false)
  const [, rerender] = React.useState(false)

  React.useEffect(() => {
    if (!hydratedRef.current) {
      hydrated = true
      hydratedRef.current = true
      rerender(true)
    }
  }, [])

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

      <title>{title}</title>
      {/* <!-- Manifest  --> */}
      <link rel="manifest" href="/manifest.json" />
      {/* Google fonts preload */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;500&display=swap"
        rel="preload"
        as="style"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;500&display=swap"
        media={!hydrated ? "print" : "all"}
      />
      {/* End Google fonts */}
      <meta name="description" content="الموقع الرسمي لشركة فايز احمد العقارية" />
      <meta
        name="keywords"
        content="عقارات, فايز احمد, مباني, فلل, شقق, اراضي, مجمعات سكنية, مجمعات على البحر, تاجير, تمليك' بيع, ايجار' شراء, بيوت' بيت, فلل, متجر, عقار"
      />
      {/* <!-- Android  --> */}
      <meta name="theme-color" content="#ccb87d" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
      {/* <!-- iOS --> */}
      <meta name="apple-mobile-web-app-title" content="Application Title" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
      <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
      <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
      <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
      {/* <!-- Windows  --> */}
      <meta name="msapplication-navbutton-color" content="#ccb87d" />
      <meta name="msapplication-TileColor" content="#ccb87d" />
      <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      {/* <!-- Pinned Sites  --> */}
      <meta name="application-name" content="Application Name" />
      <meta name="msapplication-tooltip" content="Tooltip Text" />
      <meta name="msapplication-starturl" content="/" />
      {/* <!-- Tap highlighting  --> */}
      <meta name="msapplication-tap-highlight" content="no" />
      {/* <!-- UC Mobile Browser  --> */}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />
      {/* <!-- Disable night mode for this page  --> */}
      <meta name="nightmode" content="enable" />
      {/* <!-- Layout mode --> */}
      <meta name="layoutmode" content="fitscreen" />
      {/* <!-- imagemode - show image even in text only mode  --> */}
      <meta name="imagemode" content="force" />
      {/* <!-- Orientation  --> */}
      <meta name="screen-orientation" content="portrait"></meta>
    </Head>
  )
}
