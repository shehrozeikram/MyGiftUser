//import liraries
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {True, VisaCard, Wallet} from '../../assets/svgs';
import Row from '../../components/atoms/row';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import CheckPayment from '../../components/modals/check-payment';
import PaymentSuccessfully from '../../components/modals/payment-successfully';
import PrimaryRadioButton from '../../components/radio-button/radio-button';
import Bold from '../../presentation/typography/bold-text';
import Light from '../../presentation/typography/light-text';
import Regular from '../../presentation/typography/regular-text';
import SemiBold from '../../presentation/typography/semibold-text';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import styles from './payment-method-styles';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from '../../services/colors';
import alertService from '../../services/alert.service';
const PaymentMethod = props => {
  const {route, buy_card} = props;
  const {payload} = route?.params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [checkPay, setCheckPay] = React.useState(false);
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  const sendGift = async () => {
    console.log('Gift Payload is \n\n', payload);
    setLoading(true);
    var res = await buy_card(payload);
    setLoading(false);
    if (res?.data?.api_status) {
      setCheckPay(false);
      setPaymentSuccessfullyFlag(true);
    } else {
      alertService.show('Receiver not exist', 'Send Gift');
    }
  };
  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Payment" />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <View style={{alignSelf: 'center'}}>
        <Light
          label={'click on continue button to proceed'}
          color={'#50555C'}
        />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Bold label={'Payment method'} color={'#50555C'} size={22} />
          <Row alignItems="center" style={styles.radio_button}>
            <PrimaryRadioButton title="Wallet" isSelected={true} />
            <View style={{paddingRight: mvs(23)}}>
              <Wallet />
            </View>
          </Row>
          {/* <Row alignItems="center" style={styles.radio_button}>
            <PrimaryRadioButton title="Bank account" isSelected={false} />
            <View style={{paddingRight: mvs(23)}}>
              <VisaCard />
            </View>
          </Row>
          <View style={styles.radio_button1}>
            <Row alignItems="center">
              <PrimaryRadioButton title="Both" isSelected={true} />
              <Row style={{paddingHorizontal: mvs(23)}}>
                <View style={{paddingHorizontal: mvs(6)}}>
                  <Wallet />
                </View>
                <VisaCard />
              </Row>
            </Row>
            <Row style={styles.wallet_true}>
              <True />
              <Bold
                label={'Wallet'}
                size={18}
                color={'black'}
                style={{flex: 1, paddingHorizontal: mvs(10)}}
              />
            </Row>
            <Row alignItems="center">
              <Regular
                label={'Payment :'}
                size={12}
                color={'black'}
                style={{marginLeft: mvs(87), marginRight: mvs(5)}}
              />
              <View style={{paddingHorizontal: mvs(22)}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
              <SemiBold
                label={'Payment :'}
                size={14}
                color={'black'}
                style={{marginLeft: mvs(5), marginRight: mvs(72)}}
              />
            </Row>
            <Row style={styles.wallet_true}>
              <True />
              <Bold
                label={'Bank account'}
                size={18}
                color={'black'}
                style={{flex: 1, paddingHorizontal: mvs(10)}}
              />
            </Row>
            <Row alignItems="center">
              <Regular
                label={'Payment :'}
                size={12}
                color={'black'}
                style={{marginLeft: mvs(87), marginRight: mvs(5)}}
              />
              <View style={{paddingHorizontal: mvs(22)}}>
                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>
              <SemiBold
                label={'Payment :'}
                size={14}
                color={'black'}
                style={{marginLeft: mvs(5), marginRight: mvs(72)}}
              />
            </Row>
          </View> */}
          <PrimaryButton
            title={'Continue'}
            style={{marginTop: mvs(19), marginBottom: mvs(60)}}
            onClick={() => {
              //setCheckPay(true);
              sendGift();
            }}
          />
        </ScrollView>
      </View>
      <CheckPayment
        visible={checkPay}
        onOk={() => setCheckPay(false)}
        onOk1={() => sendGift()}
        onBackDrop={() => setCheckPay(false)}
      />
      <PaymentSuccessfully
        visible={paymentSuccessfullyFlag}
        onBackToHome={() => {
          setPaymentSuccessfullyFlag(false);
          navigation.navigate('DrawerNavigator');
        }}
        onBackDrop={() => setPaymentSuccessfullyFlag(false)}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  otp: store.state.otp,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  buy_card: payload => DIVIY_API.buy_card(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
