import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {Line1} from '../../assets/food-pharmacy/svgs';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import PrimaryButton from '../buttons/button-primary';
const CheckPayment = ({
  buttonTitle1 = 'Pay with Card',
  buttonTitle = 'Try another method',
  visible = false,
  onOk,
  onOk1,
  description = 'Sorry You don’t have sufficient balance in you wallet',
  onBackDrop,
}) => {
  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={visible}
      onBackdropPress={onBackDrop}
      onRequestClose={onBackDrop}>
      <View style={styles.container}>
        <View style={styles.linerGrad}>
          <Line1 />
        </View>
        <Regular
          label={description}
          numberOfLines={3}
          style={{
            textAlign: 'center',
            marginHorizontal: mvs(40),
            marginTop: mvs(61),
            lineHeight: mvs(20),
          }}
          size={18}
          color={colors.black}
        />
        <Row
          style={{marginTop: mvs(64), marginHorizontal: mvs(20)}}
          alignItems="center">
          <PrimaryButton
            title={buttonTitle}
            onClick={onOk}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: mvs(10),
              elevation: 1,
              width: '50%',
            }}
            fontSize={14}
            titleStyle={{color: '#686868'}}
          />
          <PrimaryButton
            title={buttonTitle1}
            onClick={onOk1}
            style={{
              backgroundColor: '#B50C44',
              borderRadius: mvs(10),
              elevation: 1,
              width: '45%',
            }}
            fontSize={14}
            titleStyle={{color: colors.white}}
          />
        </Row>
        <View style={{marginBottom: mvs(40)}} />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...colors.shadow,
    borderTopEndRadius: mvs(30),
    borderTopStartRadius: mvs(30),
    bottom: mvs(-20),
    position: 'absolute',
    left: mvs(-20),
    right: mvs(-20),
  },
  linerGrad: {
    marginTop: mvs(33),
    alignSelf: 'center',
  },
});
export default CheckPayment;
