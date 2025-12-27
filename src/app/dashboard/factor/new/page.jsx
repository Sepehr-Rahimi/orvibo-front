import React from 'react';

import { CONFIG } from 'src/config-global';

import { CreateFactorView } from 'src/sections/factor/view/create-factor-view';

export const metadata = { title: `ایجاد فاکتور | داشبورد - ${CONFIG.site.name}` };

const page = () => <CreateFactorView />;

export default page;
