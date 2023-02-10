//import liraries
import {useNavigation} from '@react-navigation/native';
import React from 'react';
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
import styles from './payment-method-styles';
const PaymentMethod = props => {
  const navigation = useNavigation();
  const [checkPay, setCheckPay] = React.useState(false);
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  return (
    <View style={{...styles.conntainer}}>
      <AppHeader title="Payment" />
      <View style={{alignSelf: 'center'}}>
        <Light
          label={'Select your payment method to proceed'}
          color={'#50555C'}
        />
      </View>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <Bold
            label={'Select your payment method'}
            color={'#50555C'}
            size={22}
          />
          <Row alignItems="center" style={styles.radio_button}>
            <PrimaryRadioButton title="Wallet" isSelected={false} />
            <View style={{paddingRight: mvs(23)}}>
              <Wallet />
            </View>
          </Row>
          <Row alignItems="center" style={styles.radio_button}>
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
          </View>
          <PrimaryButton
            title={'Continue'}
            style={{marginTop: mvs(19), marginBottom: mvs(60)}}
            onClick={() => setCheckPay(true)}
          />
        </ScrollView>
      </View>
      <CheckPayment
        visible={checkPay}
        onOk={() => setCheckPay(false)}
        onOk1={() => {
          setCheckPay(false);
          setPaymentSuccessfullyFlag(true);
        }}
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

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);