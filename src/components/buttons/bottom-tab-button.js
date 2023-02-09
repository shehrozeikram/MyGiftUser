import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as SVG from '../../assets/svgs/bottom-tab-icons/index';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
const BottomTabButton = ({
  icon = 'ParcelUnSelected',
  style,
  title,
  f = 1,
  foc,
}) => {
  const Icon = SVG[icon];
  console.log(foc, 'foc0000000');
  return (
    <View style={{alignItems: 'center', flex: f}}>
      <View
        style={{
          ...styles.container,
          ...style,
          borderTopColor: foc ? colors.primary : '',
          borderTopWidth: foc ? 2 : 0,
        }}>
        {Icon && <Icon />}
      </View>
      {title && (
        <Medium
          label={title}
          size={14}
          color={colors.primary}
          style={{marginTop: mvs(10)}}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(56),
    width: mvs(47),
    //    borderRadius:mvs(10),
  },
  textStyle: {
    marginLeft: mvs(18),
    color: colors.white,
  },
});
export default BottomTabButton;
