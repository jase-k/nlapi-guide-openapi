import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useActionStore from '../store/actionStore';
import { queryRefetchConfig } from '../config/queryRefetchConfig';

const useInvalidateQueriesOnStoreChange = () => {
  const queryClient = useQueryClient();
  const { latestActions } = useActionStore();

  const invalidateQueries = useCallback(() => {
    console.log('latestActions', latestActions);
    if (!latestActions || !Array.isArray(latestActions)) {
      return;
    }

    // Wrap in setTimeout to ensure DOM updates have completed
    setTimeout(() => {
      Object.entries(queryRefetchConfig).forEach(([queryKey, configs]) => {
        configs.forEach(({ endpoints, methods }) => {
          const shouldInvalidate = latestActions.some((endpoint) => {
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
  }, [latestActions, queryClient]);

  useEffect(() => {
    invalidateQueries();
  }, [invalidateQueries]);
};

export default useInvalidateQueriesOnStoreChange;
