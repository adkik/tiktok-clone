import "@/styles/theme";
import ProfileStackNavigator from "@/navigators/ProfileStackNavigator";
import HomeScreen from "@/screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import BootSplash from "react-native-bootsplash";
import { useUnistyles } from "react-native-unistyles";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useUnistyles();

  return (
    <>
      <StatusBar style="auto" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide({ fade: true });
          }}
        >
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "Vercetti-Regular",
                fontSize: 12,
                color: theme.colors.typography,
              },
              tabBarStyle: {
                backgroundColor: theme.colors.backgroundColor,
                borderTopColor: theme.colors.borderColor,
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarActiveTintColor: theme.colors.icon,
                tabBarInactiveTintColor: theme.colors.icon,
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                    name={focused ? "home" : "home-outline"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackNavigator}
              options={{
                tabBarActiveTintColor: theme.colors.icon,
                tabBarInactiveTintColor: theme.colors.icon,
                tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                    name={focused ? "person" : "person-outline"}
                    size={25}
                    color={color}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
};

export default App;
