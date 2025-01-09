import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useActionStore from '../store/actionStore';
import { queryRefetchConfig } from '../config/queryRefetchConfig';

const useInvalidateQueriesOnStoreChange = () => {
  const queryClient = useQueryClient();
  const { latestActions } = useActionStore();

  useEffect(() => {
    // Iterate over each query key and its corresponding configurations
    Object.entries(queryRefetchConfig).forEach(([queryKey, configs]) => {
      // Iterate over each condition for the current query key
      configs.forEach(({ endpoints, methods }) => {
        const shouldInvalidate = latestActions.some((action) => {
          return endpoints.some((pattern) => {
            const regex = new RegExp(`^${pattern.replace('*', '.*')}$`);
            const pathMatches = regex.test(action.path);
            const methodMatches =
              action.method && methods.includes(action.method.toUpperCase());

            return pathMatches && methodMatches;
          });
        });

        if (shouldInvalidate) {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        }
      });
    });
  }, [latestActions, queryClient]);
};

export default useInvalidateQueriesOnStoreChange;
