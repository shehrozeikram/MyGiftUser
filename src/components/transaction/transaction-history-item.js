import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Received} from '../../assets/svgs';
import Bold from '../../presentation/typography/bold-text';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import moment from 'moment';
const TransactionItem = ({transaction = {}, onClick}) => {
  // console.log('Transaction ==> ', transaction);
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <Row style={{alignItems: 'center'}}>
        <Received />
        <SemiBold
          label={`${transaction?.title}`}
          size={14}
          color={colors.black}
          style={{flex: 1, marginLeft: mvs(20)}}
        />
        <View style={{alignItems: 'center'}}>
          <Bold
            label={`+${transaction?.amount}SAR`}
            size={15}
            color={colors.green}
          />
          <Bold
            label={`${moment(transaction?.send_date).format('MMM Do YY')}`}
            size={14}
            color={colors.lightgrey1}
          />
        </View>
      </Row>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: mvs(15),
    paddingHorizontal: mvs(15),
    paddingVertical: mvs(13),
    backgroundColor: colors.white,
    ...colors.shadow,
    marginTop: mvs(10),
  },
  imageStyle: {
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(1000),
  },
  button: {
    height: mvs(44),
    width: mvs(44),
    borderRadius: mvs(1000),
    marginHorizontal: mvs(5),
  },
  locationView: {
    flex: 1,
    paddingLeft: mvs(15),
    justifyContent: 'space-between',
    height: '100%',
  },
});
export default TransactionItem;
