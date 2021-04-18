import * as React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import DrinkTab from "./DrinkTab";
import FoodTab from "./FoodTab";
import HeaderComponents from "../components/HeaderComponents";

const Tab = createMaterialTopTabNavigator();

const OrderScreen = () => {
  return (
    <>
    <HeaderComponents title="Order Screen" backBtn />
    <Tab.Navigator>
      <Tab.Screen
        name="FoodTab"
        component={FoodTab}
        options={{
          tabBarLabel: "Món ăn",
        }}
      />
      <Tab.Screen
        name="DrinkTab"
        component={DrinkTab}
        options={{
          tabBarLabel: "Nước uống",
        }}
      />
      
    </Tab.Navigator>
    </>
  );
};

export default OrderScreen;
