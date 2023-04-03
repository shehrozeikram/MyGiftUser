import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import {RadioButtonSelected, RadioButton} from '../../assets/svgs';
import Bold from '../../presentation/typography/bold-text';
const PrimaryRadioButton = ({
  title = '',
  style,
  isSelected = false,
  onChange,
}) => {
  return (
    <View style={{...styles.container, ...style}}>
      {isSelected ? (
        <TouchableOpacity onPress={onChange}>
          <RadioButtonSelected />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onChange}>
          <RadioButton />
        </TouchableOpacity>
      )}
      {title && (
        <Bold
          label={title}
          size={18}
          color={colors.black}
          style={{flex: 1, paddingHorizontal: mvs(10)}}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(25),
  },
  textStyle: {
    marginLeft: mvs(18),
    color: colors.black,
  },
});
export default PrimaryRadioButton;
