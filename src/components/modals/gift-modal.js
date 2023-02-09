import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, Clock, Cross} from '../../assets/svgs';
import Bold from '../../presentation/typography/bold-text';
import Medium from '../../presentation/typography/medium-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
const GiftModal = ({visible = false, onCancel}) => {
  return (
    <Modal backdropOpacity={0.3} isVisible={visible}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onCancel}>
          <Cross />
        </TouchableOpacity>
        <Medium
          label={'Received Gift Card'}
          size={20}
          color={colors.black}
          style={{alignSelf: 'center', marginTop: mvs(10)}}
        />
        <View style={{alignItems: 'center', paddingVertical: mvs(25)}}>
          <Medium label={'Gift card from'} size={16} color={colors.black} />
          <Bold label={'Sarah'} size={24} color={colors.primary} />
        </View>
        <View
          style={{
            alignItems: 'center',
            paddingBottom: mvs(30),
          }}>
          <Medium label={'Payment'} size={16} color={colors.black} />
          <Bold label={'245.98SAR'} size={24} color={colors.primary} />
        </View>

        <Row alignItems="center" style={{paddingHorizontal: mvs(26)}}>
          <Row alignItems="center">
            <Calendar />
            <Regular
              label={'  Sep 02,2022'}
              size={13}
              color={colors.lightgrey1}
            />
          </Row>
          <Row alignItems="center">
            <Clock />
            <Regular label={'  10:15 AM'} size={13} color={colors.lightgrey1} />
          </Row>
        </Row>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(15),
    paddingTop: mvs(12),
    paddingHorizontal: mvs(13),
    paddingBottom: mvs(26),
  },
  text: {
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: mvs(26),
    paddingHorizontal: mvs(23),
  },
});
export default GiftModal;
