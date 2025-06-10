import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPlayList } from "../api/playlistApi";

const useGetPlayList = (params: GetPlaylistRequest) => {
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => {
      return getPlayList(params);
    },
    enabled: !!params.playlist_id,
  });
};

export default useGetPlayList;
