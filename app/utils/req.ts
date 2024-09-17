import { refreshAsync } from "expo-auth-session";

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
): Promise<Response | Error> {
  const refreshTheToken = async (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
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
          resolve(); // Resolve the Promise
        })
        .catch((e) => {
          console.log(e);
          reject(e); // Reject the Promise
        });
    });
  };

  // Always check and refresh the token before making the API request
  if (
    new Date().getTime() / 1000 > Number(accessTokenExpiresAt) - 600 ||
    refreshToken === null ||
    !session
  ) {
    try {
      await refreshTheToken();
    } catch (e) {
      console.log("Token refresh failed", e);
      return e;
    }
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    console.log("API request failed", e);
    return e;
  }
}
