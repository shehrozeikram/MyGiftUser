import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import * as SVG from '../../assets/svgs/index'
import { mvs } from '../../services/metrices';
import LinearGradient from 'react-native-linear-gradient';
import Row from '../atoms/row';
import SemiBold from '../../presentation/typography/semibold-text';
import colors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { Food } from '../../assets/food-pharmacy/images';
import Regular from '../../presentation/typography/regular-text';
const CategoryItem = ({icon='Google',color=colors.primaryLinear,onClick,style,title,f=1}) => {
const Icon=SVG[icon];
    return (
        <View style={{alignItems:'center',opacity: 0.5,marginLeft:mvs(13)}}>
             <TouchableOpacity  style={{...styles.container,...style}} onPress={onClick}>
                <ImagePlaceholder uri={Food} containerStyle={styles.image}/>
             </TouchableOpacity>
            <Regular label={title} size={12} color={colors.black} style={{marginTop:mvs(10)}}/>
        </View>
    
    );
}
const styles = StyleSheet.create({
    container:{
       justifyContent:'center',
       alignItems:'center',
       height:mvs(62),
       width:mvs(63),
       borderRadius:mvs(15),
       backgroundColor:colors.mappath,
    },
    image:{
       height:mvs(22),
       width:mvs(22)
    }
});
export default CategoryItem;