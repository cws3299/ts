import { CLIENT_ID } from "../config/authConfig";
import { RedirectUri, Scopes } from "../config/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

export const getSpotifyAuthUrl = async () => {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  const clientId = CLIENT_ID;
  const redirectUri = RedirectUri;

  const scope = Scopes; // api permission
  const authUrl = new URL("https://accounts.spotify.com/authorize");

  // generated in the previous step
  window.localStorage.setItem("code_verifier", codeVerifier);

  if (clientId && redirectUri) {
    const params: AuthUrlParams = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    console.log(codeVerifier, clientId, redirectUri, scope, authUrl);

    // authUrl.search = new URLSearchParams(Object.entries(params)).toString();
    // window.location.href = authUrl.toString(); // 스포티파이 로그인 주소를 염
  }
};
