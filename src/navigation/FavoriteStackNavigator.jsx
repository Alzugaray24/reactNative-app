import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoriteScreen from "../screens/FavoriteScreen";

const Stack = createNativeStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="favorite"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
};

export default FavoriteStackNavigator;
