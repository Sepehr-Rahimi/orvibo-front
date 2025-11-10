import { CONFIG } from 'src/config-global';
import { ComingSoonView } from 'src/sections/coming-soon/view';
import { FindView } from 'src/sections/find-what-you-want/view/find-view';

export const metadata = {
  title: ` چیزی که دنبالشی رو پیداکن - ${CONFIG.site.name}`,
};

const page = () => <FindView />;
// const page = () => <ComingSoonView />;

export default page;
