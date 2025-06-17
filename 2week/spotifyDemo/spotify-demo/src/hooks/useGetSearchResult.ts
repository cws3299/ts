import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "../api/searchApt";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetSearchResult = (params: SearchRequestParams) => {
  const clientToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["search", params],
    enabled: !!clientToken && !!params.q?.trim(),
    queryFn: () => {
      if (!clientToken) throw new Error("No Token available");

      const paramWithPaging = {
        ...params,
        limit: String(20),
      };

      return getSearchResult(clientToken, paramWithPaging);
    },
  });
};

export default useGetSearchResult;
