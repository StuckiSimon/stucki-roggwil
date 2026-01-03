import { SearchParam } from '@/core/router/search-param.ts';

type QueryParamTuple = [SearchParam, undefined | string | string[]];

export const buildQueryParams = (...tuples: QueryParamTuple[]): string => {
  const searchParams = new URLSearchParams();
  tuples.forEach(([param, value]) => {
    if (value === undefined) {
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(param, item);
      });
    } else {
      searchParams.append(param, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};
