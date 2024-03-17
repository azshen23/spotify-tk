import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

interface SafeViewProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<SafeViewProps> = ({ children }) => {
  return (
    <View className="flex-1 bg-tertiary">
      <SafeAreaView className="flex-1" edges={["top"]}>
        <View className="pl-7 pr-7">{children}</View>
      </SafeAreaView>
    </View>
  );
};

export default ScreenWrapper;
