import "../global.css";
import { Slot } from "expo-router";
import { SessionProvider, useSession } from "../ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Root() {
  const { session } = useSession();
  return (
    <SessionProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </SessionProvider>
  );
}
