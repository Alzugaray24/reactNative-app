import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";
import FavoriteDetail from "../screens/FavoriteDetail";

const Stack = createNativeStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="favorite"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="favorite" component={FavoriteScreen} />
      <Stack.Screen name="favoriteDetail" component={FavoriteDetail} />
    </Stack.Navigator>
  );
};

export default FavoriteStackNavigator;
