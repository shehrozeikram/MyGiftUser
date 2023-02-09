import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import * as SVG from '../../assets/svgs/index';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
const PrimaryButton = ({
  title = 'Dispatch Button',
  icon = '',
  onClick,
  style,
  titleStyle,
  fontSize = 18,
}) => {
  const Icon = SVG[icon];
  return (
    <TouchableOpacity onPress={onClick} style={{...styles.container, ...style}}>
      <Row style={{alignItems: 'center'}}>
        {Icon && <Icon />}
        <Medium
          size={fontSize}
          label={title}
          style={{...styles.textStyle, ...titleStyle}}
        />
      </Row>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(60),
    borderRadius: mvs(30),
    marginTop: mvs(20),
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: colors.white,
  },
});
export default PrimaryButton;
