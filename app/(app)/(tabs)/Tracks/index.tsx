import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { apiRequest } from "../../../utils/req";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useSession } from "../../../../ctx";
import { useStorageState } from "../../../hooks/useStorageState";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tracks() {
  const baseUrl = "https://api.spotify.com/v1/me/top/tracks";
  const [tracks, setTracks] = useState([]);
  const [accessTokenExpiresAtState, setAccessTokenExpiresAt] = useStorageState(
    "AccessTokenExpiresAt"
  );
  const [refreshTokenState, setRefreshToken] = useStorageState("refreshToken");
  const [sessionState, setSession] = useStorageState("session");
  const { signOut } = useSession();
  useEffect(() => {
    async function fetchData() {
      const response = await apiRequest(
        baseUrl + "?time_range=long_term&limit=50",
        accessTokenExpiresAtState[1],
        setAccessTokenExpiresAt,
        refreshTokenState[1],
        setRefreshToken,
        sessionState[1],
        setSession
      );
      if (!(response instanceof Error)) {
        setTracks(response.items);
      }
    }

    // Only call fetchData if refreshToken is loaded
    if (
      refreshTokenState[1] !== null &&
      sessionState[1] !== null &&
      accessTokenExpiresAtState[1] !== null
    ) {
      fetchData();
    }
  }, [refreshTokenState, sessionState, accessTokenExpiresAtState]);

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView className="bg-black">
          <View className="flex-1 pt-10 pl-10 pr-10">
            {tracks.map((track, index) => (
              <View
                key={track.id}
                className="border bg-neutral-800 mb-4 rounded-md flex-row overflow-hidden relative"
              >
                <Text
                  className="text-white font-semibold text-xl"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    paddingRight: 8,
                  }}
                >
                  {index + 1}
                </Text>
                {track &&
                track.album &&
                track.album.images &&
                track.album.images[0] &&
                track.album.images[0].url ? (
                  <Image
                    source={{ uri: track.album.images[0].url }}
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image width={100} height={100} className=" bg-slate-400" />
                )}
                <View className="pl-8 flex-1  justify-center">
                  <Text className="text-white text-xl font-semibold">
                    {track.name}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
