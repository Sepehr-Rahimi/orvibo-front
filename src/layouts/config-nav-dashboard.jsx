import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

const { roles } = CONFIG;

export const navData = [
  /**
   * Overview
   */
  // {
  //   subheader: 'Overview',
  //   items: [
  //     { title: 'App', path: paths.dashboard.root, icon: ICONS.dashboard },
  //     { title: 'Ecommerce', path: paths.dashboard.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'Analytics', path: paths.dashboard.general.analytics, icon: ICONS.analytics },
  //     { title: 'Banking', path: paths.dashboard.general.banking, icon: ICONS.banking },
  //     { title: 'Booking', path: paths.dashboard.general.booking, icon: ICONS.booking },
  //     { title: 'File', path: paths.dashboard.general.file, icon: ICONS.file },
  //     { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
  //   ],
  // },
  /**
   * Management
   */
  {
    subheader: 'مدیریت',
    items: [
      {
        title: 'حساب کاربری',
        path: paths.dashboard.user.account,
        roles: [CONFIG.roles.customer, CONFIG.roles.admin],
        icon: ICONS.user,
      },
      {
        title: 'کاربران',
        path: paths.adminDashboard.user.root,
        icon: (
          // ICONS.user
          <Iconify icon="solar:users-group-two-rounded-bold-duotone" />
        ),
        roles: [CONFIG.roles.admin],
        children: [
          // { title: 'Profile', path: paths.dashboard.user.root },
          // { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'لیست', path: paths.adminDashboard.user.list },
          // { title: 'ایجاد', path: paths.adminDashboard.user.new },
          // { title: 'ویرابش', path: paths.dashboard.user.demo.edit },
          // { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
      {
        title: 'محصولات',
        path: paths.adminDashboard.product.root,
        icon: ICONS.product,
        roles: [roles.admin],
        children: [
          { title: 'لیست', path: paths.adminDashboard.product.root },
          // { title: 'اطلاعات', path: paths.adminDashboard.product.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.product.new },
          // { title: 'ویرایش', path: paths.adminDashboard.product.demo.edit },
        ],
      },
      {
        title: 'دسته بندی ها',
        path: paths.adminDashboard.categories.root,
        icon: <Iconify icon="solar:align-left-bold" />,
        roles: [roles.admin],
        children: [
          { title: 'لیست', path: paths.adminDashboard.categories.root },
          // { title: 'اطلاعات', path: paths.adminDashboard.categories.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.categories.new },
          // { title: 'ویرایش', path: paths.adminDashboard.categories.demo.edit },
        ],
      },
      {
        title: 'برندها',
        path: paths.adminDashboard.brands.root,
        icon: <Iconify icon="solar:align-vertical-spacing-bold" />,
        roles: [roles.admin],
        children: [
          { title: 'لیست', path: paths.adminDashboard.brands.root },
          // { title: 'اطلاعات', path: paths.adminDashboard.brands.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.brands.new },
          // { title: 'ویرایش', path: paths.adminDashboard.brands.demo.edit },
        ],
      },
      {
        title: 'فاکتور',
        path: paths.adminDashboard.order.root,
        icon: <Iconify icon="solar:bill-list-linear" />,
        roles: [roles.admin],
        children: [
          // { title: 'لیست', path: paths.adminDashboard.categories.root },
          // { title: 'اطلاعات', path: paths.adminDashboard.categories.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.factor.new },
          // { title: 'ویرایش', path: paths.adminDashboard.categories.demo.edit },
        ],
      },
      // {
      //   title: 'Order',
      //   path: paths.dashboard.order.root,
      //   icon: ICONS.order,
      //   roles: [roles.admin],
      //   children: [
      //     { title: 'List', path: paths.dashboard.order.root },
      //     { title: 'Details', path: paths.dashboard.order.demo.details },
      //   ],
      // },
      {
        title: 'لیست سفارشات شما',
        path: paths.dashboard.order.root,
        roles: [roles.customer],
        icon: <Iconify icon="solar:reorder-bold" />,
      },
      // {
      //   title: 'Invoice',
      //   path: paths.dashboard.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'List', path: paths.dashboard.invoice.root },
      //     { title: 'Details', path: paths.dashboard.invoice.demo.details },
      //     { title: 'Create', path: paths.dashboard.invoice.new },
      //     { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
      //   ],
      // },
      {
        title: 'بلاگ',
        path: paths.dashboard.post.root,
        icon: ICONS.blog,
        roles: [roles.admin],
        children: [
          { title: 'لیست', path: paths.adminDashboard.post.root },
          // { title: 'Details', path: paths.adminDashboard.post.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.post.new },
          // { title: 'Edit', path: paths.adminDashboard.post.demo.edit },
        ],
      },
      {
        title: 'لیست سفارشات',
        path: paths.adminDashboard.order.root,
        roles: [roles.admin],
        icon: <Iconify icon="solar:reorder-bold" />,
      },
      {
        title: 'کدهای تخفیف',
        path: paths.adminDashboard.discountCodes.root,
        roles: [roles.admin],
        icon: <Iconify icon="tabler:discount-filled" />,
        children: [
          { title: 'لیست', path: paths.adminDashboard.discountCodes.root },
          // { title: 'Details', path: paths.adminDashboard.post.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.discountCodes.new },
          // { title: 'Edit', path: paths.adminDashboard.post.demo.edit },
        ],
      },
      {
        title: 'بنرها',
        path: paths.adminDashboard.banners.root,
        roles: [roles.admin],
        icon: <Iconify icon="material-symbols:planner-banner-ad-pt-rounded" />,
        children: [
          { title: 'لیست', path: paths.adminDashboard.banners.root },
          // { title: 'Details', path: paths.adminDashboard.post.demo.details },
          { title: 'ایجاد', path: paths.adminDashboard.banners.new },
          // { title: 'Edit', path: paths.adminDashboard.post.demo.edit },
        ],
      },
      {
        title: 'تغییر قیمت ها',
        path: paths.adminDashboard.updateCurrency,
        roles: [roles.admin],
        icon: <Iconify icon="solar:dollar-linear" />,
      },

      // {
      //   title: 'Job',
      //   path: paths.dashboard.job.root,
      //   icon: ICONS.job,
      //   children: [
      //     { title: 'List', path: paths.dashboard.job.root },
      //     { title: 'Details', path: paths.dashboard.job.demo.details },
      //     { title: 'Create', path: paths.dashboard.job.new },
      //     { title: 'Edit', path: paths.dashboard.job.demo.edit },
      //   ],
      // },
      // {
      //   title: 'Tour',
      //   path: paths.dashboard.tour.root,
      //   icon: ICONS.tour,
      //   children: [
      //     { title: 'List', path: paths.dashboard.tour.root },
      //     { title: 'Details', path: paths.dashboard.tour.demo.details },
      //     { title: 'Create', path: paths.dashboard.tour.new },
      //     { title: 'Edit', path: paths.dashboard.tour.demo.edit },
      //   ],
      // },
      // { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
      // {
      //   title: 'Mail',
      //   path: paths.dashboard.mail,
      //   icon: ICONS.mail,
      //   info: (
      //     <Label color="error" variant="inverted">
      //       +32
      //     </Label>
      //   ),
      // },
      // { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
      // { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
      // { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },
    ],
  },
  /**
   * Item State
   */
  // {
  //   subheader: 'Misc',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'Permission',
  //       path: paths.dashboard.permission,
  //       icon: ICONS.lock,
  //       roles: ['admin', 'manager'],
  //       caption: 'Only admin can see this item',
  //     },
  //     {
  //       title: 'Level',
  //       path: '#/dashboard/menu_level',
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: 'Level 1a',
  //           path: '#/dashboard/menu_level/menu_level_1a',
  //           children: [
  //             {
  //               title: 'Level 2a',
  //               path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
  //             },
  //             {
  //               title: 'Level 2b',
  //               path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
  //               children: [
  //                 {
  //                   title: 'Level 3a',
  //                   path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
  //                 },
  //                 {
  //                   title: 'Level 3b',
  //                   path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //         { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
  //       ],
  //     },
  //     {
  //       title: 'Disabled',
  //       path: '#disabled',
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },
  //     {
  //       title: 'Label',
  //       path: '#label',
  //       icon: ICONS.label,
  //       info: (
  //         <Label
  //           color="info"
  //           variant="inverted"
  //           startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
  //         >
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: 'Caption',
  //       path: '#caption',
  //       icon: ICONS.menuItem,
  //       caption:
  //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     },
  //     {
  //       title: 'Params',
  //       path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  //       icon: ICONS.parameter,
  //     },
  //     {
  //       title: 'External link',
  //       path: 'https://www.google.com/',
  //       icon: ICONS.external,
  //       info: <Iconify width={18} icon="prime:external-link" />,
  //     },
  //     { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
  //   ],
  // },
];
