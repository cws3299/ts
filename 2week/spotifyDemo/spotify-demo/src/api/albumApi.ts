import axios from "axios";
import { SpotifyBaseUrl } from "../config/commonConfig";
import { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (
  clientCredentialToken: string
): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SpotifyBaseUrl}/browse/new-releases?limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    throw new Error("fail to fetch new releases");
  }
};
