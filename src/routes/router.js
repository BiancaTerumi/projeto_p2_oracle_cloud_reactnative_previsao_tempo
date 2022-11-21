import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import History from "../screens/History";
import Search from "../screens/Search";
const Tab = createMaterialTopTabNavigator();

export default function Router() {
  return (
    <NavigationContainer>
        <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 16,
          },
          tabBarStyle: {
            marginTop: 20,
            elevation: 0
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#243657",
          },
        }}
        >
            <Tab.Screen name="Search" options={{
              tabBarLabel: "Pesquisar"
            }} component={Search} />
            <Tab.Screen name="History" options={{
              tabBarLabel: "Histórico"
            }} component={History} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}