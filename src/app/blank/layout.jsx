import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function Layout({ children }) {
  return <MainLayout>{children}</MainLayout>;
}
