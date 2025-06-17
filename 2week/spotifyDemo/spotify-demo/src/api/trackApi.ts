import axios from "axios";
import { SpotifyBaseUrl } from "../config/commonConfig";
import { GetArtistTopTrackResponse } from "../models/track";

export const getArtistTopTracks = async (
  clientCredentialToken: string,
  artistId: string
): Promise<GetArtistTopTrackResponse> => {
  try {
    const response = await axios.get(
      `${SpotifyBaseUrl}/artists/${artistId}/top-tracks?market=KR`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("fail to fetch artist top track");
  }
};
