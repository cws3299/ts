import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUsetPlayLists } from "../api/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlayLists = ({
  limit,
}: GetCurrentUserPlaylistRequest) => {
  const accessToken = localStorage.getItem("access_token");

  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUsetPlayLists({ limit, offset: pageParam });
    },
    enabled: !!accessToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }

      return undefined;
    },
  });
};

export default useGetCurrentUserPlayLists;
