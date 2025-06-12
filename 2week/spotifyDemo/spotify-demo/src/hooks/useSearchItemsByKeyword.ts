import { useInfiniteQuery } from "@tanstack/react-query";
import { searchItemsByKeyowrd } from "../api/searchApt";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";
import { PAGE_LIMIT } from "../config/commonConfig";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const clientToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search", params],
    enabled: !!clientToken && !!params.q?.trim(),
    queryFn: ({ pageParam = 0 }) => {
      if (!clientToken) throw new Error("No Token available");

      const paramWithPaging: SearchRequestParams = {
        ...params,
        offset: pageParam,
        limit: String(PAGE_LIMIT),
      };

      return searchItemsByKeyowrd(clientToken, paramWithPaging);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.artists?.next ||
        lastPage.albums?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.autiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
  });
};

export default useSearchItemsByKeyword;
