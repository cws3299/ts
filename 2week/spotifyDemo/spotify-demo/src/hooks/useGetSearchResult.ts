import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "../api/searchApt";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";
import { PAGE_LIMIT } from "../config/commonConfig";

const useGetSearchResult = (params: SearchRequestParams) => {
  const clientToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["search", params],
    enabled: !!clientToken && !!params.q?.trim(),
    queryFn: () => {
      if (!clientToken) throw new Error("No Token available");

      const paramWithPaging = {
        ...params,
        limit: String(PAGE_LIMIT),
      };

      return getSearchResult(clientToken, paramWithPaging);
    },
  });
};

export default useGetSearchResult;
