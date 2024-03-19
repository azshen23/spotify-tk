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
  const refreshTheToken = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Your existing code...
      fetch("https://accounts.spotify.com/api/token", {
        // ...
      })
        .then((response) => response.json())
        .then((response) => {
          const { accessToken, refreshToken, expiresIn, issuedAt } = response;
          setAccessTokenExpiresAt(String(expiresIn + issuedAt));
          setRefreshToken(refreshToken);
          setSession(accessToken);
          resolve(); // Resolve the promise when the refresh is successful
        })
        .catch((e) => {
          console.log(e);
          reject(e); // Reject the promise if the refresh fails
        });
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
    console.log("API request failed", e);
    return e;
  }
}
