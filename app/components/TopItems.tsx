import { ActivityIndicator, FlatList, View } from "react-native";
import { apiRequest } from "../utils/req";
import { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import TimeFrameSelector from "./TimeFrameSelector";
import ScrollWrapper from "./ScrollWrapper";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

interface TopItemsProps {
  baseUrl: string;
  renderItem: (item: any, index: number) => JSX.Element;
}

export default function TopItems({ baseUrl, renderItem }: TopItemsProps) {
  const [accessTokenExpiresAtState, setAccessTokenExpiresAt] = useStorageState(
    "AccessTokenExpiresAt"
  );
  const [refreshTokenState, setRefreshToken] = useStorageState("refreshToken");
  const [sessionState, setSession] = useStorageState("session");
  const [timeFrame, setTimeFrame] = useState("long_term");

  async function fetchData() {
    const response = await apiRequest(
      `${baseUrl}?time_range=${timeFrame}&limit=50`,
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

  const { data: items } = useQuery(["apiData", timeFrame], fetchData, {
    enabled: shouldFetchData,
    staleTime: 1000 * 60 * 5, // data will be considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 30, // data will be cached for 30 minutes
  });

  return (
    <ScrollWrapper>
      <FlatList
        data={items}
        renderItem={({ item, index }) => renderItem(item, index)}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <TimeFrameSelector
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
          />
        }
        ListEmptyComponent={<ActivityIndicator size="large" color="#00ff00" />}
        showsVerticalScrollIndicator={false}
      />
    </ScrollWrapper>
  );
}
