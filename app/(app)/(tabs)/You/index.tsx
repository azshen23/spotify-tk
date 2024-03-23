import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useSession } from "../../../../ctx";
import { makeRedirectUri } from "expo-auth-session";

export default function Tracks() {
  const { signOut } = useSession();
  return (
    <View className="flex-1 bg-tertiary items-center ">
      <SafeAreaView>
        <View className="flex-1 items-center">
          <Text className="text-white font-bold">How Quirky Are You?</Text>
          <TouchableOpacity
            className="bg-primary rounded-full pl-10 pr-10 pt-5 pb-5"
            onPress={async () => {
              signOut();
            }}
          >
            <Text className="text-white font-bold">Sign Out</Text>
            <Text>{makeRedirectUri({ native: "spotify-tk" })}</Text>
            <Text>{makeRedirectUri({ scheme: "spotify-tk" })}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
