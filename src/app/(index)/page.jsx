import { CONFIG } from 'src/config-global';
import { getBanners } from 'src/actions/banners-ssr';
import { getProducts } from 'src/actions/product-ssr';

import LandingView from 'src/sections/home/view/landing-view';

export const metadata = () => {
  const siteUrl = CONFIG.site.baseURL;

  const siteName = CONFIG.site.name;

  const image = `${CONFIG.site.baseURL}/logo/logo-full.png`;

  const description = `${siteName}، مرجع خرید آنلاین انواع گجت، لوازم دیجیتال و تجهیزات هوشمند خانه و محل کار با بهترین قیمت و ضمانت اصالت کالا. ارسال سریع به سراسر ایران.`;

  const title = `فروشگاه ${siteName} | خرید آنلاین گجت، لوازم دیجیتال و تجهیزات هوشمند با بهترین قیمت`;

  return {
    title,
    description,
    robots: 'index, follow',
    alternates: { canonical: siteUrl },
    openGraph: {
      title: siteName,
      description,
      url: siteUrl,
      siteName,
      images: [{ url: image, width: 1200, height: 630, alt: siteName }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description,
      images: [image],
    },
  };
};

const LandingPage = async () => {
  // const products = await getProducts({
  //   page: 1,
  //   limit: 4,
  //   featured: true,
  // });
  const bannersData = await getBanners();
  // const [featureProducts, banners] = await Promise.all([
  //   getProducts({ params: { page: 1, limit: 4, featured: true } }),
  //   getBanners(),
  // ]);
  // console.log('products :', products);
  // console.log('banners :', banners);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: CONFIG.site.name,
    url: CONFIG.site.baseURL,
    logo: `${CONFIG.site.baseURL}/logo/logo-full.png`,
    sameAs: ['https://www.instagram.com/noyanstore.ir'],
    description: 'نویان استور مرجع خرید آنلاین انواع گجت و لوازم دیجیتال با قیمت مناسب و پشتیبانی.',
  };
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <LandingView banners={bannersData.data} />{' '}
    </>
  );
};
// const LandingPage = () => <SplashScreen />;

export default LandingPage;
