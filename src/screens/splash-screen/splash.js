import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {connect} from 'react-redux';
import {Logo} from '../../assets/svgs';
import {View} from 'react-native';
import {ACTIONS} from '../../store/actions';
import {Splash_Styles as styles} from './splash-styles';

const Splash = props => {
  const {setUserInfo, navigation, setHeadersInfo} = props;
  React.useEffect(() => {
    dnavigation = navigation;
    (async () => {
      const hv = await AsyncStorage.getItem('@headers');
      const user = await AsyncStorage.getItem('@user');
      setTimeout(() => {
        if (!user) {
          navigation.replace('Signin');
        } else {
          setUserInfo(JSON.parse(user));
          setHeadersInfo(JSON.parse(hv));
          navigation.replace('DrawerNavigator');
        }
      }, 3000);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  setUserInfo: payload => ACTIONS.setUserInfo(payload),
  setHeadersInfo: payload => ACTIONS.setHeadersInfo(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
