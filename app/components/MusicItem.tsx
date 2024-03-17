import { View, Text, Image } from "react-native";
import React from "react";

interface MusicItemProps {
  item: any; // Replace 'any' with the actual type
  imageUri: string;
  count: number;
}

const MusicItem: React.FC<MusicItemProps> = ({ item, imageUri, count }) => {
  return (
    <View className="border bg-secondary mb-4 rounded-md flex-row overflow-hidden relative">
      <Text
        className="text-white font-semibold text-xl"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          paddingRight: 8,
        }}
      >
        {count + 1}
      </Text>
      {item && imageUri ? (
        <Image source={{ uri: imageUri }} width={100} height={100} />
      ) : (
        <Image width={100} height={100} className=" bg-slate-400" />
      )}
      <View className="pl-8 flex-1  justify-center">
        <Text className="text-white text-xl font-semibold">{item.name}</Text>
      </View>
    </View>
  );
};

export default MusicItem;
