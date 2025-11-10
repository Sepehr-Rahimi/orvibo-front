import { CONFIG } from 'src/config-global';

import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Kanban | داشبورد - ${CONFIG.site.name}` };

export default function Page() {
  return <KanbanView />;
}
