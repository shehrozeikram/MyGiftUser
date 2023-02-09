import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import * as SVG from '../../assets/svgs/index';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Bold from '../../presentation/typography/bold-text';
const PrimaryInput = ({
  placeHolder = 'Enter Name',
  leftIcon = '',
  value = '',
  inputType = 'default',
  rightIcon = '',
  onChange,
  style,
  isPassword = false,
  onRightIconClick,
  readonly = true,
  label,
  numberOfLines,
  placeholderTextColor,
  multiline,
  lineHeight,
  styleTextinput,
}) => {
  const LeftIcon = SVG[leftIcon];
  const RightIcon = SVG[rightIcon];
  const [width, setWidth] = React.useState(0);
  return (
    <View style={{marginTop: mvs(15)}}>
      {label && (
        <Bold
          label={label}
          size={16}
          color={colors.black}
          style={styles.label}
        />
      )}
      <Row style={{...styles.container, ...style}}>
        {LeftIcon && <LeftIcon width={mvs(27)} />}
        <TextInput
          value={value}
          keyboardType={inputType}
          editable={readonly}
          placeholder={placeHolder}
          secureTextEntry={isPassword}
          onFocus={() => setWidth(1)}
          onBlur={() => setWidth(0)}
          multiline={multiline}
          lineHeight={lineHeight}
          numberOfLines={numberOfLines}
          style={{...styles.input, ...styleTextinput}}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : colors.lightgrey1
          }
          onChangeText={onChange}
        />
        {RightIcon && (
          <TouchableOpacity onPress={onRightIconClick}>
            <RightIcon />
          </TouchableOpacity>
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: mvs(60),
    borderRadius: mvs(30),
    marginTop: mvs(10),
    ...colors.shadow,
    backgroundColor: colors.white,
    paddingHorizontal: mvs(20),
    borderColor: colors.lightgrey1,
    borderWidth: 0.2,
  },
  input: {
    flex: 1,
    paddingHorizontal: mvs(15),
    color: colors.black,
  },
  label: {
    marginLeft: mvs(10),
  },
});
export default PrimaryInput;
