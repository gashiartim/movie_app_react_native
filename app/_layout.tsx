import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";
import { Fragment } from "react";

export default function RootLayout() {
  return (
    <Fragment>
      <StatusBar hidden />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </Fragment>
  );
}
