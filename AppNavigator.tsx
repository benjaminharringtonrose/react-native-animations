import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CardAnimationScreen } from "./src/screens/CardAnimationScreen";

type DrawerStackParamList = {
  CardAnimationScreen: undefined;
};

export function DrawerStack() {
  const Drawer = createDrawerNavigator<DrawerStackParamList>();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="CardAnimationScreen" component={CardAnimationScreen} />
    </Drawer.Navigator>
  );
}
