import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as SVG from '../../assets/svgs/index';
import Bold from '../../presentation/typography/bold-text';
import Regular from '../../presentation/typography/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
const RequestItem = ({title = '', icon = '', status, amount, onClick}) => {
  const Icon = SVG[icon];
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <Row
        style={{marginLeft: mvs(31), marginRight: mvs(23)}}
        alignItems="center">
        {Icon && <Icon />}
        <Regular
          size={mvs(12)}
          label={title}
          color={colors.darkGray}
          style={styles.textStyle}
          numberOfLines={2}
        />
        {status != '' ? (
          <Bold
            size={mvs(12)}
            label={status}
            color={status === 'Pending' ? colors.red : colors.green}
          />
        ) : (
          <Bold size={mvs(12)} label={amount} color={colors.green} />
        )}
      </Row>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    elevation: mvs(4),
    borderRadius: mvs(10),
    borderWidth: mvs(1),
    backgroundColor: colors.white,
    marginTop: mvs(7),
    marginBottom: mvs(5),
    borderColor: colors.lightgrey,
    paddingVertical: mvs(25),
  },
  textStyle: {
    flex: 1,
    marginLeft: mvs(31),
    paddingRight: mvs(5),
  },
});
export default RequestItem;
