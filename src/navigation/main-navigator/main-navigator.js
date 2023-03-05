// In App.js in a new project

import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {StatusBar, View} from 'react-native';
import Splash from '../../screens/splash-screen/splash';
import colors from './../../services/colors';
import PreLogin from '../../screens/pre-login/pre-login';
import Signin from '../../screens/signin-screen/signin';
import SignUp from '../../screens/sign-up/sign-up';
import ForgotPassword from '../../screens/forgot-password/forgot-password';
import Otp from '../../screens/otp-screen/otp';
import ChangePassword from '../../screens/change-password/change-password';
import Payment from '../../screens/payment/payment';
import PrivacyPolicy from '../../screens/privacy-policy/privacy-policy';
import TermsConditions from '../../screens/terms-conditions/terms-conditions';
import Stores from '../../screens/stores/stores';
import Profile from '../../screens/profile/profile';
import ContactUs from '../../screens/contact-us/contact-us';
import WithdrawRequest from '../../screens/withdraw-request/withdraw-request';
import PayAtStore from '../../screens/pay-at-store/pay-at-store';
import HomeScreen from '../../screens/home-screen/home-screen';
import BuyCard from '../../screens/buy-card/buy-card';
import PaymentMethod from '../../screens/payment-method/payment-method';
import TransactionHistory from '../../screens/transaction-history/transaction-history';
import ProfileScreen from '../../screens/profile-screen/profile-screen';
import Wallet from '../../screens/wallet/wallet';
import ClaimGift from '../../screens/claim-gift/claim-gift';
import TabNavigator from '../tab-navigator/tab-navigator';
import {SafeAreaView} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const MainNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="PreLogin" component={PreLogin} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="TermsConditions" component={TermsConditions} />
        <Stack.Screen name="Stores" component={Stores} />
        <Stack.Screen name="EditProfile" component={Profile} />
        <Stack.Screen name="WithdrawRequest" component={WithdrawRequest} />
        <Stack.Screen name="PayAtStore" component={PayAtStore} />
        <Stack.Screen name="BuyCard" component={BuyCard} />
        <Stack.Screen name="GiftCards" component={HomeScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyWallet" component={Wallet} />
        <Stack.Screen name="MyRewards" component={ClaimGift} />
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Stack.Screen name="DrawerNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
