import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../../services/metrices';
import Medium from '../../../presentation/typography/medium-text';
import allColors from '../../../services/colors';
import * as SVG from '../../../assets/svgs/drawer-icons/index'
export const DrawerItem=({
    title,
    onPress,
    icon="Dashboard"
}) => {
  const Icon=SVG[icon];
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.option}}>
         {Icon && (<Icon width={mvs(27)}/>)}
         <Medium
          label={title}
          style={{...styles.optionTitle}}
          color={allColors.white}
        />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    option: {
        alignItems: 'center',
        flexDirection: 'row',
        height: mvs(55),
        width: '100%',
      },
      optionTitle: {
        fontSize: mvs(15),
        marginLeft: mvs(15),
        marginRight: mvs(15),
      },
});