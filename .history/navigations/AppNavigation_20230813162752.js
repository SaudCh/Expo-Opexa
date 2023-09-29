import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash';
// import LandingPage from '../screens/landingPage';
import BottomTabs from './BottomTab';
import NotificationPrm from '../screens/permissions/notification';
import LocationPrm from '../screens/permissions/location';
import EditProfile from '../screens/profile/edit';
import Chat from '../screens/chat';
import { Colors } from '../constants/colors';
import WalletScreen from '../screens/wallet';
import LanguageScreen from '../screens/language';
import LocationScreen from '../screens/location';
import LandingScreen from '../screens/auth';
import Register from '../screens/auth/register';
import Login from '../screens/auth/login';
import OTPScreen from '../screens/auth/otp';
import ForgetPassword from '../screens/auth/forget';
import PhoneNumberLogin from '../screens/auth/phoneLogin';
import Help from '../screens/help';
import Feedback from '../screens/help/feedback';
import HelpCenter from '../screens/help/helpCenter';
import Terms from '../screens/help/terms';
import PrivacyPolicy from '../screens/help/privacyPolicy';
import Privacy from '../screens/privacy';
import DeleteProfileScreen from '../screens/privacy/closeAccount';
import Password from '../screens/privacy/password';
import ProductDetail from '../screens/products/details';
import CmpProfile from '../screens/auth/cmpProfile';
import { TouchableOpacity, Text } from 'react-native';
import firebase from '../config/firebase';
import DepositScreen from '../screens/wallet/deposit';
import AddProduct from '../screens/sell/addProduct';
import Barter from '../screens/buy/barter';
import SelectSubCategory from '../screens/sell/selectSubCategory';
import SelectFurCategory from '../screens/sell/selectFurCategory';
import Notification from '../screens/notification';
import BarterRequest from '../screens/barter';
import BidingRequest from '../screens/biding/request';
import ExpertOption from '../screens/expertOption';
import SelectCategory from '../screens/sell/selectCategory';
import Crypto from '../screens/wallet/crypto';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();

const options = {
    headerShown: true,
    headerTitle: 'My Wallet',
    headerTitleStyle: {
        color: Colors.main,
        fontSize: 16,
        fontFamily: 'Circular'
    },
    headerBackTitleVisible: false,
    headerTintColor: Colors.main,
}

function AppNavigation() {

    const { Logout } = useAuth()

    return (
        // <NavigationContainer>
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
        >
            {/* Splash */}
            <Stack.Screen name="Splash" component={SplashScreen} />

            {/* Landing */}
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PhoneNumberLogin" component={PhoneNumberLogin} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="CmpProfile" component={CmpProfile}
                options={({ route, navigation }) => ({
                    ...options,
                    headerTitle: 'Complete Profile',
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => Logout()}
                        >
                            <Text style={{
                                color: Colors.primary,
                                fontFamily: 'Circular',
                            }}>Logout</Text>
                        </TouchableOpacity>
                    )
                })} />

            {/* Permissions Screen */}
            <Stack.Screen name="NotificationPrm" component={NotificationPrm} />
            <Stack.Screen name="LocationPrm" component={LocationPrm} />

            {/* Tabs */}
            <Stack.Screen name="BottomTabs" component={BottomTabs} />

            {/* Home Screen */}
            <Stack.Screen name="Notifications" component={Notification}

                options={({ route, navigation }) => ({
                    ...options,
                    headerTitle: 'Notifications'
                })
                }
            />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Barter" component={Barter} />

            {/* Chat Screen */}
            <Stack.Screen name="Chat" component={Chat} />

            {/* Sell Screen */}
            <Stack.Screen name="SelectCategory" component={SelectCategory}
                options={({ route }) => ({
                    ...options,
                    headerTitle: route.params.title ? route.params.title : 'Select Category',
                })}
            />
            <Stack.Screen name="SelectSubCategory" component={SelectSubCategory}
                options={({ route }) => ({
                    ...options,
                    headerTitle: route.params.title ? route.params.title : 'Select Sub Category',
                })}
            />
            <Stack.Screen name="SelectFurCategory" component={SelectFurCategory}
                options={({ route }) => ({
                    ...options,
                    headerTitle: route.params.title ? route.params.title : 'Select Sub Category',
                })}
            />
            <Stack.Screen name="AddProduct" component={AddProduct}
                options={({ route, navigation }) => ({
                    ...options,
                    headerTitle: 'Add Product',
                }
                )}
            />

            {/* Profile Screen */}
            <Stack.Screen name="EditProfile"
                component={EditProfile}
                options={{
                    ...options,
                    headerTitle: 'Edit Profile'
                }}
            />
            <Stack.Screen name="Wallet"
                component={WalletScreen}
                options={{
                    ...options,
                    headerTitle: 'My Wallet'
                }}
            />
            <Stack.Screen name="DepositScreen"
                component={DepositScreen}
                options={{
                    ...options,
                    headerTitle: 'Deposit'
                }}
            />
            <Stack.Screen name="CryptoScreen"
                component={Crypto}
                options={{
                    ...options,
                    headerTitle: 'Digital Currency'
                }}
            />
            <Stack.Screen name="BidingRequest" component={BidingRequest} />
            <Stack.Screen name="ExpertOption" component={ExpertOption}
                options={{
                    ...options,
                    headerTitle: 'Expert Option'
                }}
            />
            <Stack.Screen name="BarterRequest" component={BarterRequest} />
            <Stack.Screen name="LanguageScreen"
                component={LanguageScreen}
                options={{
                    ...options,
                    headerTitle: 'Select Language'
                }}
            />
            <Stack.Screen name="LocationScreen"
                component={LocationScreen}
                options={{
                    ...options,
                    headerTitle: 'Select Location'
                }}
            />

            {/* Privacy Screen */}
            <Stack.Screen name="Privacy"
                component={Privacy}
                options={{
                    ...options,
                    headerTitle: 'Privacy'
                }}
            />
            <Stack.Screen name="UpPassword"
                component={Password}
                options={{
                    ...options,
                    headerTitle: 'Change Password'
                }}
            />
            <Stack.Screen name="CloseAccount"
                component={DeleteProfileScreen}
                options={{
                    ...options,
                    headerTitle: 'Close Account'
                }}
            />

            {/* Help Screen */}
            <Stack.Screen
                name="Help"
                component={Help}
                options={{
                    ...options,
                    headerTitle: 'Help',
                }}
            />
            <Stack.Screen
                name="HelpCenter"
                component={HelpCenter}
                options={{
                    ...options,
                    headerTitle: 'Help Center',
                }}
            />
            <Stack.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    ...options,
                    headerTitle: 'Feedback',
                }}
            />
            <Stack.Screen
                name="Terms"
                component={Terms}
                options={{
                    ...options,
                    headerTitle: 'Terms & Conditions',
                }}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{
                    ...options,
                    headerTitle: 'Privacy Policy',
                }}
            />

        </Stack.Navigator>
        // </NavigationContainer >
    );
}

export default AppNavigation;