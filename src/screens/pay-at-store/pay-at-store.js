import React, {useState} from 'react';
import {Image, ScrollView, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {Store} from '../../assets/images';
import Row from '../../components/atoms/row';
import AvailableBalance from '../../components/available-balance/available-balance';
import PrimaryButton from '../../components/buttons/button-primary';
import AppHeader from '../../components/header/app-header';
import PaymentSuccessfully from '../../components/modals/payment-successfully';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import DIVIY_API from '../../store/api-calls';
import {IP} from '../../store/api-urls';
import styles from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import alertService from '../../services/alert.service';
// create a component
const PayAtStore = props => {
  const {navigation, route, user_info, pay_at_store} = props;
  const {selected_store} = route?.params;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  const payAmount = async () => {
    setLoading(true);
    var res = await pay_at_store({amount: amount}, selected_store?.id, 1);
    setLoading(false);
    if (res?.data?.api_status) {
      setPaymentSuccessfullyFlag(true);
    } else {
      alertService.show('Something went wrong!', 'Pay at store');
    }
  };
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Pay at Store" />
      <Spinner
        visible={loading}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <Regular
        label={'Now pay  your balance at this store'}
        size={12}
        color={colors.lightgrey1}
        style={{marginTop: mvs(-10), alignSelf: 'center'}}
      />
      <Spinner
        visible={false}
        textContent={'Please Wait...'}
        textStyle={{color: colors.primary}}
        color={colors.primary}
      />
      <View style={{paddingHorizontal: mvs(50), paddingVertical: mvs(30)}}>
        <AvailableBalance bgColor={colors.primary} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.body}>
          <Bold label={'Pay to this store'} size={20} color={colors.black} />
          <Row alignItems="center" style={styles.card}>
            <Image
              source={{uri: IP + selected_store?.attachments[0]?.url}}
              style={styles.image}
            />
            <View style={{flex: 1, paddingLeft: mvs(10)}}>
              <Regular
                label={'Enter payment you want to transfer'}
                size={10}
                color={colors.lightgrey1}
              />
              <Row alignItems="center">
                <Bold label={'Payment :'} size={16} />
                <TextInput
                  value={amount + ''}
                  keyboardType="numeric"
                  onChangeText={val => setAmount(val)}
                  style={styles.input}
                />
                <Bold label={'SAR'} size={16} />
              </Row>
            </View>
          </Row>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <PrimaryButton title={'Transfer'} onClick={() => payAmount()} />
          </View>
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
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  pay_at_store: (payload, store_id, user_id) =>
    DIVIY_API.pay_at_store(payload, store_id, user_id),
};
export default connect(mapStateToProps, mapDispatchToProps)(PayAtStore);
