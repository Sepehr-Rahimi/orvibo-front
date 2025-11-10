import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export const metadata = {
  robots: 'noindex, nofollow',
};

export default function Layout({ children }) {
  return <SimpleLayout content={{ compact: true }}>{children}</SimpleLayout>;
}
