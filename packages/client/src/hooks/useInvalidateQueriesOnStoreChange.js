import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useEndpointStore from '../store/endpointStore';
import { queryRefetchConfig } from '../config/queryRefetchConfig';

const useInvalidateQueriesOnStoreChange = () => {
  const queryClient = useQueryClient();
  const { latestEndpoints } = useEndpointStore();

  const invalidateQueries = useCallback(() => {
    console.log('latestEndpoints', latestEndpoints);
    if (!latestEndpoints || !Array.isArray(latestEndpoints)) {
      return;
    }

    // Wrap in setTimeout to ensure DOM updates have completed
    setTimeout(() => {
      Object.entries(queryRefetchConfig).forEach(([queryKey, configs]) => {
        configs.forEach(({ endpoints, methods }) => {
          const shouldInvalidate = latestEndpoints.some((endpoint) => {
            if (!endpoint || !endpoint.path || !endpoint.method) return false;

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
    }, 0);
  }, [latestEndpoints, queryClient]);

  useEffect(() => {
    invalidateQueries();
  }, [invalidateQueries]);
};

export default useInvalidateQueriesOnStoreChange;
