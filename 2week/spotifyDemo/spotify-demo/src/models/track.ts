import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { Copyright, ExternalUrls, Image } from "./commonType";

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist;
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_form?: object;
  restrictions?: {
    reason?: string;
  };
  name?: string;
  popularity?: number;
  preview_url?: string;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface Episode {
  // audio_preview_url: string; -> Deprecated됨
  // language: string -> Disprecated됨
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  image: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  url: string;
  restrictions?: {
    reason?: string;
  };
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, "show">;

export interface Show {
  available_markets: string[];
  copyrights: Copyright;
  description: string;
  html_description: string;
  explicit: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: "show";
  total_episodes: number;
}

export interface SimplifiedAudioBook {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: {
    author: { name: string }[];
    available_markets: string[];
    copyrights: Copyright;
    description: string;
    html_description: string;
    edition?: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    languages: string[];
    media_type: string;
    narrators: {
      name: string;
    }[];
    publisher: string;
    type: "audiobook";
    uri: string;
    total_chapters: number;
  }[];
}
