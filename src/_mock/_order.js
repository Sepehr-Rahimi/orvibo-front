import { _mock } from './_mock';

// ----------------------------------------------------------------------

// export const ORDER_STATUS_OPTIONS = [
//   { value: '1', label: 'سفارش ثبت شده', theme:{backgroundColor: '',color:''} },
//   { value: '2', label: 'سفارش تحویل داده شده', hex: '#E8F5E9' },
//   { value: '3', label: 'سفارش لغو شده', hex: '#FFEBEE' },
//   { value: '4', label: 'سفارش عودت داده شده', hex: '#FFF8E1' },
// ];

// export const ORDER_PAYMENT_STATUS = [
//   { value: 0, label: 'پرداخت نشده' },
//   { value: 1, label: 'پرداخت شده' },
//   { value: 2, label: 'مبلغ عودت داده شده' },
// ];

export const ORDER_STATUS_OPTIONS = [
  {
    value: '1',
    label: 'سفارش ثبت شده',
    theme: {
      backgroundColor: '#E3F2FD',
      color: '#1976D2',
    },
  },
  {
    value: '2',
    label: 'سفارش تحویل داده شده',
    theme: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
    },
  },
  {
    value: '3',
    label: 'سفارش لغو شده',
    theme: {
      backgroundColor: '#FFEBEE',
      color: '#C62828',
    },
  },
  {
    value: '4',
    label: 'سفارش برگشت داده شده',
    theme: {
      backgroundColor: '#FFF8E1',
      color: '#F9A825',
    },
  },
];

export const ORDER_PAYMENT_STATUS = [
  {
    value: 0,
    label: 'پرداخت نشده',
    theme: {
      backgroundColor: '#FFEBEE',
      color: '#C62828',
    },
  },
  {
    value: 1,
    label: 'پرداخت شده',
    theme: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
    },
  },
  {
    value: 2,
    label: 'مبلغ عودت داده شده',
    theme: {
      backgroundColor: '#FFF8E1',
      color: '#F9A825',
    },
  },
];

export const ORDER_STATUS_OPTIONS_EN = [
  {
    value: '1',
    label: 'Order Placed',
    theme: {
      backgroundColor: '#E3F2FD',
      color: '#1976D2',
    },
  },
  {
    value: '2',
    label: 'Order Delivered',
    theme: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
    },
  },
  {
    value: '3',
    label: 'Order Canceled',
    theme: {
      backgroundColor: '#FFEBEE',
      color: '#C62828',
    },
  },
  {
    value: '4',
    label: 'Order Returned',
    theme: {
      backgroundColor: '#FFF8E1',
      color: '#F9A825',
    },
  },
];

export const ORDER_PAYMENT_STATUS_EN = [
  {
    value: 0,
    label: 'Unpaid',
    theme: {
      backgroundColor: '#FFEBEE',
      color: '#C62828',
    },
  },
  {
    value: 1,
    label: 'Paid',
    theme: {
      backgroundColor: '#E8F5E9',
      color: '#2E7D32',
    },
  },
  {
    value: 2,
    label: 'Refunded',
    theme: {
      backgroundColor: '#FFF8E1',
      color: '#F9A825',
    },
  },
];

export const blockedTransitions = {
  1: ['2', '3'],
  2: ['4'],
  3: ['1'],
  4: ['1'],
};

const ITEMS = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  sku: `16H9UR${index}`,
  quantity: index + 1,
  name: _mock.productName(index),
  coverUrl: _mock.image.product(index),
  price: _mock.number.price(index),
}));

export const _orders = [...Array(20)].map((_, index) => {
  const shipping = 10;

  const discount = 10;

  const taxes = 10;

  const items = (index % 2 && ITEMS.slice(0, 1)) || (index % 3 && ITEMS.slice(1, 3)) || ITEMS;

  const totalQuantity = items.reduce((accumulator, item) => accumulator + item.quantity, 0);

  const subtotal = items.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

  const totalAmount = subtotal - shipping - discount + taxes;

  const customer = {
    id: _mock.id(index),
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
    ipAddress: '192.158.1.38',
  };

  const delivery = { shipBy: 'DHL', speedy: 'Standard', trackingNumber: 'SPX037739199373' };

  const history = {
    orderTime: _mock.time(1),
    paymentTime: _mock.time(2),
    deliveryTime: _mock.time(3),
    completionTime: _mock.time(4),
    timeline: [
      { title: 'Delivery successful', time: _mock.time(1) },
      { title: 'Transporting to [2]', time: _mock.time(2) },
      { title: 'Transporting to [1]', time: _mock.time(3) },
      { title: 'The shipping unit has picked up the goods', time: _mock.time(4) },
      { title: 'Order has been created', time: _mock.time(5) },
    ],
  };

  return {
    id: _mock.id(index),
    orderNumber: `#601${index}`,
    createdAt: _mock.time(index),
    taxes,
    items,
    history,
    subtotal,
    shipping,
    discount,
    customer,
    delivery,
    totalAmount,
    totalQuantity,
    shippingAddress: {
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      phoneNumber: '365-374-4961',
    },
    payment: { cardType: 'mastercard', cardNumber: '**** **** **** 5678' },
    status:
      (index % 2 && 'completed') ||
      (index % 3 && 'pending') ||
      (index % 4 && 'cancelled') ||
      'refunded',
  };
});
