import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public: boolean;
  snapshot_id?: string;
  type?: string;
  uri?: string;
  tracks?: {
    href: string;
    total: number;
  };
}

export type GetCurrentUserPlayListResponse = ApiResponse<SimplifiedPlaylist>;
