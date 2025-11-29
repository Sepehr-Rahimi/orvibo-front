'use client';

import { useMemo, Suspense, useEffect, useCallback, createContext } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { getStorage, useLocalStorage } from 'src/hooks/use-local-storage';

import { calculatePercentage, getCurrentPrice } from 'src/utils/helper';

import { PRODUCT_CHECKOUT_STEPS } from 'src/_mock/_product';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export const CheckoutContext = createContext(undefined);

export const CheckoutConsumer = CheckoutContext.Consumer;

const STORAGE_KEY = 'app-checkout';

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  businessProfit: 0,
  typeOfShipping: 1,
  typeOfPayment: 1,
  billing: null,
  services: 0,
  guarantee: 0,
  totalItems: 0,
};

// ----------------------------------------------------------------------

export function CheckoutProvider({ children }) {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Container>{children}</Container>
    </Suspense>
  );
}

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const activeStep = Number(searchParams.get('step'));

  const { state, setState, setField, canReset, resetState } = useLocalStorage(
    STORAGE_KEY,
    initialState
  );

  const completed = activeStep === PRODUCT_CHECKOUT_STEPS.length;

  const updateTotalField = useCallback(() => {
    const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);

    const subtotal = state.items.reduce((total, item) => {
      const price = getCurrentPrice(item.price, item.discount_price);
      return total + item.quantity * price;
    }, 0);

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('businessProfit', calculatePercentage(10, state.subtotal));
    setField('shipping', calculatePercentage(40, state.subtotal));
    setField(
      'total',
      state.subtotal -
        state.discount +
        state.shipping +
        state.guarantee +
        state.services +
        state.businessProfit
    );
  }, [
    setField,
    state.discount,
    state.items,
    state.shipping,
    state.subtotal,
    state.guarantee,
    state.services,
    state.businessProfit,
  ]);

  useEffect(() => {
    const restoredValue = getStorage(STORAGE_KEY);
    if (restoredValue) {
      updateTotalField();
    }
  }, [updateTotalField]);

  const initialStep = useCallback(() => {
    if (!activeStep) {
      const href = createUrl('go', 0);
      router.push(href);
    }
  }, [activeStep, router]);

  const onBackStep = useCallback(() => {
    const href = createUrl('back', activeStep);
    router.push(href);
  }, [activeStep, router]);

  const onNextStep = useCallback(() => {
    const href = createUrl('next', activeStep);
    router.push(href);
  }, [activeStep, router]);

  const onGotoStep = useCallback(
    (step) => {
      const href = createUrl('go', step);
      router.push(href);
    },
    [router]
  );

  const onAddToCart = useCallback(
    (newItem) => {
      const isSame = (item) => item.variant_id === newItem.variant_id;

      const updatedItems = state.items.map((item) => {
        if (isSame(item)) {
          // const colorsAdded = [...item.colors, ...newItem.colors];

          // const colors = colorsAdded.filter((color, index) => colorsAdded.indexOf(color) === index);

          return {
            ...item,
            quantity: item.quantity + newItem.quantity,
            price: newItem?.price ?? item.price,
            discount_price: newItem?.discount_price ?? item.discount_price,
          };
        }
        return item;
      });

      if (!updatedItems.some((item) => isSame(item))) {
        updatedItems.push({ ...newItem, cartItemId: updatedItems.length + 1 });
      }

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onDeleteCart = useCallback(
    (variant_id) => {
      const updatedItems = state.items.filter((item) => item.variant_id !== variant_id);

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onIncreaseQuantity = useCallback(
    (variant_id) => {
      const updatedItems = state.items.map((item) => {
        if (item.variant_id === variant_id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (variant_id) => {
      const updatedItems = state.items.map((item) => {
        if (item.variant_id === variant_id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onCreateBilling = useCallback(
    (address) => {
      setField('billing', address);

      onNextStep();
    },
    [onNextStep, setField]
  );

  // const onAddGuarantee = useCallback(
  //   (price) => {
  //     setField('guarantee', price);
  //   },
  //   [setField]
  // );

  // const onAddService = useCallback(
  //   (price) => {
  //     setField('services', price);
  //   },
  //   [setField]
  // );

  const onApplyDiscount = useCallback(
    (discount, code) => {
      setField('discount', discount);
      setField('discount_code', code);
    },
    [setField]
  );

  const onApplyShipping = useCallback(
    (shipping, typeOfShipping) => {
      setField('shipping', shipping);
      setField('typeOfShipping', typeOfShipping);
    },
    [setField]
  );

  // const onApplyPayment = useCallback(
  //   (typeOfPayment) => {
  //     setField('typeOfPayment', typeOfPayment);
  //   },
  //   [setField]
  // );

  const onDeleteField = useCallback(
    (fieldName) => {
      setField(fieldName, null);
    },
    [setField]
  );

  // Reset
  const onReset = useCallback(() => {
    if (completed) {
      resetState();
      router.push(paths.product.root);
    }
  }, [completed, resetState, router]);

  const resetCart = useCallback(() => {
    resetState();
  }, [resetState]);

  const onUpdateItems = useCallback(
    (updatedItems) => {
      setField('items', updatedItems);
    },
    [setField]
  );

  const memoizedValue = useMemo(
    () => ({
      ...state,
      resetCart,
      canReset,
      onReset,
      onUpdate: setState,
      onUpdateField: setField,
      onUpdateItems,
      //
      completed,
      //
      onDeleteField,
      //
      onAddToCart,
      onDeleteCart,
      //
      onIncreaseQuantity,
      onDecreaseQuantity,
      //
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      //
      activeStep,
      initialStep,
      onBackStep,
      onNextStep,
      onGotoStep,
      //
      // onAddGuarantee,
      // onAddService,
    }),
    [
      state,
      resetCart,
      canReset,
      onReset,
      setState,
      setField,
      onUpdateItems,
      completed,
      onDeleteField,
      onAddToCart,
      onDeleteCart,
      onIncreaseQuantity,
      onDecreaseQuantity,
      onCreateBilling,
      onApplyDiscount,
      activeStep,
      initialStep,
      onBackStep,
      onNextStep,
      onGotoStep,
      onApplyShipping,
      // onAddGuarantee,
      // onAddService,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}

// ----------------------------------------------------------------------

function createUrl(type, activeStep) {
  const step = { back: activeStep - 1, next: activeStep + 1, go: activeStep }[type];

  const stepParams = new URLSearchParams({ step: `${step}` }).toString();

  return `${paths.product.checkout}?${stepParams}`;
}
