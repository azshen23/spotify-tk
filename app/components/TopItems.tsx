import { ActivityIndicator, View } from "react-native";
import { apiRequest } from "../utils/req";
import { useEffect, useState } from "react";
import { useStorageState } from "../hooks/useStorageState";
import TimeFrameSelector from "./TimeFrameSelector";
import ScrollWrapper from "./ScrollWrapper";

interface TopItemsProps {
  baseUrl: string;
  renderItem: (item: any, index: number) => JSX.Element;
}

export default function TopItems({ baseUrl, renderItem }: TopItemsProps) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accessTokenExpiresAtState, setAccessTokenExpiresAt] = useStorageState(
    "AccessTokenExpiresAt"
  );
  const [refreshTokenState, setRefreshToken] = useStorageState("refreshToken");
  const [sessionState, setSession] = useStorageState("session");
  const [timeFrame, setTimeFrame] = useState("long_term");
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
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
        setItems(response.items);
      }
      setIsLoading(false);
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
    <ScrollWrapper>
      <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      {items.length === 0 || isLoading ? (
        <ActivityIndicator className="pt-10" size="large" color="#00ff00" />
      ) : (
        <View className="flex-1 pt-10">{items.map(renderItem)}</View>
      )}
    </ScrollWrapper>
  );
}
