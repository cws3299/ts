import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddItemToPlaylistRequest } from "../models/playlist";
import { addItemToPlayList } from "../api/playlistApi";

const useItemToPlayList = (playlist_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => {
      if (playlist_id) {
        return addItemToPlayList(playlist_id, params);
      }

      return Promise.reject(new Error("playlist Id is not defined"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
    },
  });
};

export default useItemToPlayList;
