import { useInfiniteQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { BrowseCategoriesRequest } from "../models/search";
import { getSearchCategories } from "../api/searchApt";

const useGetSearchCategories = () => {
  const clientToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search-category"],
    enabled: !!clientToken,
    queryFn: ({ pageParam = 0 }) => {
      if (!clientToken) throw new Error("No Token available");
      const paramWithPaging: BrowseCategoriesRequest = {
        locale: "ko_KR",
        limit: 18,
        offset: pageParam,
      };

      return getSearchCategories(clientToken, paramWithPaging);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.categories?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
  });
};

export default useGetSearchCategories;
