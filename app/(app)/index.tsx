import { Text, View } from "react-native";

import { useSession } from "../../ctx";

export default function Index() {
  const { signOut, session } = useSession();
  const getUserInfo = async () => {
    const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          getUserInfo();
        }}
      >
        UserInfo
      </Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign out
      </Text>
    </View>
  );
}
