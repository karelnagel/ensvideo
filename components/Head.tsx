import Head from "next/head";

export function CustomHead({ nameIn, descriptionIn, imageIn }: { nameIn?: string; descriptionIn?: string; imageIn?: string }) {
  const name = nameIn || "ENS Video";
  const description = descriptionIn || "Personalized ENS videos";
  const url = process.env.NEXT_PUBLIC_URL ?? "https://ensvideo.vercel.app";
  const image = imageIn || `${url}/ens.png`;

  return (
    <Head>
      <title>{name}</title>
      <link rel="icon" href="/ens.svg" />
      <meta name="description" content={description} />
      <meta name="keywords" content="ethereum,ens,eth,video" />

      <meta name="og:title" content={name} />
      <meta name="og:url" content={url} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="website" />

      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
