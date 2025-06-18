import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddItemToPlaylistRequest } from "../models/playlist";
import { addItemToPlayList } from "../api/playlistApi";

const useItemToPlayList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      playlist_id,
      params,
    }: {
      playlist_id: string;
      params: AddItemToPlaylistRequest;
    }) => {
      if (playlist_id) {
        return addItemToPlayList(playlist_id, params);
      }

      return Promise.reject(new Error("playlist Id is not defined"));
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", variables.playlist_id],
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
