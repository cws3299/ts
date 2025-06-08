import {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlayListResponse,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUsetPlayLists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlayListResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });

    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};
