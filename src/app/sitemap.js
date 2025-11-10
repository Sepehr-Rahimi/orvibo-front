import { paths } from '../routes/paths';
import { getBlogs } from '../actions/blog-ssr';
import { getBrands } from '../actions/brands-ssr';
import { getProducts } from '../actions/product-ssr';
import { getAllCategoriesList } from '../actions/categories-ssr';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch dynamic data
  const { products } = await getProducts();

  const { data: blogs } = await getBlogs();

  const { data: brands } = await getBrands();

  const { data: categories } = await getAllCategoriesList();

  // Static pages
  const staticPages = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    {
      url: `${baseUrl}${paths.blogs}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${paths.product.root}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${paths.category}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}${paths.contact}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${paths.privacy}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${paths.terms}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];

  // Dynamic product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}${paths.product.details(product.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic blog pages
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}${paths.blog.details(blog.title)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // Dynamic brand pages
  const brandPages = brands.map((brand) => ({
    url: `${baseUrl}${paths.product.byBrand(brand.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic category pages
  const categoriesPages = categories.map((category) => ({
    url: `${baseUrl}${paths.product.byCategory(category.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Combine all pages into the sitemap
  return [...staticPages, ...productPages, ...blogPages, ...brandPages, ...categoriesPages];
}

// Optional: Revalidate the sitemap every hour
export const revalidate = 3600; // 1 hour in seconds
