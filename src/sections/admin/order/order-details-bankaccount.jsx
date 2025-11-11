import React, { useEffect, useState } from 'react';

import { Box, Button, Card, Divider, Typography } from '@mui/material';

import { getBankAccount } from 'src/actions/bankAccounts';

export const OrderDetailsBankAccounts = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [chooseAccount, setChooseAccount] = useState(false);

  useEffect(() => {
    getBankAccount().then((res) => setBankAccounts(res.account));
  }, []);

  return (
    <Card className={`print-avoid-break ${!chooseAccount && 'printOff'}`}>
      <Typography sx={{ px: 1, py: 1 }} variant="body1">
        اطلاعات حساب بانکی
      </Typography>
      <Box maxHeight={400} sx={{ overflowY: 'auto' }}>
        {bankAccounts.map((account) => (
          <Box
            key={account.card_number}
            className={`${chooseAccount !== account.card_number && 'printOff'}`}
          >
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box display="flex" flexDirection="column" gap={2} px={3} py={2}>
              <Typography variant="body2">به نام : {account.name}</Typography>
              <Typography variant="body2">
                شماره کارت : <span dir="ltr">{account.card_number} </span>
              </Typography>
              <Typography variant="body2">شماره شبا : {account.sheba_number}</Typography>
              <Button
                className="printOff"
                variant={chooseAccount === account.card_number ? 'outlined' : 'contained'}
                onClick={() =>
                  setChooseAccount((prev) =>
                    prev === account.card_number ? false : account.card_number
                  )
                }
              >
                انتخاب
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
