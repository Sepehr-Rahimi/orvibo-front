'use client';

import { useMemo, Suspense, useEffect, useCallback, createContext } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { getStorage, useLocalStorage } from 'src/hooks/use-local-storage';

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
  typeOfShipping: 1,
  typeOfPayment: 1,
  billing: null,
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
      const price =
        item.discount_price && item.discount_price > 0 ? item.discount_price : item.price;
      return total + item.quantity * price;
    }, 0);

    setField('subtotal', subtotal);
    setField('totalItems', totalItems);
    setField('total', state.subtotal - state.discount + state.shipping);
  }, [setField, state.discount, state.items, state.shipping, state.subtotal]);

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
      const isSame = (item) =>
        item.id === newItem.id &&
        item.colors === newItem.colors &&
        item.kinds === newItem.kinds &&
        item.size === newItem.size;

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
    (cartItemId) => {
      const updatedItems = state.items.filter((item) => item.cartItemId !== cartItemId);

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onIncreaseQuantity = useCallback(
    (cartItemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.cartItemId === cartItemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      setField('items', updatedItems);
    },
    [setField, state.items]
  );

  const onDecreaseQuantity = useCallback(
    (cartItemId) => {
      const updatedItems = state.items.map((item) => {
        if (item.cartItemId === cartItemId) {
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

  const onApplyPayment = useCallback(
    (typeOfPayment) => {
      setField('typeOfPayment', typeOfPayment);
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
      onAddToCart,
      onDeleteCart,
      //
      onIncreaseQuantity,
      onDecreaseQuantity,
      //
      onCreateBilling,
      onApplyDiscount,
      onApplyShipping,
      onApplyPayment,
      //
      activeStep,
      initialStep,
      onBackStep,
      onNextStep,
      onGotoStep,
    }),
    [
      state,
      resetCart,
      onReset,
      canReset,
      setField,
      completed,
      setState,
      activeStep,
      onBackStep,
      onGotoStep,
      onNextStep,
      initialStep,
      onAddToCart,
      onDeleteCart,
      onApplyDiscount,
      onApplyShipping,
      onCreateBilling,
      onDecreaseQuantity,
      onIncreaseQuantity,
      onApplyPayment,
      onUpdateItems,
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
