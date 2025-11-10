import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export function Form({ children, onSubmit, methods, id }) {
  return (
    <RHFForm {...methods}>
      <form onSubmit={onSubmit} noValidate autoComplete="off" id={id}>
        {children}
      </form>
    </RHFForm>
  );
}
