import * as React from "react";
import {
  makeRedirectUri,
  useAuthRequest,
  refreshAsync,
  revokeAsync,
} from "expo-auth-session";
import { Platform, Pressable, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { router } from "expo-router";
import { useSession } from "../ctx";

export default function Login() {
  const { signIn, session } = useSession();

  return (
    <View className="flex-1 justify-center items-center">
      <Pressable
        className="border border-black p-10"
        onPress={async () => {
          signIn().then(() => {
            router.replace("/");
          });
        }}
      >
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
}
