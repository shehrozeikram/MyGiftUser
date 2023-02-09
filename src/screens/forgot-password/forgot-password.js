import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './forgot-password.styles';
const ForgotPassword = props => {
  const {forgot_password} = props;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [payload, setPayload] = React.useState({
    email: '',
  });
  const forgot = async () => {
    if (!validate(payload.email)) {
      alertService.show('Please Enter Valid Email', 'Email');
      return;
    }
    var response = {};
    console.log(payload);
    setLoading(true);
    try {
      response = await forgot_password(payload);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    if (response?.data?.api_status == true) {
      navigation.navigate('Otp', {email: payload.email});
    } else if (res?.response?.data?.errors) {
      alertService.show(res?.response?.data?.errors[0] + '', 'Login Account');
    }
  };
  const validate = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Forgot Password" />
      <Regular
        label={
          'Enter your registered phone number below to recieve verification code '
        }
        size={13}
        color={colors.lightgrey1}
        numberOfLines={2}
        style={{alignSelf: 'center', width: mvs(290), textAlign: 'center'}}
      />
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
          <PrimaryInput
            label={'Email Address'}
            placeHolder="Enter Email Address"
            leftIcon="BEmail"
            value={payload.email}
            onChange={val => setPayload({...payload, email: val})}
          />
          <PrimaryButton
            title="Send"
            style={{marginTop: mvs(30)}}
            onClick={() => forgot()}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signin')}
          style={{
            marginBottom: mvs(30),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Bold label={'Back To Login'} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  forgot_password: payload => DIVIY_API.forgot_password(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
