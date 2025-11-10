import { CONFIG } from 'src/config-global';

import { ChatView } from 'src/sections/chat/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Chat | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <ChatView />;
}
