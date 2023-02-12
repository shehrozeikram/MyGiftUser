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
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './style';
// create a component
const ContactUs = props => {
  const {user_info, contact_us} = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    email: user_info?.email,
    name: user_info?.first_name + ' ' + user_info?.last_name,
    phone: user_info?.contact_number,
    message: '',
    user_id: user_info?.id,
  });

  const saveData = async () => {
    if (payload?.message?.length < 1) {
      alertService.show('Please type a message', 'Contact us');
      return;
    }
    setLoading(true);
    var res = await contact_us(payload);
    setLoading(false);
    if (res?.data?.api_status == true) {
      alertService.show(
        'Your message has been submitted successfully!',
        'Contact us',
      );
    } else {
      alertService.show('Something went wrong!', 'Contact us');
    }
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
            value={payload.name}
            placeHolder="Full Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, name: val})}
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
            value={payload.phone}
            placeHolder="Phone Number"
            leftIcon="Phone"
            onChange={val => setPayload({...payload, phone: val})}
            inputType={'phone-pad'}
          />
          <TextArea
            placeHolder="Message"
            onChange={val => setPayload({...payload, message: val})}
            label={'Message'}
          />

          <PrimaryButton
            title={'Send Message'}
            style={{marginTop: mvs(30)}}
            onClick={() => saveData()}
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
  contact_us: payload => DIVIY_API.contact_us(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
