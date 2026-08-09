import Script from "next/script";

export const GoogleAdSense = () => {
  const client = process.env.ADSENSE_CLIENT;

  if (process.env.NODE_ENV !== "production" || !client) {
    return null;
  }
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${client}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
};
