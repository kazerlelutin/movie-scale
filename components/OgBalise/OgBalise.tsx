import Head from "next/head";
import { useRouter } from "next/router";

interface props {
  readonly img?: string;
  readonly title?: string;
  readonly description?: string;
}

export default function OgBalise({ img, description, title }: props) {
  const router = useRouter(),
    baseUrl = "https://movie-scale.kazerlelutin.space/",
    baseTitle = "🎞 Movie Scale 🪜",
    defaultDescription = "Créez vos échelles pour classer les films préférés (ou pas) !"

  function matomo() {
    return {
      __html: `
          //<![CDATA[
            <!-- Matomo -->
            <script>
              var _paq = window._paq = window._paq || [];
              /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="//analytics.bouteiller.contact/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '5']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            </script>
            <!-- End Matomo Code -->
            //]]>
        `,
    };
  }

  return (
    <Head>
      <script dangerouslySetInnerHTML={matomo()} />
      <title>
        {title && `${title} | `} {baseTitle}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content={title ? `${title} | ` + baseTitle : baseTitle}
      />
      <meta property="og:image" content={img || `${baseUrl}fb.jpg`} />
      <meta
        property="og:url"
        content={`${baseUrl}${router.asPath !== "/" ? router.asPath : ""}`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:description"
        content={
          description ||
          defaultDescription
        }
      />
      <meta name="twitter:card" content="photo" />
      <meta name="twitter:site" content={baseUrl} />
      <meta
        name="twitter:title"
        content={title ? `${title} | ` + baseTitle : baseTitle}
      />
      <meta
        name="twitter:description"
        content={
          description ||
          defaultDescription
        }
      />
      <meta name="twitter:image" content={img || `${baseUrl}fb.jpg`} />
      <meta name="twitter:url" content={`${baseUrl}${router.asPath}`} />
    </Head>
  );
}
