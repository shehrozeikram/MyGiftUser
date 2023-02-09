import React from 'react';
import {Image, ScrollView, TextInput, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
import styles from './styles';
// create a component
const PayAtStore = props => {
  const {navigation} = props;
  const [paymentSuccessfullyFlag, setPaymentSuccessfullyFlag] =
    React.useState(false);
  return (
    <View style={{...styles.container}}>
      <AppHeader title="Pay at Store" />
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
            <Image source={Store} style={styles.image} />
            <View style={{flex: 1, paddingLeft: mvs(10)}}>
              <Regular
                label={'Enter payment you want to transfer'}
                size={10}
                color={colors.lightgrey1}
              />
              <Row alignItems="center">
                <Bold label={'Payment :'} size={16} />
                <TextInput style={styles.input} />
                <Bold label={'SAR'} size={16} />
              </Row>
            </View>
          </Row>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <PrimaryButton
              title={'Transfer'}
              onClick={() => setPaymentSuccessfullyFlag(true)}
            />
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
  selected_vehicle: store.state.selected_vehicle,
  vehicle_types: store.state.vehicle_types,
});

const mapDispatchToProps = {
  update_vehicle: payload => DIVIY_API.update_vehicle(payload),
  get_vehicle_types: () => DIVIY_API.get_vehicle_types(),
};
export default connect(mapStateToProps, mapDispatchToProps)(PayAtStore);
