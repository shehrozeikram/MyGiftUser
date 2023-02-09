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
import SemiBold from '../../presentation/typography/semibold-text';
import Regular from '../../presentation/typography/regular-text';
import SmallIconButton from '../buttons/small-icon-button';
import { Rating } from 'react-native-elements';
import Bold from '../../presentation/typography/bold-text';
const FoodPharmacyItem = ({title='Taco Salad',subTitle='88 Calories',image,onClick}) => {
    return (
        <Row style={styles.container}>
            <ImagePlaceholder uri={FoodTwo} containerStyle={styles.image}/>
            <View style={{flex:1,marginHorizontal:mvs(10)}}>
                 <Bold color={colors.black} size={13} label={'Brownie Various Flavors'} style={styles.text}/>
                 <Regular size={14} color={colors.lightgrey1} label={'Dessert'}/>
                 <Medium label={'₵15.0'} size={14}/>
                <Row style={{alignItems: 'center',marginVertical:mvs(6)}}>
                     <Rating imageSize={15}  type="custom" startingValue={4.0}  
                    ratingBackgroundColor={colors.lightgrey2} tintColor={colors.background}/>
                   <SmallIconButton icon='Plus'/>
               </Row>
            </View>
        </Row>
    );
}
const styles = StyleSheet.create({
    container:{
     padding:mvs(14),
     backgroundColor:colors.background,
     alignItems:'center',
     ...colors.shadow,
     borderWidth:1,
     borderRadius:mvs(8),
     marginTop:mvs(16),
     borderColor:colors.gray
    },
    image:{
        height:mvs(80),
        width:mvs(80),
       borderRadius:mvs(2),
       alignSelf:'center'
    } ,
    text:{
        fontFamily:'Assistant'
    }
});
export default FoodPharmacyItem;