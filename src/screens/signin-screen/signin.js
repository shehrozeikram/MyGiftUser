import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView as ScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import DualText from '../../components/atoms/dual-text/dual-text';
import PrimaryButton from '../../components/buttons/button-primary';
import PrimaryInput from '../../components/input/primary-input';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {Signin_Styles as styles} from './signin-styles';
const Signin = props => {
  const {signin} = props;
  const navigation = useNavigation();
  const [hide, setHide] = useState(true);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    contact_number: '',
    password: '',
  });
  const Login = async () => {
    setLoading(true);
    var res = await signin(payload);
    setLoading(false);
    if (res?.data?.api_status) {
      navigation.replace('DrawerNavigator');
    } else if (res?.response?.data?.errors) {
      alertService.show(res?.response?.data?.errors[0] + '', 'Login Account');
    }
  };

  return (
    <View style={{...styles.container}}>
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <Medium
            label={'LOGIN'}
            color={colors.black}
            size={24}
            style={{alignSelf: 'center'}}
          />
          <Regular
            label={'Welcome back! Enter details to login'}
            color={colors.lightgrey1}
            size={16}
            style={{alignSelf: 'center', marginBottom: mvs(40)}}
          />
          <PrimaryInput
            label={'Phone'}
            value={payload.contact_number}
            placeHolder="Phone Number"
            leftIcon="Phone"
            onChange={val => setPayload({...payload, contact_number: val})}
            inputType={'phone-pad'}
          />

          <PrimaryInput
            value={payload.password}
            placeHolder="Password"
            leftIcon="Lock"
            rightIcon="Eye"
            isPassword={hide}
            onRightIconClick={() => setHide(!hide)}
            onChange={val => setPayload({...payload, password: val})}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotBtn}>
            <Regular
              label={'Forgot Password?'}
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View style={styles.bottom}>
            <PrimaryButton
              title="Log in"
              style={{marginTop: mvs(18)}}
              onClick={() => Login()}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={{alignSelf: 'center', marginTop: mvs(20)}}>
              <DualText
                content="Don't have an account? "
                style={{fontSize: mvs(16), color: colors.black}}
                highlightText={'Sign Up'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: payload => DIVIY_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
