import "../global.css";
import { Slot } from "expo-router";
import { SessionProvider, useSession } from "../ctx";

export default function Root() {
  const { session } = useSession();
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
