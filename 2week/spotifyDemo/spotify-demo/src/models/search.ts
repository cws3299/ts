import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { Image } from "./commonType";
import { SimplifiedPlaylist } from "./playlist";
import { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track";

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: string;
  offset?: number;
  include_external?: string;
}

export enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
}

export interface SearchResponse {
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<Track>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  autiobooks?: ApiResponse<SimplifiedAudioBook>;
}

export interface BrowseCategoriesRequest {
  locale: string;
  limit: number;
  offset: number;
}

export interface GetCategoriesAPIResponse {
  categories?: Categories;
}

export interface Categories {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: CategoryObject[];
}

export interface CategoryObject {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
