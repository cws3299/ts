import axios from "axios";

import { CLIENT_ID, CLIENT_SECRET } from "../config/authConfig";
import {
  ClientCredentialTokenResponse,
  ExchangeTokenResponse,
} from "../models/auth";
import { RedirectUri } from "../config/commonConfig";
import { getSpotifyAuthUrl } from "../utils/auth";

const encodeBase64 = (data: string) => {
  if (typeof window !== "undefined") return btoa(data);
  return Buffer.from(data).toString("base64");
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });

      const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${encodeBase64(
              `${CLIENT_ID}:${CLIENT_SECRET}`
            )}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error("Fail to fetch token");
    }
  };

export const exchangeToken = async (
  code: string,
  codeVerifier: string
): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !RedirectUri) {
      throw new Error("Missing required parameter");
    }

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: RedirectUri,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 401 에러일 때 토큰 제거하고 재인증 시작
      localStorage.removeItem("access_token");
      await getSpotifyAuthUrl();
      throw new Error("401 Unauthorized Error: Token expired or invalid");
    }
    throw new Error("Token Error");
  }
};
