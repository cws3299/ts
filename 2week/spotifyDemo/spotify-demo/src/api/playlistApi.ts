import {
  AddItemToPlaylistRequest,
  AddItemToPlaylistResponse,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlayListResponse,
  GetPlaylistItemsRequest,
  GetPlayListItemsResponse,
  GetPlaylistRequest,
  Playlist,
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

export const getPlayList = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlayListItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error("fail playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });

    return response.data;
  } catch (error) {
    throw new Error("Fail to create playlist");
  }
};

export const addItemToPlayList = async (
  playlist_id: string,
  params: AddItemToPlaylistRequest
): Promise<AddItemToPlaylistResponse> => {
  try {
    const response = await api.post(`/playlists/${playlist_id}/tracks`, params);

    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error("Fail to add Item to playlist");
  }
};
