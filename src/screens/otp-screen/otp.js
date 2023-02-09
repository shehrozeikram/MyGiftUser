//import liraries
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {INPUT_FIELD} from './../../components/atoms/Input';
import styles from './otp-styles';
const Otp = props => {
  const {route, otp} = props;
  const {email} = route.params;
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');
  const [isMatch, setIsMatch] = React.useState(true);

  const verify = () => {
    if (value == '1111') {
      navigation.navigate('Signin');
    } else {
      alertService.show('You Have Entered Incorrect Verification Code');
      setIsMatch(false);
    }
  };

  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Enter your 4 digit code" />
      <ScrollView contentContainerStyle={{flexGrow: 1, flex: 1}}>
        <View style={styles.body}>
          <Regular
            label={
              'Enter the code we have just sent to your registered phone number'
            }
            size={13}
            color={colors.lightgrey1}
            numberOfLines={2}
            style={styles.text}
          />
          <INPUT_FIELD.CustomOtpInput
            isMatch={isMatch}
            value={value}
            setValue={setValue}
          />
          <PrimaryButton
            title="Verify"
            style={{marginTop: mvs(20)}}
            onClick={() => {
              verify();
            }}
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
  otp: store.state.otp,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Otp);
