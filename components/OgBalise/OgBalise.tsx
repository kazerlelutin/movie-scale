import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { typeOfConsent } from "../../types/typeOfConsent.interface";
import Consent from "../Consent/Consent";

interface props {
  readonly img?: string;
  readonly title?: string;
  readonly description?: string;
}

const CONSENT = "movie_scale_kll_CONSENT"

export default function OgBalise({ img, description, title }: props) {
  const  [consent, setConsent] = useState<typeOfConsent>(),
  router = useRouter(),
    baseUrl = "https://movie-scale.kazerlelutin.space/",
    baseTitle = "🎞 Movie Scale 🪜",
    defaultDescription =
      "Créez vos échelles pour classer les films préférés (ou pas) !";

      useEffect(() => {
        const ls: any | undefined = localStorage.getItem(CONSENT);
        setConsent(ls || typeOfConsent.FIRST_SEEN);
      }, []);
    
      function handleAccept(consentType:typeOfConsent) {
        localStorage.setItem(CONSENT, consentType);
        setConsent(consentType)
      }

  function matomo() {
    return {
      __html: `
      //<![CDATA[
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
          var u="//analytics.bouteiller.contact/";
          _paq.push(['setTrackerUrl', u+'matomo.php']);
          _paq.push(['setSiteId', '5']);
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
        //]]>
    `,
    };
  }

  return <>
    <Head>
      {consent === typeOfConsent.CONSENT && <script dangerouslySetInnerHTML={matomo()} />}
      <title>
        {title && `${title} | `} {baseTitle}
      </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        property="og:title"
        content={title ? `${title} | ` + baseTitle : baseTitle}
      />
      <meta property="og:image" content={img || `${baseUrl}fb.png`} />
      <meta
        property="og:url"
        content={`${baseUrl}${router.asPath !== "/" ? router.asPath : ""}`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:card" content="photo" />
      <meta name="twitter:site" content={baseUrl} />
      <meta
        name="twitter:title"
        content={title ? `${title} | ` + baseTitle : baseTitle}
      />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={img || `${baseUrl}fb.png`} />
      <meta name="twitter:url" content={`${baseUrl}${router.asPath}`} />
    </Head>
    {!consent || consent === typeOfConsent.FIRST_SEEN && <Consent setter={handleAccept} />}
  </>
}
