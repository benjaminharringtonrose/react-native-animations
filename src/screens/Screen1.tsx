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

export const Screen1 = () => {
  const [toggled, setToggle] = useState<boolean>(false);

  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: rotation.value.toString() }, { scale: scale.value }],
      opacity: opacity.value,
    };
  }, []);

  const start = () => {
    rotation.value = withSpring(0);
    opacity.value = withTiming(1);
    scale.value = withSpring(1);
    setToggle(!toggled);
  };

  const reset = () => {
    rotation.value = withSpring(2 * PI);
    opacity.value = withTiming(0);
    scale.value = withSpring(0.2);
    setToggle(!toggled);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.overlay, reanimatedStyle]}>
        <CreditCard card={Cards.Card1} />
      </Animated.View>
      <Button
        label={toggled ? "Reset" : "Start"}
        onPress={() => (toggled ? start() : reset())}
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
