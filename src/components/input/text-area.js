import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import Bold from '../../presentation/typography/bold-text';
const TextArea = ({
  placeHolder = 'Write Comment',
  onChange,
  style,
  linesCount = 20,
  label,
}) => {
  return (
    <View style={{marginTop: mvs(10)}}>
      {label && (
        <Bold
          label={label}
          size={16}
          color={colors.black}
          style={styles.label}
        />
      )}

      <TextInput
        onChangeText={onChange}
        placeholder={placeHolder}
        placeholderTextColor={colors.lightgrey1}
        multiline
        numberOfLines={linesCount}
        style={{...styles.container, ...style}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: mvs(180),
    ...colors.shadow,
    backgroundColor: colors.white,
    borderRadius: mvs(15),
    color: colors.black,
    paddingHorizontal: mvs(20),
    paddingTop: mvs(13),
    textAlignVertical: 'top',
    marginTop: mvs(5),
    borderColor: colors.lightgrey1,
    borderWidth: 0.2,
  },
  label: {
    marginLeft: mvs(10),
  },
});
export default TextArea;
