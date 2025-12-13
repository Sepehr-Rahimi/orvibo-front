import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { getBankAccount } from 'src/actions/bankAccounts';
import { useSearchParams } from 'next/navigation';

export const OrderDetailsBankAccountsEn = ({ setChoosedAccount, choosedAccount }) => {
  const params = useSearchParams();
  const showAccountForPrint = params.get('bank');
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    getBankAccount().then((res) => setBankAccounts(res.account));
  }, []);

  return (
    <Card
      className={`print-avoid-break ${showAccountForPrint === 'false' && 'printOff'}`}
      dir="ltr"
    >
      <Typography sx={{ px: 1, py: 1 }} variant="body1">
        Bank Account Information
      </Typography>

      <Box maxHeight={400} sx={{ overflowY: 'auto' }}>
        {bankAccounts.map((account) => {
          const showAccount = +showAccountForPrint === +account.id;
          return (
            <Box key={account.card_number} className={`${showAccount ? '' : 'printOff'}`}>
              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box display="flex" flexDirection="column" gap={2} px={3} py={2}>
                <Typography variant="body2">Account Holder: {account.name}</Typography>

                <Typography variant="body2">
                  Card Number: <span dir="ltr">{account.card_number}</span>
                </Typography>

                <Typography variant="body2">
                  IBAN: <span dir="ltr">{account.sheba_number}</span>
                </Typography>

                <Button
                  className="printOff"
                  variant={choosedAccount === account.id ? 'outlined' : 'contained'}
                  onClick={() =>
                    setChoosedAccount((prev) => (prev === account.id ? false : account.id))
                  }
                >
                  Select
                </Button>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};
