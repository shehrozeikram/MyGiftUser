import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity, Image } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import Medium from '../../presentation/typography/medium-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { Fire, FoodTwo,Medicine } from '../../assets/food-pharmacy/images';
import SemiBold from '../../presentation/typography/semibold-text';
import Regular from '../../presentation/typography/regular-text';
import SmallIconButton from '../buttons/small-icon-button';
const RecommendedItem = ({title='Taco Salad',subTitle='88 Calories',image,onClick,isPharmacy=false}) => {
    
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Image source={isPharmacy?Medicine:FoodTwo} style={styles.image} resizeMode='contain'/>
            <View style={{marginVertical:mvs(6)}}>
               <SemiBold label={title} size={14} color={colors.black}/>
               {!isPharmacy?<Row style={{justifyContent:'flex-start',alignItems: 'center',}}>
                 <ImagePlaceholder uri={Fire} containerStyle={{ height:mvs(25),width:mvs(25),}}/>
                 <Regular label={subTitle} size={13} color={colors.darkOrange} style={{marginLeft:mvs(8)}}/>
               </Row>:
                <Regular label={subTitle} size={13} color={colors.lightgrey1} numberOfLines={2} style={{width:mvs(100)}}/>
               }
               <Row style={{alignItems: 'center',marginVertical:mvs(6)}}>
                   <Medium label={'₵15.0'} size={14}/>
                   <SmallIconButton icon='Plus'/>
               </Row>
            </View>
             
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
     marginLeft:mvs(13),
     backgroundColor:colors.white,
     ...colors.shadow,
     padding:mvs(10),
     borderRadius:mvs(10),
    },
    image:{
        height:mvs(130),
        width:mvs(135),
        borderRadius:mvs(15),
        alignSelf:'center'
    } 
});
export default RecommendedItem;