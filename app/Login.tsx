import * as React from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useSession } from "../ctx";
import { useEffect } from "react";
import ScreenWrapper from "./components/ScreenWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { signIn, session } = useSession();
  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session]);
  return (
    <View className="flex-1 bg-tertiary items-center ">
      <SafeAreaView>
        <View className="flex-1 items-center justify-center">
          <Text className="text-primary font-bold text-5xl pb-40">
            Spotify Tool Kit
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-full pl-10 pr-10 pt-5 pb-5"
            onPress={async () => {
              signIn();
            }}
          >
            <Text className="text-white font-bold">Sign In with Spotify</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
