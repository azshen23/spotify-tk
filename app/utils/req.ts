import { refreshAsync } from "expo-auth-session";
import { useStorageState } from "../hooks/useStorageState";
import { TopArtistsResponseType } from "../types/types";

export const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export async function apiRequest(
  url: string,
  accessTokenExpiresAt: string,
  setAccessTokenExpiresAt: (value: string) => void,
  refreshToken: string,
  setRefreshToken: (value: string) => void,
  session: string,
  setSession: (value: string) => void
): Promise<TopArtistsResponseType | Error> {
  const refreshTheToken = async () => {
    refreshAsync(
      {
        clientId: process.env.EXPO_PUBLIC_CLIENTID,
        refreshToken: refreshToken,
      },
      discovery
    )
      .then((response) => {
        const { accessToken, refreshToken, expiresIn, issuedAt } = response;
        setAccessTokenExpiresAt(String(expiresIn + issuedAt));
        setRefreshToken(refreshToken);
        setSession(accessToken);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // If the access token has expired, refresh it
  if (new Date().getTime() / 1000 > Number(accessTokenExpiresAt)) {
    await refreshTheToken();
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    return await response.json();
  } catch (e) {
    return e;
  }
}
