
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import ImagePlaceholder from '../atoms/Placeholder';
import { Food ,Pharmacy} from '../../assets/food-pharmacy/images';
import SemiBold from '../../presentation/typography/semibold-text';
import Regular from '../../presentation/typography/regular-text';
const FoodItem = ({title='Subway-Lahore',subTitle='Fast Food,American,Meat,Halal',image,onClick,isPharmacy=false}) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <ImagePlaceholder uri={isPharmacy?Pharmacy:Food} containerStyle={styles.image}/>
             <SemiBold label={title} size={18} color={colors.black}/>
             <Regular label={subTitle} size={10} color={colors.black}/>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
     marginLeft:mvs(13)
    },
    image:{
        height:mvs(100),
        width:mvs(203),
        borderRadius:mvs(5)
    } 
});
export default FoodItem;