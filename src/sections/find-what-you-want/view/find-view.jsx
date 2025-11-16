'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import { Box, Stack, Container, Typography } from '@mui/material';

// import { trackMatomoEvent } from 'src/utils/helper';

import { useGetRecommendProducts } from 'src/actions/recommed';

import ChatBubble from '../chat-bubble';
import { AiSearchInput, gradientAnimation } from '../../home/home-ai-search';

export const FindView = ({ ...params }) => {
  const searchParams = useSearchParams();
  const newSearchInput = searchParams.get('search') || '';
  const [chatHistory, setChatHistory] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const { products, productsLoading, productsError } = useGetRecommendProducts(searchInput);

  // const {
  //   searchResults: products,
  //   searchLoading: productsLoading,
  //   searchError: productsError,
  // } = useSearchProducts({
  //   params: {
  //     search: searchInput,
  //   },
  // });

  useEffect(() => {
    if (searchInput) setChatHistory((prev) => [...prev, { sender: 'user', message: searchInput }]);
    // trackMatomoEvent('user-search', { whereSearch: 'ai page', userSearch: searchInput });
  }, [searchInput]);

  useEffect(() => setSearchInput(newSearchInput), [newSearchInput]);

  useEffect(() => {
    // console.log(products);
    const aiReply = {
      sender: 'ai',
      products,
    };
    if (productsError || products?.message) {
      setChatHistory((prev) => [...prev, { sender: 'ai', message: 'somthing went wrong' }]);
    }
    if (!productsLoading && searchInput) {
      setChatHistory((prev) => [...prev, aiReply]);
    }
  }, [products, productsLoading, searchInput, productsError]);

  return (
    <Container>
      <Stack
        sx={{
          mb: 15,
          p: 2,
          Height: '100vh',
          mx: 'auto',
        }}
        direction="column"
      >
        {chatHistory.length > 0 ? (
          <Stack sx={{ flexGrow: 1, overflowY: 'visible', pr: 1 }} direction="column" gap={1}>
            {chatHistory.map((message) =>
              message.sender === 'user' ? (
                <ChatBubble sender={message.sender} text={message.message} />
              ) : (
                <ChatBubble sender={message.sender} products={message.products} />
              )
            )}
            {productsLoading && <ChatBubble sender="ai" text="درحال جست و جو" />}
          </Stack>
        ) : (
          <Typography
            variant="h4"
            sx={{
              mt: '45vh',
              mx: 'auto',
              background: 'linear-gradient(270deg, #d300eb, #8d00eb, #2a0236)',
              backgroundSize: '600% 600%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${gradientAnimation} 5s ease infinite`,
            }}
          >
            محصولی که دنبالشی رو پیداکن
          </Typography>
        )}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'background.paper',
            zIndex: 10,
            opacity: '.95',
            py: 2,
            borderTop: 1,
            borderColor: 'lightgray',
          }}
        >
          <Box
            sx={{
              width: { md: '60%', xs: '95%' },
              mx: 'auto',
            }}
          >
            <AiSearchInput defaultValue={searchInput} />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};
