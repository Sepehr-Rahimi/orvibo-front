import { useState, useEffect } from 'react';

import { useDebounce } from 'src/hooks/use-debounce';

import { searchProducts } from 'src/actions/product';
import { PRODUCT_COLOR_NAME_OPTIONS } from 'src/_mock';
import { searchAddressess } from 'src/actions/addresses-ssr';

export const useFactorForm = (factorInfo) => {
  // const { address, order_items, discount_amount } = factorInfo;

  let totalProductsCost = 0;
  if (factorInfo?.order_items) {
    totalProductsCost = factorInfo.order_items.reduce(
      (price, item) => price + item.price * item.quantity,
      0
    );
  }

  let prevItems = [];
  if (factorInfo?.order_items) {
    // console.log(factorInfo?.order_items);
    prevItems = [
      ...factorInfo.order_items.map((item) => {
        const { product } = item;
        const colorsName = product.colors.map(
          (colorHex) =>
            PRODUCT_COLOR_NAME_OPTIONS.find((option) => option.value === colorHex)?.label
        );
        const colorName = PRODUCT_COLOR_NAME_OPTIONS.find(
          (option) => option.value === item.color
        )?.label;
        return {
          name: product.name,
          price: item.price,
          quantity: item.quantity,
          stock: product.stock,
          product_id: product.id,
          colors: product.colors,
          colorsName,
          colorName,
        };
      }),
    ];
  }

  // console.log(totalProductsCost);

  const [items, setItems] = useState([...prevItems]);

  const [errorMessage, setErrorMessage] = useState('');

  const [searchItems, setSearchItems] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const debouncedInput = useDebounce(searchInput, 1000);

  const [searchAddressInput, setSearchAddressInput] = useState('');
  const [addressResult, setAddressResult] = useState([]);
  const [addressEmpty, setAddressEmpty] = useState(false);
  const debouncedAddressInput = useDebounce(searchAddressInput, 800);

  const [discountPercentage, setDiscount] = useState(
    factorInfo?.discount_amount
      ? Math.round((factorInfo.discount_amount / totalProductsCost) * 100)
      : 0
  );
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(factorInfo?.address ?? null);

  const [productsPrice, setProductsPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [checkRevalidatePrice, setCheckRevalidatePrice] = useState(false);

  // fetch products
  useEffect(() => {
    if (debouncedInput.length < 2) {
      setSearchItems([]);
      return;
    }
    searchProducts({ search: debouncedInput }).then((res) => setSearchItems(res.data.products));
  }, [debouncedInput]);

  // fetch addresses
  useEffect(() => {
    setAddressEmpty(false);
    if (debouncedAddressInput.length < 2) {
      setAddressResult([]);
      return;
    }
    searchAddressess({ search: debouncedAddressInput }).then((res) => {
      setAddressResult(res?.addresses);
      if (res?.addresses < 1) {
        setAddressEmpty(true);
      }
    });
  }, [debouncedAddressInput]);

  useEffect(() => {
    // let price = 0;
    // items.map((item) => {
    //   price += item.price * item.quantity;
    //   return price;
    // });
    const allProductsPrice =
      items.reduce((price, item) => price + item.price * item.quantity, 0) || 0;
    // console.log(allProductsPrice);
    setProductsPrice(allProductsPrice);
  }, [items, setProductsPrice]);

  // useEffect(() => {
  //   if (discount_amount && Number(discount_amount) !== 0) {
  //     console.log(productsPrice);
  //     const test = (productsPrice / Number(discount_amount)) * 100;
  //     // console.log(test);
  //   }
  //   console.log('excuted');
  // }, []);

  useEffect(
    () =>
      setDiscountAmount(
        discountPercentage && discountPercentage > 0
          ? Math.ceil((productsPrice * discountPercentage) / 100 / 10000) * 10000
          : 0
      ),

    [discountPercentage, productsPrice]
  );

  useEffect(() => {
    setFinalPrice(
      discountAmount && discountAmount > 0 ? productsPrice - discountAmount : productsPrice
    );
  }, [discountAmount, productsPrice]);

  useEffect(() => {
    // console.log(checkRevalidatePrice);
    setItems((prev) => [
      ...prev.map((item) => {
        const orderItemInfo = factorInfo?.order_items.find(
          (orderItem) => orderItem.product.id === item.product_id
        );
        // console.log(orderItemInfo);
        // console.log(item);
        if (!orderItemInfo) return { ...item };
        if (checkRevalidatePrice) {
          const { product } = orderItemInfo;
          return { ...item, price: product.price };
        }
        return { ...item, price: orderItemInfo.price };
      }),
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkRevalidatePrice]);

  const handleRemoveItem = (itemIndex) => {
    setItems((prev) => prev.filter((_, index) => index !== itemIndex));
  };

  const handleAddItem = (name, price, stock, id, colors) => {
    const colorsName = colors.map(
      (colorHex) => PRODUCT_COLOR_NAME_OPTIONS.find((option) => option.value === colorHex)?.label
    );
    const isExists = items.find((item) => item.product_id === id);
    if (isExists) {
      setErrorMessage('این محصول در فاکتور موجود است');
      return;
    }
    if (stock < 1) {
      setErrorMessage('محصول مورد نظر موجودی نداره');
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        name,
        quantity: 1,
        price,
        stock,
        product_id: id,
        colors,
        colorsName,
        colorName: colorsName[0],
      },
    ]);
    setSearchItems([]);
    setSearchInput('');
    setErrorMessage('');
  };

  const handleChangeQuantity = (index, newQuantity) => {
    if (newQuantity > items[index].stock) {
      setErrorMessage(`مقدار وارد شده بیشتر از موجودی محصول است. موجودی : ${items[index].stock}`);
      return;
    }
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
    setErrorMessage('');
  };

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

    const isQtyAndStockValid = !items.some((item) => {
      if (item.quantity <= 0) {
        setErrorMessage(`تعداد محصول ${item.name} باید بیشتر از صفر باشد`);
        return true;
      }
      if (item.quantity > item.stock) {
        setErrorMessage(`تعداد محصول ${item.name} از موجودی بیشتر است`);
        return true;
      }
      return false;
    });

    if (!isQtyAndStockValid) {
      // console.log(isQtyAndStockValid);
      // console.log('is called');
      return false;
    }

    // const isValidItems = items.forEach((item) => {
    //   if (item.quantity <= 0) {
    //     setErrorMessage(`تعداد محصول ${item.name} باید بیشتر از صفر باشد`);
    //   }
    //   if (item.quantity > item.stock) {
    //     setErrorMessage(`تعداد محصول ${item.name} از موجودی بیشتر است`);
    //   }
    // });

    setErrorMessage('');
    return true;
  };

  return {
    items,
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
    handleAddItem,
    handleRemoveItem,
    handleChangeQuantity,
    productsPrice,
    discountAmount,
    finalPrice,
    isValidForSubmit,
    checkRevalidatePrice,
    setCheckRevalidatePrice,
  };
};
