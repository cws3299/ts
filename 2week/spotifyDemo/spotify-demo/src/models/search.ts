import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
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
