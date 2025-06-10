import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../api/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { CreatePlaylistRequest } from "../models/playlist";
import { useAuthStore } from "../state/AuthStore";

const useCreatePlayList = () => {
  // const { data: user } = useGetCurrentUserProfile(); // zustand로 교체함 -> 비슷한 다른 몇몇 군데도 변경가능한 곳은 변경해야함
  const userId = useAuthStore((state) => state.userId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreatePlaylistRequest) => {
      if (userId) {
        return createPlaylist(userId, params);
      }

      return Promise.reject(new Error("user is not defined"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useCreatePlayList;
