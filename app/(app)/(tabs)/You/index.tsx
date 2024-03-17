import { Pressable, Text } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useSession } from "../../../../ctx";

export default function Tracks() {
  const { signOut } = useSession();
  return (
    <ScreenWrapper>
      <Pressable className="" onPress={signOut}>
        <Text className="text-white">Sign Out</Text>
      </Pressable>
    </ScreenWrapper>
  );
}
