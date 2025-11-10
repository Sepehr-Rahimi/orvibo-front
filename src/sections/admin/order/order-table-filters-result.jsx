import { useCallback } from 'react';

import { FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function OrderTableFiltersResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState({ status: 'all' });
  }, [filters, onResetPage]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState({ startDate: null, endDate: null });
  }, [filters, onResetPage]);

  const handleRemovePaymentStatus = useCallback(() => {
    onResetPage();
    filters.setState({ paymentStatus: '' });
  }, [filters, onResetPage]);

  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      {/* <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={
            ORDER_STATUS_OPTIONS.find((option) => option.value === filters.state.status)?.label
          }
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock
        label="Date:"
        isShow={Boolean(filters.state.startDate && filters.state.endDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>

      <FiltersBlock label="payment status:" isShow={Boolean(filters.state.paymentStatus)}>
        <Chip
          {...chipProps}
          label={
            ORDER_PAYMENT_STATUS.find((option) => option.value === filters.state.paymentStatus)
              ?.label
          }
          onDelete={handleRemovePaymentStatus}
        />
      </FiltersBlock> */}

      {/* <FiltersBlock label="شماره سفارش:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock> */}
    </FiltersResult>
  );
}
