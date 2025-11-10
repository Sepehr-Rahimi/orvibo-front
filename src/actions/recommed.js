import useSWR from 'swr';
import { useMemo } from 'react';

import axiosInstance, { endpoints, fetcher, fetcherWithPost } from 'src/utils/axios';

// function cosineSimilarity(vecA, vecB) {
//   const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
//   const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
//   const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
//   return dotProduct / (magnitudeA * magnitudeB);
// }

const swrOptions = {
  // revalidateIfStale: true,
  // revalidateOnFocus: true,
  // revalidateOnReconnect: true,
};

export function useGetRecommendProducts(input) {
  const { data, isLoading, error, isValidating } = useSWR(
    input ? [endpoints.recommend.get, { text: input }] : null,
    fetcherWithPost,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      products: data?.resault || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data?.resault.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;

  // const inputEmbedding = await getEmbedding(input);

  //   const results = products
  //     .map((product) => ({
  //       ...product,
  //       score: cosineSimilarity(inputEmbedding.slice(0, 10), product.embedding), // truncate for demo
  //     }))
  //     .sort((a, b) => b.score - a.score)
  //     .slice(0, 3); // top 3

  //   return results;
}
