import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView as ScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import DualText from '../../components/atoms/dual-text/dual-text';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import DatePickerModal from '../../components/modals/date-picker-modal';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import SERVICES from '../../services/common-services';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './sign-up.styles';
// create a component
const SignUp = props => {
  const {register} = props;
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [showCalender, setShowCalender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    email: '',
    username: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
    contact_number: '',
    address: '',
  });
  const pickImage = async side => {
    const image = await SERVICES._returnImageGallery();
    if (image == undefined) {
      return;
    }
    if (side == 'front') {
      setPayload({...payload, FrontSideIdCard: image});
    } else if (side == 'back') {
      setPayload({...payload, BackSideIdCard: image});
    } else if (side == 'profile') {
      setPayload({...payload, ProfilePicture: image});
    }
  };
  const onRegister = async () => {
    if (payload.first_name.length < 1) {
      alertService.show('Please Enter First Name', 'Sign up');
      return;
    }
    if (!validate(payload.email)) {
      alertService.show('Please Enter Valid Email', 'Sign up');
      return;
    }
    if (payload.email.length < 1) {
      alertService.show('Please Enter Email', 'Sign up');
      return;
    }
    if (payload.contact_number.length < 1) {
      alertService.show('Please Enter Phone Number', 'Sign up');
      return;
    }
    if (payload.password.length < 6) {
      alertService.show(
        'Password Length Must Be Minimum 6 characters',
        'Sign up',
      );
      return;
    }

    if (payload.password != payload.confirm_password) {
      alertService.show('Confirm Password Not Matched', 'Sign up');
      return;
    }
    setLoading(true);
    var res = await register(payload);
    setLoading(false);
    if (res?.data?.user) {
      alertService.show('Account Created Successfully!', 'Sign up');
      navigation.navigate('Signin');
    } else if (res?.data?.error?.contact_number) {
      alertService.show(
        `Contact number ${res?.data?.error?.contact_number[0]}!`,
        'Sign up',
      );
    } else if (res?.data?.error?.email) {
      alertService.show(`Email ${res?.data?.error?.email[0]}!`, 'Sign up');
    } else {
      alertService.show('Something went wrong!', 'Sign up');
    }
  };
  const validate = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Create your account" />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <Regular
        label={'Enter your basic information to create account'}
        size={13}
        color={colors.lightgrey1}
        numberOfLines={2}
        style={{alignSelf: 'center', width: mvs(290), textAlign: 'center'}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <PrimaryInput
            label={'First Name'}
            value={payload.first_name}
            placeHolder="First Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, first_name: val})}
          />
          <PrimaryInput
            label={'Last Name'}
            value={payload.last_name}
            placeHolder="Last Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, last_name: val})}
          />
          <PrimaryInput
            label={'Email'}
            value={payload.email}
            placeHolder="Email Address"
            leftIcon="BEmail"
            bWidth={1}
            onChange={val => setPayload({...payload, email: val})}
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
            label={'Password'}
            value={payload.password}
            placeHolder="Password"
            leftIcon="Lock"
            rightIcon="Eye"
            isPassword={hidePassword}
            onRightIconClick={() => setHidePassword(!hidePassword)}
            onChange={val => setPayload({...payload, password: val})}
          />

          <PrimaryInput
            label={'Confirm Password'}
            value={payload.confirm_password}
            placeHolder="Confirm Password"
            leftIcon="Lock"
            rightIcon="Eye"
            isPassword={hideConfirmPassword}
            onRightIconClick={() =>
              setHideConfirmPassword(!hideConfirmPassword)
            }
            onChange={val => setPayload({...payload, confirm_password: val})}
          />

          <PrimaryButton
            title="Create Account"
            style={{marginTop: mvs(40)}}
            onClick={() => onRegister()}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Signin')}
            style={{alignSelf: 'center', marginTop: mvs(28)}}>
            <DualText
              content="Have an account? "
              style={{fontSize: mvs(16), color: colors.black}}
              highlightText={'Sign in'}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <DatePickerModal
        visible={showCalender}
        onSelect={date => {
          setShowCalender(false);
          setPayload({...payload, DateOfBirth: date});
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({});

const mapDispatchToProps = {
  register: info => DIVIY_API.register(info),
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
