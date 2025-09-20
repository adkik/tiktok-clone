import LikedVideosScreen from "@/screens/LikedVideosScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type ProfileStackParamList = {
  ProfileMain: undefined;
  LikedVideos: { startID: string };
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileMain"
    >
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="LikedVideos" component={LikedVideosScreen} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackNavigator;
