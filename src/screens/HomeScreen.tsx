import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
