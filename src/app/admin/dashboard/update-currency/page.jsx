import React from 'react';

import { CONFIG } from 'src/config-global';

import { CurrencyUpdateView } from 'src/sections/currency/view/currency-update-view';

export const metadata = { title: `آپدیت قیمت محصولات | داشبورد - ${CONFIG.site.name}` };

const page = () => <CurrencyUpdateView />;

export default page;
