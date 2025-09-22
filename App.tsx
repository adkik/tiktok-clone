import "@/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useHomeTabOptions } from "@/navigators/useHomeTabOptions";
import { useProfileTabOptions } from "@/navigators/useProfileTabOptions";
import BootSplash from "react-native-bootsplash";
import { useUnistyles } from "react-native-unistyles";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProfileStackNavigator from "@/navigators/ProfileStackNavigator";
import HomeScreen from "@/screens/HomeScreen";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();

const App = () => {
  const { theme } = useUnistyles();

  const profileTabOptions = useProfileTabOptions();
  const homeTabOptions = useHomeTabOptions();

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
              options={homeTabOptions}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileStackNavigator}
              options={profileTabOptions}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
};

export default App;
