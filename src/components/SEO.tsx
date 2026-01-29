import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  noIndex?: boolean;
  canonical?: string;
}

const SEO = ({
  title,
  description,
  noIndex = false,
  canonical,
}: SEOProps) => {
  const fullTitle = title.includes("Optenix")
    ? title
    : `${title} | Optenix`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph (Social Sharing) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
