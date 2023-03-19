import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
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
import alertService from '../../services/alert.service';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {IP} from '../../store/api-urls';
import styles from './styles';
// create a component
const WithdrawRequest = props => {
  const {create_withdraw, wallet, route, user_info} = props;
  const {selected_store} = route?.params;
  const navigation = useNavigation();
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = React.useState({
    expire_date: '',
    iban_number: '',
    billing_address: '',
    total_payment: 0,
    cvc: '',
    card_holder_name: '',
    store_id: selected_store?.id,
    user_id: user_info?.id,
  });

  const saveRequest = async () => {
    if (
      !wallet?.user_balance ||
      wallet?.user_balance < payload?.total_payment
    ) {
      alertService.show('Your wallet balance is low!', 'Withdraw Request');
      return;
    }
    if (payload?.card_holder_name?.length < 1) {
      alertService.show('Please enter card holder name!', 'Withdraw Request');
      return;
    }
    if (payload?.iban_number?.length < 1) {
      alertService.show('Please enter iban number!', 'Withdraw Request');
      return;
    }
    if (payload?.cvc?.length < 1) {
      alertService.show('Please enter cvc!', 'Withdraw Request');
      return;
    }
    if (payload?.billing_address?.length < 1) {
      alertService.show('Please enter billing address!', 'Withdraw Request');
      return;
    }
    if (payload?.expire_date?.length < 1) {
      alertService.show('Please select expiry date!', 'Withdraw Request');
      return;
    }
    if (payload?.total_payment?.length < 1) {
      alertService.show('Please enter amount to withdraw!', 'Withdraw Request');
      return;
    }
    setLoading(true);
    var res = await create_withdraw(payload);
    setLoading(false);
    if (res?.data?.api_status) {
      setPaymentSuccessfullyFlag(true);
    } else {
      alertService.show('Something went wrong!', 'Withdraw Request');
    }
  };

  return (
    <View style={{...styles.container}}>
      <AppHeader title="Withdraw" />
      {/* <Regular
        label={'Your active payment is here'}
        size={12}
        color={colors.lightgrey1}
        style={{marginTop: mvs(-10), alignSelf: 'center'}}
      /> */}
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <Image
        source={{uri: IP + selected_store?.attachments[0]?.url}}
        style={styles.image}
      />
      <Bold
        label={selected_store?.store_name}
        color={colors.black}
        size={mvs(20)}
        style={{alignSelf: 'center'}}
      />
      <View style={{paddingHorizontal: mvs(50), paddingVertical: mvs(30)}}>
        <AvailableBalance
          bgColor={colors.white}
          balance={wallet?.user_balance ? wallet?.user_balance : 0}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Bold
            label={'Create your withdraw request'}
            style={{marginTop: mvs(0)}}
          />
          <PrimaryInput
            value={payload.card_holder_name}
            placeHolder="Card Holder's Name"
            leftIcon="User"
            bWidth={1}
            onChange={val => setPayload({...payload, card_holder_name: val})}
          />
          <PrimaryInput
            value={payload.iban_number}
            placeHolder="IBAN Number"
            leftIcon="User"
            onChange={val => setPayload({...payload, iban_number: val})}
          />
          <PrimaryInput
            value={payload.billing_address}
            placeHolder="Billing Address"
            leftIcon="Address"
            onChange={val => setPayload({...payload, billing_address: val})}
          />

          <PrimaryInput
            value={payload.cvc}
            placeHolder="CVC"
            leftIcon="Lock"
            onChange={val => setPayload({...payload, cvc: val})}
          />

          <PrimaryInput
            value={payload.expire_date}
            placeHolder="Expire Date"
            readonly={false}
            leftIcon="Calendar"
            rightIcon="Calendar"
            onRightIconClick={() => setShowCalender(true)}
          />
          <PrimaryInput
            inputType="numeric"
            value={payload.total_payment}
            placeHolder="Total Payment"
            leftIcon="TotalPayment"
            onChange={val => setPayload({...payload, total_payment: val})}
          />
          <PrimaryButton
            title={'Transfer'}
            style={{marginTop: mvs(40)}}
            onClick={() => saveRequest()}
          />
        </View>
      </ScrollView>
      <PaymentSuccessfully
        title="Withdraw Request"
        description={
          'Your withdraw payment request has been created successfully!'
        }
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
          setPayload({...payload, expire_date: date});
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  wallet: store.state.wallet,
});

const mapDispatchToProps = {
  create_withdraw: payload => DIVIY_API.create_withdraw(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(WithdrawRequest);
