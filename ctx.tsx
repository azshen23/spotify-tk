import React from "react";
import { useStorageState } from "./app/hooks/useStorageState";
import {
  makeRedirectUri,
  useAuthRequest,
  AuthSessionResult,
  exchangeCodeAsync,
} from "expo-auth-session";
import { discovery } from "./app/utils/req";

const AuthContext = React.createContext<{
  signIn: () => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[], setRefreshToken] = useStorageState("refreshToken");
  const [[], setAccessTokenExpiresAt] = useStorageState("accessTokenExpiresAt");
  const redirectUri =
    process.env.NODE_ENV === "production"
      ? "spotify-tk://"
      : makeRedirectUri({ scheme: "spotify-tk" });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_CLIENTID,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: true,
      redirectUri: redirectUri,
    },
    discovery
  );

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          // Prompt the user to authenticate
          const result: AuthSessionResult = await promptAsync();

          // Check if authentication was successful
          if (result.type === "success") {
            // Store the access token or any session information you receive
            exchangeCodeAsync(
              {
                clientId: process.env.EXPO_PUBLIC_CLIENTID,
                redirectUri: makeRedirectUri({ scheme: "spotify-tk" }),
                code: result.params.code,
                extraParams: {
                  code_verifier: request.codeVerifier || "",
                },
              },
              discovery
            )
              .then((tokenResponse) => {
                const expiresAt =
                  tokenResponse.issuedAt + tokenResponse.expiresIn;
                setRefreshToken(tokenResponse.refreshToken);
                setAccessTokenExpiresAt(expiresAt.toString());
                setSession(tokenResponse.accessToken);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            // Handle authentication failure
            console.log("Authentication failed.");
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
