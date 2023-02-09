import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import TextArea from '../../components/input/text-area';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './style';
// create a component
const ContactUs = props => {
  const {user_info, register} = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    Email: '',
    UserName: '',
    FullName: '',
    Password: '',
    ConfirmPassword: '',
    Phone: '',
    Address: '',
    Role: 'Rider',
    DateOfBirth: '',
    ProfilePicture: {},
    FrontSideIdCard: {},
    BackSideIdCard: {},
  });

  useEffect(() => {}, []);
  const saveData = async () => {
    setLoading(true);
    await register(user_info);
    setLoading(false);
  };

  return (
    <View style={{...styles.container}}>
      <AppHeader title="Contact Us" />
      <Regular
        label={'Our friendly team would love to hear from you!'}
        size={13}
        color={colors.lightgrey1}
        numberOfLines={2}
        style={{alignSelf: 'center', textAlign: 'center'}}
      />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <PrimaryInput
            label={'Name'}
            value={payload.FullName}
            placeHolder="Full Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, FullName: val})}
          />

          <PrimaryInput
            label={'Email'}
            value={payload.Email}
            placeHolder="Email Address"
            leftIcon="BEmail"
            bWidth={1}
            onChange={val => setPayload({...payload, Email: val})}
          />

          <PrimaryInput
            label={'Phone'}
            value={payload.Phone}
            placeHolder="Phone Number"
            leftIcon="Phone"
            onChange={val => setPayload({...payload, Phone: val})}
            inputType={'phone-pad'}
          />
          <TextArea placeHolder="Message" label={'Message'} />

          <PrimaryButton
            title={'Send Message'}
            style={{marginTop: mvs(30)}}
            onClick={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  register: payload => DIVIY_API.register(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
