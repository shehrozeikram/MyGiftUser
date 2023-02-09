import React, { } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as SVG from '../../assets/food-pharmacy/svgs/index'
import { mvs } from '../../services/metrices';
import Row from '../atoms/row';
import colors from '../../services/colors';
import Medium from '../../presentation/typography/medium-text';
const PaymentCard = ({title='Master Card',leftIcon='',selected=false,onChange}) => {
const LeftIcon=SVG[leftIcon];
    return (
        <Row style={{...styles.container}}>
          {LeftIcon && (
            <View style={{borderWidth:2,borderRadius:3,borderColor:colors.gray}}>
               <LeftIcon />
            </View>
            
          )}
            <View style={{flex:1,paddingHorizontal:mvs(10)}}>
                <Medium label={title} size={14} color={colors.black}/>
                <Medium label={'...........'} size={12} color={colors.black}/>
            </View> 
            {
                selected?
                <TouchableOpacity style={{marginLeft:mvs(0)}}>
                   <SVG.CheckedPayment/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={onChange}>
                    <SVG.UnCheckedPayment/>
                </TouchableOpacity>
            }
           
        </Row>
      
    );
}
const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       height:mvs(70),
       borderRadius:mvs(10),
       marginVertical:mvs(16),
       ...colors.shadow,
       backgroundColor:colors.white,
       paddingHorizontal:mvs(13),
       borderColor:colors.primary
    },
    input:{
        flex:1,paddingHorizontal:mvs(15)
    }
});
export default PaymentCard;