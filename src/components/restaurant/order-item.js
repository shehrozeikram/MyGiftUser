import React from 'react';
import { View,StyleSheet } from 'react-native';
import { mvs } from '../../services/metrices';
import colors from '../../services/colors';
import Row from '../atoms/row';
import Bold from '../../presentation/typography/bold-text';
import ImagePlaceholder from '../atoms/Placeholder';
import { FoodTwo } from '../../assets/food-pharmacy/images';
import Regular from '../../presentation/typography/regular-text';
import PrimaryButton from '../buttons/button-primary';
const OrderItem = ({title='Taco Salad',subTitle='Steak Beef',image,onClick}) => {
    return (
        <View style={styles.container}>
          <Row style={{alignItems:'center'}}>
            <ImagePlaceholder uri={FoodTwo} containerStyle={styles.image}/>
            <View style={{flex:1,marginHorizontal:mvs(10)}}>
                 <Bold color={colors.black} size={13} label={'Subway-Lahore'} style={styles.text}/>
                  <Regular label={subTitle} size={13} color={colors.lightgrey1} style={{marginVertical:mvs(3)}}/>
                  <Bold label={'₵15.0'} size={14}/>
            </View>
            </Row>
            <Row style={{alignItems:'center',marginTop:6,width:'100%'}}>
               <Bold color={colors.lightgrey1} size={14} label={'22 Feb, 18:27'}/>
               <PrimaryButton title='Select Items to reorder'  style={styles.select} titleStyle={{marginLeft:0,fontSize:12}}/>
            </Row>
        </View>
       
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
        height:mvs(90),
        width:mvs(95),
       borderRadius:mvs(10),
       alignSelf:'center'
    } ,
    text:{
        fontFamily:'Assistant'
    },
    select:{
        marginTop:0,height:mvs(30),
        borderRadius:mvs(3),
        paddingHorizontal:mvs(10)
    }
});
export default OrderItem;