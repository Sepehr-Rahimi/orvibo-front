import { MainLayout } from 'src/layouts/main';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <MainLayout cartIcon>{children}</MainLayout>;
}
