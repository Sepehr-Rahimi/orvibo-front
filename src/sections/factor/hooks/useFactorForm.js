import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from 'src/hooks/use-debounce';

import { searchProducts, useGetProducts } from 'src/actions/product';
import { searchAddressess } from 'src/actions/addresses-ssr';
import { calculatePercentage, calculatePercentageByAmount } from 'src/utils/helper';
import { useGetIrrExchange } from 'src/actions/variables';

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

// selects the first variant not used by other rows of the same product
const findFirstAvailableVariant = (productId, variants, items) => {
  const usedVariants = new Set(
    items
      .filter((it) => it.product_id === productId && it.selectedVariantId)
      .map((it) => it.selectedVariantId)
  );
  return variants.find((v) => !usedVariants.has(v.id)) || variants[0] || null;
};

// pick correct variant for initial server item
const resolveSelectedVariant = (item) => {
  const variants = item.product?.variants || [];
  if (!variants.length) return null;

  // 1) match by variant.id provided by server
  if (item.variant) {
    const v = variants.find((x) => x.id === item.variant.id);
    if (v) return v;
  }

  // 2) match by color from server
  if (item.color) {
    const v = variants.find((x) => x.color === item.color);
    if (v) return v;
  }

  // 3) match by price
  const byPrice = variants.find((x) => x.price === item.price);
  if (byPrice) return byPrice;

  return variants[0];
};

// convert factorInfo.order_items → items state format
const buildInitialItems = (factorInfo) => {
  if (!factorInfo?.order_items) return [];

  return factorInfo.order_items.map((item) => {
    const product = item?.product;
    const variants = product?.variants || [];
    const selected = resolveSelectedVariant(item);

    return {
      name: product.name,
      price: item.price,
      quantity: item.quantity,
      stock: product.stock,
      product_id: product.id,
      variants,
      selectedVariantId: selected ? selected.id : null,
    };
  });
};

const buildInitialCosts = (factorInfo) => {
  const defaultValues = { shipping: 0, businessProfit: 0, guarantee: 0, services: 0 };
  if (!factorInfo) return defaultValues;

  const items_cost = computePrices(factorInfo.order_items);

  return {
    shipping: Math.round(calculatePercentageByAmount(factorInfo.shipping_cost, items_cost)),
    businessProfit: Math.round(calculatePercentageByAmount(factorInfo.business_profit, items_cost)),
    guarantee: Math.round(calculatePercentageByAmount(factorInfo.guarantee_cost, items_cost)),
    services: Math.round(calculatePercentageByAmount(factorInfo.service_cost, items_cost)),
  };
};

// compute pricing summary
const computePrices = (items) =>
  items?.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 0), 0);

/* -------------------------------------------------------------------------- */
/*  HOOK                                                                        */
/* -------------------------------------------------------------------------- */

