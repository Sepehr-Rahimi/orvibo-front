import { CONFIG } from 'src/config-global';
import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export const metadata = { title: `به زودی - ${CONFIG.site.name}`, robots: 'noindex, nofollow' };

export default function Layout({ children }) {
  return <SimpleLayout content={{ compact: true }}>{children}</SimpleLayout>;
}
