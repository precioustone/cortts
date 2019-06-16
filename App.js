import React from 'react';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

// Import All screens
import SignInScreen from './screens/signinScreen.js';
import RegisterScreen from './screens/registerScreen.js';
import Dashboard from './screens/dashboard.js';
import ViewListing from './screens/viewListing.js';
import CreateListing from './screens/createListingScreen.js';
import EditListing from './screens/editListingScreen.js';
import Profile from './screens/profileScreen.js';
import ForgotPassword from './screens/forgotScreen.js';
import LoginScreen from './screens/loginScreen.js';
import Cortts from './screens/corttsScreen.js';
import Commercial from './screens/commercialScreen.js';


const DashboardStack = createStackNavigator({
  List: Dashboard,
  View: ViewListing,
  Edit: EditListing,
  Create: CreateListing,
},{
  initialRouteName: "List",
  header: null,
  headerMode: 'screen',
});

const TabStack = createBottomTabNavigator({
  Home: DashboardStack,
  Profile: Profile,
  Cortts: Cortts,
  Comm: Commercial,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-home`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
        //IconComponent = HomeIconWithBadge; 
      } else if (routeName === 'Profile') {
        iconName = `ios-person`;
      }else if (routeName === 'Cortts') {
        iconName = `ios-globe`;
      }else if (routeName === 'Comm') {
        iconName = `ios-globe`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#26B469',
    inactiveTintColor: 'gray',
  },
});


const AuthNavigator = createStackNavigator({
  SignIn: SignInScreen,
  Login: LoginScreen,
  Register: RegisterScreen,
  Forgot: ForgotPassword,
},
{
  initialRouteName: "SignIn",
  header: null,
  headerMode: 'screen',
});

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Main: TabStack,
},
{
  initialRouteName: 'Auth',
});


const App = createAppContainer(MainNavigator);

export default App;
