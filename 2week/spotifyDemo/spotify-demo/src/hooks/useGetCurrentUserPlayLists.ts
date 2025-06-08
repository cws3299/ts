import { useQuery } from "@tanstack/react-query";
import { getCurrentUsetPlayLists } from "../api/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";

const useGetCurrentUserPlayLists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest) => {
  return useQuery({
    queryKey: ["current-user-playlists"],
    queryFn: () => {
      return getCurrentUsetPlayLists({ limit, offset });
    },
  });
};

export default useGetCurrentUserPlayLists;
