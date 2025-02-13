const PROJECT_ID = "2ahpkiw8";
const DATASET = "production";

const buildQuery = (query: string) => {
  return encodeURIComponent(query);
};

export type SanityResponse<T> = {
  result: T;
};

export const fetchSanityData = async <T>(
  query: string
): Promise<SanityResponse<T>> => {
  const encodedQuery = buildQuery(query);
  const url = `https://${PROJECT_ID}.api.sanity.io/v2025-02-05/data/query/${DATASET}?query=${encodedQuery}`;

  const response = await fetch(url);

  return response.json();
};
