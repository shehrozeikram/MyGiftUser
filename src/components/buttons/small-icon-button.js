import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import * as SVG from '../../assets/food-pharmacy/svgs/index'
import { mvs } from '../../services/metrices';
import LinearGradient from 'react-native-linear-gradient';
import Row from '../atoms/row';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
const SmallIconButton = ({icon='Plus',color=colors.primaryLinear,onClick,style}) => {
const Icon=SVG[icon];
    return (
        <View style={{alignItems:'center'}}>
             <TouchableOpacity style={{}} onPress={onClick}>
                <LinearGradient 
                    start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
                    colors={color}
                    borderRadius
                    style={{...styles.container,...style}}>
                    {Icon && 
                    (
                        <Icon/>
                    )}
                </LinearGradient>
             </TouchableOpacity>
            
        </View>
       
      
    );
}
const styles = StyleSheet.create({
    container:{
       justifyContent:'center',
       alignItems:'center',
       height:mvs(20),
       width:mvs(20),
       borderRadius:mvs(4),
    },
    textStyle:{
        marginLeft:mvs(18),
        color:colors.white
    }
});
export default SmallIconButton;