import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Screen1 } from "./src/screens/Screen1";
import { Screen2 } from "./src/screens/Screen2";
import { Screen3 } from "./src/screens/Screen3";

type DrawerStackParamList = {
  Screen1: undefined;
  Screen2: undefined;
  Screen3: undefined;
};

export function DrawerStack() {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Screen1" component={Screen1} options={{ title: "Basics Playground" }} />
      <Drawer.Screen name="Screen2" component={Screen2} options={{ title: "Pinch Gestures" }} />
      <Drawer.Screen
        name="Screen3"
        component={Screen3}
        options={{ title: "Interpolate with ScrollView" }}
      />
    </Drawer.Navigator>
  );
}
