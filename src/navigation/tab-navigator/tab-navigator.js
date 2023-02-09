import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import BottomMenu from '../../components/atoms/BottomMenu';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import BottomTabButton from '../../components/buttons/bottom-tab-button';
import HomeScreen from '../../screens/home-screen/home-screen';
import ClaimGift from '../../screens/claim-gift/claim-gift';
import ProfileScreen from '../../screens/profile-screen/profile-screen';
import StoresTab from '../../screens/stores/stores';
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <BottomTab.Navigator
        //s options={{tabBarHideOnKeyboard:true}}
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}
        tabBar={props => <BottomMenu {...props} colors={colors} />}>
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: '',
            tabBarIcon: focused => (
              <View style={styles.tabOption}>
                {console.log(focused, '111')}
                <BottomTabButton
                  title={''}
                  foc={focused}
                  color={focused ? colors.primary : colors.black}
                  icon={focused ? 'Home1Svg' : 'HomeSvg'}
                />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="StoresTab"
          component={StoresTab}
          options={{
            title: '',
            tabBarIcon: focused => (
              <View style={styles.tabOption}>
                {console.log(focused, '222')}
                <BottomTabButton
                  title={''}
                  foc={focused}
                  color={focused ? colors.primary : colors.black}
                  icon={focused ? 'WalletSvg' : 'Wallet1Svg'}
                />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="ClaimGift"
          component={ClaimGift}
          options={{
            title: '',
            tabBarIcon: focused => (
              <View style={styles.tabOption}>
                {console.log(focused, '333')}
                <BottomTabButton
                  title={''}
                  foc={focused}
                  color={focused ? colors.whiteLinear : colors.primaryLinear}
                  icon={focused ? 'ClaimSvg' : 'Claim1Svg'}
                />
              </View>
            ),
          }}
        />
        <BottomTab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            title: '',
            tabBarIcon: focused => (
              <View style={styles.tabOption}>
                {console.log(focused, '444')}
                <BottomTabButton
                  title={''}
                  foc={focused}
                  color={focused ? colors.whiteLinear : colors.primaryLinear}
                  icon={focused ? 'ProfileSvg' : 'Profile1Svg'}
                />
              </View>
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  tabOption: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(10),
  },
  lableStyle: {
    fontSize: mvs(12),
    marginTop: mvs(5.5),
  },
});
export default TabNavigator;
