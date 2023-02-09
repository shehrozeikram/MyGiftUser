import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';
import React, {  useState } from 'react';
import { View,StyleSheet, TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import Medium from '../../presentation/typography/medium-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { Fire, FoodTwo } from '../../assets/food-pharmacy/images';
import Regular from '../../presentation/typography/regular-text';
import SmallIconButton from '../buttons/small-icon-button';
import Bold from '../../presentation/typography/bold-text';
const CartItem = ({title='Taco Salad',subTitle='88 Calories',image,onClick}) => {
    return (
        <Row style={styles.container}>
            <ImagePlaceholder uri={FoodTwo} containerStyle={styles.image}/>
            <View style={{flex:1,marginHorizontal:mvs(10)}}>
                 <Bold color={colors.black} size={13} label={'Brownie Various Flavors'} style={styles.text}/>
                 <Row style={{justifyContent:'flex-start',alignItems: 'center',}}>
                 <ImagePlaceholder uri={Fire} containerStyle={{ height:mvs(25),width:mvs(25),}}/>
                 <Regular label={subTitle} size={13} color={colors.lightgrey1} style={{marginLeft:mvs(3)}}/>
               </Row>
                 <Medium label={'₵15.0'} size={14}/>
            </View>
            <View style={{alignItems: 'center',justifyContent:'space-between'}}>
               <SmallIconButton icon='Plus'/> 
               <Medium label={'1'} size={14} color={colors.black} style={{marginVertical:5}}/>
               <SmallIconButton icon='MinusVertical'/>
            </View>
        </Row>
    );
}
const styles = StyleSheet.create({
    container:{
     padding:mvs(14),
     backgroundColor:colors.white,
     alignItems:'center',
     ...colors.shadow,
     borderRadius:mvs(8),
     marginTop:mvs(24),
    },
    image:{
        height:mvs(80),
        width:mvs(80),
       borderRadius:mvs(10),
       alignSelf:'center'
    } ,
    text:{
        fontFamily:'Assistant'
    }
});
export default CartItem;