import { m } from 'framer-motion';
import { useRef, useEffect } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { EmptyContent } from 'src/components/empty-content';

import { gradientAnimation } from '../home/home-ai-search';
import { ProductMessageList } from './product-message-list';

export default function ChatBubble({ sender, text, products }) {
  const isUser = sender === 'user';
  const isAiMessage = !isUser && text;
  const bottomRef = useRef();

  const renderNotFound = <EmptyContent filled sx={{ py: 10 }} />;

  useEffect(() => {
    if (isUser || isAiMessage) bottomRef.current?.scrollIntoView();
  });

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-start' : 'flex-end',
      }}
      ref={bottomRef}
    >
      <Box
        sx={{
          px: 2,
          py: 1,
          borderRadius: 3,
          borderTopRightRadius: !isUser ? 0 : 'auto',
          borderTopLeftRadius: isUser ? 0 : 'auto',
          maxWidth: { xs: '80%', md: '75%', sm: '50%' },
          color: isUser ? 'common.white' : 'common.black',
          ...(isUser
            ? {
                bgcolor: 'primary.main',
              }
            : isAiMessage
              ? {
                  background: 'linear-gradient(270deg, #d300eb, #8d00eb, #2a0236)',
                  backgroundSize: '600% 600%',
                  animation: `${gradientAnimation} 5s ease infinite`,
                  color: 'white',
                }
              : {
                  bgcolor: '#f9f9fb',
                }),
        }}
      >
        {text ? (
          <Typography variant="body1" className={`${isAiMessage && 'dot-animation'}`}>
            {text}
            <span className="dots" />
          </Typography>
        ) : products ? (
          products.length > 0 ? (
            <Stack>
              <ProductMessageList products={products} />
            </Stack>
          ) : (
            renderNotFound
          )
        ) : null}
      </Box>
    </m.div>
  );
}
