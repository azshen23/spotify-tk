import { ActivityIndicator, FlatList } from "react-native";
import { useStorageState } from "../../../hooks/useStorageState";
import { apiRequest } from "../../../utils/req";
import ScrollWrapper from "../../../components/ScrollWrapper";
import { useQuery } from "react-query";
import MusicItem from "../../../components/MusicItem";

const Recents = () => {
  const [accessTokenExpiresAtState, setAccessTokenExpiresAt] = useStorageState(
    "AccessTokenExpiresAt"
  );
  const [refreshTokenState, setRefreshToken] = useStorageState("refreshToken");
  const [sessionState, setSession] = useStorageState("session");

  async function fetchData() {
    const baseUrl =
      "https://api.spotify.com/v1/me/player/recently-played?limit=50&after=0";
    const response = await apiRequest(
      `${baseUrl}`,
      accessTokenExpiresAtState[1],
      setAccessTokenExpiresAt,
      refreshTokenState[1],
      setRefreshToken,
      sessionState[1],
      setSession
    );
    if (!(response instanceof Error)) {
      return response.items;
    }
    throw new Error("API request failed");
  }

  const shouldFetchData =
    refreshTokenState[1] !== null &&
    sessionState[1] !== null &&
    accessTokenExpiresAtState[1] !== null;

  const { data: items } = useQuery(["apiData"], fetchData, {
    enabled: shouldFetchData,
    staleTime: 1000 * 60 * 5, // data will be considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data will be cached for 30 minutes
  });

  const renderItem = (item, index) => (
    <MusicItem
      key={index}
      item={item.track}
      imageSrc={item.track.album}
      count={index}
      link={`track:${item.track.id}`}
    />
  );

  return (
    <ScrollWrapper>
      <FlatList
        className="pt-10"
        data={items}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item, index) => `${item.track.id}-${index}`}
        ListEmptyComponent={<ActivityIndicator size="large" color="#00ff00" />}
        showsVerticalScrollIndicator={false}
      />
    </ScrollWrapper>
  );
};

export default Recents;