export const useFactorForm = (factorInfo) => {
  /* ------------------------------- INIT DATA ------------------------------ */
  const initialItems = useMemo(() => buildInitialItems(factorInfo), [factorInfo]);
  const initialCosts = useMemo(() => buildInitialCosts(factorInfo), [factorInfo]);

  const totalProductsCost = useMemo(() => computePrices(initialItems), [initialItems]);

  const { exchange: storedExchange, dataLoading } = useGetIrrExchange();
  const currentExchange =
    factorInfo && factorInfo.irr_total_cost
      ? Math.round(factorInfo.irr_total_cost / factorInfo.total_cost)
      : null;

  const { products, productsLoading, productsError } = useGetProducts();

  /* ------------------------------- STATE ---------------------------------- */
  const [items, setItems] = useState(initialItems);

  // product search
  const [searchInput, setSearchInput] = useState('');
  // const debouncedInput = useDebounce(searchInput, 1000);
  const [searchItems, setSearchItems] = useState([]);

  // address search
  const [searchAddressInput, setSearchAddressInput] = useState('');
  const debouncedAddressInput = useDebounce(searchAddressInput, 800);
  const [addressResult, setAddressResult] = useState([]);
  const [addressEmpty, setAddressEmpty] = useState(false);

  // pricing + discount
  const [discountPercentage, setDiscount] = useState(
    factorInfo?.discount_amount
      ? Math.round((factorInfo.discount_amount / totalProductsCost) * 100)
      : 0
  );

  const [discountAmount, setDiscountAmount] = useState(0);
  const [productsPrice, setProductsPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [irrPrice, setIrrPrice] = useState(0);

  const [irrCalculation, setIrrCalculation] = useState({
    mode: 'stored',
    value: storedExchange,
  });

  const [selectedAddress, setSelectedAddress] = useState(factorInfo?.address ?? null);

  const [checkRevalidatePrice, setCheckRevalidatePrice] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [factorCosts, setFactorCost] = useState(initialCosts);

  /* -------------------------------------------------------------------------- */
  /*  EFFECTS: FETCHING                                                          */
  /* -------------------------------------------------------------------------- */

  // product search
  useEffect(() => {
    if (searchInput.length < 2) {
      setSearchItems([]);
      return;
    }

    if (!productsLoading && !productsError) {
      // console.log(products);
      setSearchItems(
        products.filter((singleProduct) =>
          singleProduct.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput, products, productsError, productsLoading]);

  // address search
  useEffect(() => {
    setAddressEmpty(false);

    if (debouncedAddressInput.length < 2) {
      setAddressResult([]);
      return;
    }

    searchAddressess({ search: debouncedAddressInput }).then((res) => {
      const addresses = res?.addresses || [];
      setAddressResult(addresses);
      setAddressEmpty(addresses.length === 0);
    });
  }, [debouncedAddressInput]);

  /* -------------------------------------------------------------------------- */
  /*  EFFECTS: PRICING                                                           */
  /* -------------------------------------------------------------------------- */

  // recalc products price
  useEffect(() => {
    setProductsPrice(computePrices(items));
  }, [items]);

  // recalc discount amount
  useEffect(() => {
    setDiscountAmount(calculatePercentage(discountPercentage, productsPrice));
  }, [productsPrice, discountPercentage]);

  // handle currency exchange value
  useEffect(() => {
    // console.log('called');
    if (irrCalculation.mode === 'stored') {
      // console.log('stored');
      setIrrCalculation((prev) => ({ ...prev, value: storedExchange }));
    } else if (irrCalculation.mode === 'current') {
      // console.log('current');
      setIrrCalculation((prev) => ({ ...prev, value: currentExchange }));
    }
  }, [irrCalculation.mode, storedExchange, currentExchange]);

  // recalc final price
  useEffect(() => {
    const additionalCosts = Object.keys(factorCosts).reduce(
      (cost, singleCost) => cost + calculatePercentage(+factorCosts[singleCost], productsPrice),
      0
    );
    const price =
      discountAmount > 0
        ? productsPrice + additionalCosts - discountAmount
        : productsPrice + additionalCosts;
    setFinalPrice(price);
    const IrrExchange = Math.round(price * irrCalculation.value);
    setIrrPrice(IrrExchange);
  }, [discountAmount, productsPrice, factorCosts, irrCalculation]);

  /* -------------------------------------------------------------------------- */
  /*  EFFECTS: PRICE REVALIDATION                                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (!factorInfo?.order_items) return;

    if (!checkRevalidatePrice) return;

    setItems((prev) =>
      prev.map((item) => {
        const orderItemInfo = factorInfo.order_items.find(
          (orderItem) => orderItem.product.id === item.product_id
        );
        if (!orderItemInfo) return item;

        const serverProduct = orderItemInfo.product;
        const serverVariant =
          serverProduct?.variants?.find((v) => v.id === item.selectedVariantId) ||
          serverProduct?.variants?.[0];

        if (!serverVariant) return item;

        return {
          ...item,
          price: serverVariant.price,
        };
      })
    );
  }, [checkRevalidatePrice, factorInfo]);

  /* -------------------------------------------------------------------------- */
  /*  ACTION HANDLERS                                                            */
  /* -------------------------------------------------------------------------- */

  const handleAddItemFromProduct = (product) => {
    const variants = product.variants || [];

    if (!variants.length) {
      setErrorMessage('این محصول نوع ندارد');
      return;
    }

    setItems((prev) => {
      const chosenVariant = findFirstAvailableVariant(product.id, variants, prev);
      return [
        ...prev,
        {
          name: product.name,
          quantity: 1,
          price: chosenVariant.price,
          stock: chosenVariant.stock || 0,
          product_id: product.id,
          variants,
          selectedVariantId: chosenVariant.id,
        },
      ];
    });

    // setSearchItems([]);
    // setSearchInput('');
    setErrorMessage('');
  };

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeQuantity = (index, newQty) => {
    // if (newQty < 1) {
    //   setErrorMessage('تعداد باید بزرگتر از صفر باشد');
    //   return;
    // }
    if (!Number(newQty) && newQty) return;

    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: newQty } : item)));
    setErrorMessage('');
  };

  const handleChangeVariant = (index, variantId) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        const variant = item.variants.find((v) => v.id === variantId);
        if (!variant) return item;

        return {
          ...item,
          selectedVariantId: variant.id,
          price: variant.price,
          stock: variant.stock,
        };
      })
    );

    setErrorMessage('');
  };

  const isVariantUsedElsewhere = (productId, variantId, index) =>
    items.some(
      (it, idx) =>
        idx !== index && it.product_id === productId && it.selectedVariantId === variantId
    );

  const isValidForSubmit = () => {
    if (items.length === 0) {
      setErrorMessage('هیچ محصولی در فاکتور وجود ندارد');
      return false;
    }

    if (!selectedAddress) {
      setErrorMessage('لطفا آدرس را انتخاب کنید');
      return false;
    }

    if (productsPrice <= 0) {
      setErrorMessage('مبلغ فاکتور نامعتبر است');
      return false;
    }

    const qtyValid = items.every((item) => {
      if (!item.quantity || item.quantity <= 0) {
        setErrorMessage(`تعداد محصول ${item.name} باید بیشتر از صفر باشد`);
        return false;
      }
      return true;
    });

    if (!qtyValid) return false;

    setErrorMessage('');
    return true;
  };

  const handleChangeFactorCosts = (name, value) => {
    if (value && !Number(value)) return;
    setFactorCost((prev) => ({ ...prev, [name]: Math.round(value) }));
  };

  const handleChangeIrrCalculation = (name, value) => {
    if (name === 'value' && (irrCalculation.mode !== 'manual' || !Number(value))) return;

    setIrrCalculation((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------------------------------------------------------------------- */

  return {
    items,
    factorCosts,
    irrPrice,
    irrCalculation,
    searchItems,
    searchInput,
    setSearchInput,
    searchAddressInput,
    setSearchAddressInput,
    addressResult,
    addressEmpty,
    discountPercentage,
    setDiscount,
    selectedAddress,
    setSelectedAddress,
    errorMessage,
    setErrorMessage,
    handleAddItemFromProduct,
    handleRemoveItem,
    handleChangeQuantity,
    handleChangeVariant,
    handleChangeFactorCosts,
    handleChangeIrrCalculation,
    productsPrice,
    discountAmount,
    finalPrice,
    isValidForSubmit,
    checkRevalidatePrice,
    setCheckRevalidatePrice,
    isVariantUsedElsewhere,
  };
};
