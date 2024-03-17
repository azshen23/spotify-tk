import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";

interface MusicItemProps {
  item: any;
  imageSrc: any;
  count: number;
  link: string;
}

const MusicItem: React.FC<MusicItemProps> = ({
  item,
  imageSrc,
  count,
  link,
}) => {
  const handlePress = () => {
    Linking.openURL(`spotify:${link}`);
  };
  return (
    <TouchableOpacity
      className="bg-secondary mb-4 rounded-md flex-row overflow-hidden relative"
      onPress={handlePress}
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
        {count + 1}
      </Text>
      {imageSrc.images && imageSrc.images[0] && imageSrc.images[0].url ? (
        <Image
          source={{ uri: imageSrc.images[0].url }}
          width={100}
          height={100}
        />
      ) : (
        <Image width={100} height={100} className=" bg-slate-400" />
      )}
      <View className="pl-8 flex-1  justify-center">
        <Text className="text-white text-xl font-semibold">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MusicItem;
