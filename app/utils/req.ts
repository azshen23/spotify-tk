import { refreshAsync } from "expo-auth-session";
import { useStorageState } from "../hooks/useStorageState";

export const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export async function apiRequest(url: string) {
  const [[, accessTokenExpiresAt], setAccessTokenExpiresAt] = useStorageState(
    "accessTokenExpiresAt"
  );
  const [[, refreshToken], setRefreshToken] = useStorageState("refreshToken");
  const [[, session], setSession] = useStorageState("session");

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
  } else {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
