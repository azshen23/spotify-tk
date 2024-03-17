import { View, Text, Pressable } from "react-native";
import React from "react";

interface TimeFrameSelectorProps {
  timeFrame: string;
  setTimeFrame: (timeFrame: string) => void;
}
const TimeFrameSelector: React.FC<TimeFrameSelectorProps> = ({
  timeFrame,
  setTimeFrame,
}) => {
  return (
    <View className="flex-row justify-between pt-5 pb-12">
      <Pressable
        className={`rounded-full overflow-hidden pl-7 pr-7 pb-3 pt-3 ${
          timeFrame === "long_term" ? "bg-primary" : "bg-secondary"
        }`}
        onPress={() => setTimeFrame("long_term")}
      >
        <Text className="text-white font-semibold">All Time</Text>
      </Pressable>
      <Pressable
        className={`rounded-full overflow-hidden pl-7 pr-7 pb-3 pt-3 ${
          timeFrame === "medium_term" ? "bg-primary" : "bg-secondary"
        }`}
        onPress={() => setTimeFrame("medium_term")}
      >
        <Text className="text-white font-semibold">6 Months</Text>
      </Pressable>
      <Pressable
        className={`rounded-full overflow-hidden pl-7 pr-7 pb-3 pt-3 ${
          timeFrame === "short_term" ? "bg-primary" : "bg-secondary"
        }`}
        onPress={() => setTimeFrame("short_term")}
      >
        <Text className="text-white font-semibold">1 Month</Text>
      </Pressable>
    </View>
  );
};

export default TimeFrameSelector;
