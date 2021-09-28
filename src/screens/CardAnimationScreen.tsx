import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import CreditCard, { Cards } from "../components/CreditCard";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { colors, spacings } from "../styles";
import { Button } from "../components/Button";

const { PI } = Math;

export const CardAnimationScreen = () => {
  const [toggled, setToggle] = useState<boolean>(false);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value.toString() }],
      opacity: opacity.value,
    };
  }, []);

  const rotateClockwise = () => {
    rotation.value = withSpring(0);
    opacity.value = withTiming(1);
    setToggle(!toggled);
  };

  const rotateCounterClockwise = () => {
    rotation.value = withSpring(2 * PI);
    opacity.value = withTiming(0);
    setToggle(!toggled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.overlay, reanimatedStyle]}>
        <CreditCard card={Cards.Card1} />
      </Animated.View>
      <Button
        label={toggled ? "CounterClockwise/FadeIn" : "Clockwise/FadeOut"}
        onPress={() => (toggled ? rotateClockwise() : rotateCounterClockwise())}
        style={{ marginHorizontal: spacings.base }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
