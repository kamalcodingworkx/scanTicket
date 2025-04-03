import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../ui/screens/Splash";
import Home from "../ui/screens/Home";
import ScanScreen from "../ui/screens/ScanScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />

    </Stack.Navigator>
  );
}

export default RootStack;