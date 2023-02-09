import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {Successfully} from '../../assets/svgs';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const PaymentSuccessfully = ({
  visible = false,
  onBackToHome,
  description = 'AWESOME !Your payment has been confirmed.',
  title = 'Payment succesful!',
  onBackDrop,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={visible}
      onBackdropPress={onBackDrop}
      onRequestClose={onBackDrop}>
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          <Successfully />
        </View>
        <Bold
          label={title}
          style={{
            marginTop: mvs(15),
            textAlign: 'center',
            marginBottom: mvs(51),
            marginHorizontal: mvs(40),
          }}
          size={19}
          color={colors.black}
        />
        <Regular
          label={description}
          numberOfLines={3}
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            width: mvs(150),
          }}
          size={14}
          color={colors.black}
        />
        <TouchableOpacity onPress={onBackToHome}>
          <Regular
            label={'Back to Home page'}
            numberOfLines={1}
            style={styles.homeBtn}
            size={15}
            color={colors.black}
          />
        </TouchableOpacity>

        <View style={{marginBottom: mvs(20)}} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    ...colors.shadow,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingTop: mvs(60),
    paddingBottom: mvs(60),
  },
  linerGrad: {
    borderRadius: mvs(15),
    paddingVertical: mvs(33),
    paddingHorizontal: mvs(20),
  },
  homeBtn: {
    textAlign: 'center',
    marginHorizontal: mvs(40),
    marginTop: mvs(60),
  },
});
export default PaymentSuccessfully;
