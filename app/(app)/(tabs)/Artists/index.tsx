import { Pressable, ScrollView, Text, View, Image } from "react-native";
import { apiRequest } from "../../../utils/req";
import { useEffect, useState } from "react";
import { useSession } from "../../../../ctx";
import { useStorageState } from "../../../hooks/useStorageState";
import { SafeAreaView } from "react-native-safe-area-context";
import { TopArtistsResponseType } from "../../../types/types";
import TimeFrameSelector from "../../../components/TimeFrameSelector";
import MusicItem from "../../../components/MusicItem";

export default function Artists() {
  const baseUrl = "https://api.spotify.com/v1/me/top/artists";
  const [artists, setArtists] = useState([]);
  const [accessTokenExpiresAtState, setAccessTokenExpiresAt] = useStorageState(
    "AccessTokenExpiresAt"
  );
  const [refreshTokenState, setRefreshToken] = useStorageState("refreshToken");
  const [sessionState, setSession] = useStorageState("session");
  const [timeFrame, setTimeFrame] = useState("long_term");
  const { signOut } = useSession();
  useEffect(() => {
    async function fetchData() {
      const response: TopArtistsResponseType | Error = await apiRequest(
        `${baseUrl}?time_range=${timeFrame}&limit=50`,
        accessTokenExpiresAtState[1],
        setAccessTokenExpiresAt,
        refreshTokenState[1],
        setRefreshToken,
        sessionState[1],
        setSession
      );
      if (!(response instanceof Error)) {
        setArtists(response.items);
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
  }, [refreshTokenState, sessionState, accessTokenExpiresAtState, timeFrame]);

  return (
    <View className="flex-1 bg-tertiary">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <ScrollView className="bg-tertiary pl-7 pr-7">
          <TimeFrameSelector
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
          />
          <View className="flex-1 pt-10 ">
            {artists.length > 0 &&
              artists.map(
                (artist, index) =>
                  artist.images &&
                  artist.images[0] &&
                  artist.images[0].url && (
                    <MusicItem
                      key={artist.id}
                      item={artist}
                      imageUri={artist.images[0].url}
                      count={index}
                    />
                  )
              )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
