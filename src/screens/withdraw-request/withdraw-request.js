import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import AvailableBalance from '../../components/available-balance/available-balance';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PrimaryInput from '../../components/input/primary-input';
import DatePickerModal from '../../components/modals/date-picker-modal';
import PaymentSuccessfully from '../../components/modals/payment-successfully';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './styles';
// create a component
const WithdrawRequest = props => {
  const {selected_license, update_license} = props;
  const navigation = useNavigation();
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    ExpiryDate: selected_license?.expiryDate?.split('T')[0],
    Iban: '',
    Address: '',
    Payment: '',
    FullName: '',
    Cvc: '',
  });

  const saveLicense = async () => {
    setLoading(true);
    await update_license(payload);
    setLoading(false);
  };

  return (
    <View style={{...styles.container}}>
      <AppHeader title="Withdraw" />
      <Regular
        label={'Your active payment is here'}
        size={12}
        color={colors.lightgrey1}
        style={{marginTop: mvs(-10), alignSelf: 'center'}}
      />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <View style={{paddingHorizontal: mvs(50), paddingVertical: mvs(30)}}>
        <AvailableBalance bgColor={colors.white} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Bold label={'Transfer your payment'} style={{marginTop: mvs(0)}} />
          <PrimaryInput
            value={payload.FullName}
            placeHolder="Card Holder's Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, FullName: val})}
          />
          <PrimaryInput
            value={payload.Iban}
            placeHolder="IBAN Number"
            leftIcon="User"
            onChange={val => setPayload({...payload, Iban: val})}
          />
          <PrimaryInput
            value={payload.Address}
            placeHolder="Billing Address"
            leftIcon="Address"
            onChange={val => setPayload({...payload, Address: val})}
          />

          <PrimaryInput
            value={payload.Cvc}
            placeHolder="CVC"
            leftIcon="Lock"
            onChange={val => setPayload({...payload, Cvc: val})}
          />

          <PrimaryInput
            value={payload.ExpiryDate}
            placeHolder="Expire Date"
            readonly={false}
            leftIcon="Calendar"
            rightIcon="Calendar"
            onRightIconClick={() => setShowCalender(true)}
          />
          <PrimaryInput
            value={payload.Payment}
            placeHolder="Total Payment"
            leftIcon="TotalPayment"
            onChange={val => setPayload({...payload, Payment: val})}
          />
          <PrimaryButton
            title={'Transfer'}
            style={{marginTop: mvs(40)}}
            onClick={() => setPaymentSuccessfullyFlag(true)}
          />
        </View>
      </ScrollView>
      <PaymentSuccessfully
        visible={paymentSuccessfullyFlag}
        onBackToHome={() => {
          setPaymentSuccessfullyFlag(false);
          navigation.navigate('DrawerNavigator');
        }}
        onBackDrop={() => setPaymentSuccessfullyFlag(false)}
      />
      <DatePickerModal
        visible={showCalender}
        onSelect={date => {
          setShowCalender(false);
          setPayload({...payload, ExpiryDate: date});
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  selected_license: store.state.selected_license,
});

const mapDispatchToProps = {
  update_license: payload => DIVIY_API.update_license(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawRequest);
