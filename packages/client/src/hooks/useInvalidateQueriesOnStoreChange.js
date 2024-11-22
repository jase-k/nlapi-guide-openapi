import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useEndpointStore from '../store/endpointStore';
import { queryRefetchConfig } from '../config/queryRefetchConfig';

const useInvalidateQueriesOnStoreChange = () => {
  const queryClient = useQueryClient();
  const { latestEndpoints } = useEndpointStore();

  useEffect(() => {
    // Iterate over each query key and its corresponding configurations
    Object.entries(queryRefetchConfig).forEach(([queryKey, configs]) => {
      // Iterate over each condition for the current query key
      configs.forEach(({ endpoints, methods }) => {
        const shouldInvalidate = latestEndpoints.some((endpoint) => {
          return endpoints.some((pattern) => {
            const regex = new RegExp(`^${pattern.replace('*', '.*')}$`);
            return (
              regex.test(endpoint.path) &&
              methods.includes(endpoint.method.toUpperCase())
            );
          });
        });

        if (shouldInvalidate) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      });
    });
  }, [latestEndpoints, queryClient]);
};

export default useInvalidateQueriesOnStoreChange;
